import { DataStore } from 'aws-amplify';
import { useEffect, useRef, useState } from 'react';
import {
  Feedback,
  LazyIcebreakerChat,
  IcebreakerChat,
  OpenAiRoleType,
  LazyUserProfile,
  UserProfile,
} from '../models';
import DotsTyping from '../components/chat/typing/dotsTyping';
import {
  ArrowCircleUp,
  MicOffOutlined,
  MicOutlined,
  ThumbDownRounded,
  ThumbUpRounded,
} from '@mui/icons-material';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { submitIceBreaker } from '../helpers/ChatHelpers';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import './Chat.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import OverflowText from '../components/chat/OverflowText';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function IceBreakerChatPage() {
  const { icebreakerId } = useParams();
  const navigate = useNavigate();
  // Chat data
  const [data, setData] = useState<LazyIcebreakerChat[]>();
  // Selected Chat ID
  const [selectedId, setSelectedId] = useState<string | undefined>(
    icebreakerId,
  );
  // Controlled input for chat
  const [chat, setChat] = useState<string>('');
  // Controls chat loading
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  // Check if dark or light mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // State for if the microphone is listening
  const [listening, setListening] = useState<boolean>(false);
  // Speech recognition
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  // Snack Bar
  const [snackbarOpen, setSnackBarOpen] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<LazyUserProfile>();

  async function handleChatDone() {
    if (userProfile) {
      await DataStore.save(
        UserProfile.copyOf(userProfile, draft => {
          draft.completedIcebreakers = true;
        }),
      );
      navigate('/');
    }
  }

  // TODO: Replace with a function to get an icebreaker
  const chatIntro =
    // If they are creating transcripts with the microphone set the chat input to it
    useEffect(() => {
      setChat(transcript);
    }, [transcript]);

  useEffect(() => {
    const sub = DataStore.observeQuery(UserProfile).subscribe(({ items }) => {
      if (items && items.length > 0) {
        setUserProfile(items[0]);
      }
    });
    return () => sub.unsubscribe();
  }, []);

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  // Websocket for the chats
  useEffect(() => {
    const sub = DataStore.observeQuery(IcebreakerChat).subscribe(
      ({ items }) => {
        setData(items);
      },
    );
    return () => sub.unsubscribe();
  }, []);

  //Send Feedback
  const sendFeedback = async (
    like: boolean,
    content: string | null | undefined,
  ) => {
    if (content) {
      DataStore.save(new Feedback({ like, comment: content }));
      setSnackBarOpen(true);
    }
  };

  // Send Chat Method
  const sendChat = async () => {
    if (listening) {
      await SpeechRecognition.stopListening();
      setListening(false);
    }

    let response;
    if (chat && !selectedId) {
      response = await DataStore.save(
        new IcebreakerChat({
          messages: [
            {
              role: 'ASSISTANT',
              content: `Hi ${userProfile?.name}! I'm Uniquity AI, your personal development coach. It is great to meet you! I would love to understand what is important to you when it comes to your career?`,
            },
            { role: 'USER', content: chat },
          ],
        }),
      );
      setChat('');
      resetTranscript();
    } else if (chat && selectedId) {
      const model = data?.find(d => d.id === selectedId);
      const saveModel = IcebreakerChat.copyOf(model!, draft => {
        draft.messages?.push({
          role: 'USER',
          content: chat,
        });
      });
      response = await DataStore.save(saveModel);
      setChat('');
      resetTranscript();
    } else {
      return;
    }
    if (!selectedId) setSelectedId(response.id);
    setChatLoading(true);
    await submitIceBreaker(response);
    setChatLoading(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert
          onClose={() => setSnackBarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Thanks for the feedback!
        </Alert>
      </Snackbar>

      <Box>
        <div>
          <Box
            sx={{
              backgroundColor: '#dedede',
              borderRadius: 6,
              marginTop: 2,
              p: 2,
              marginLeft: '5%',
              maxWidth: '70%',
              width: 'fit-content',
              whiteSpace: 'pre-wrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <ThumbUpRounded sx={{ cursor: 'pointer' }} color="primary" />
              <ThumbDownRounded sx={{ cursor: 'pointer' }} color="primary" />
            </div>

            <OverflowText
              chatPosition="left"
              content={`Hi ${userProfile?.name}! I'm Uniquity AI, your personal development coach. It is great to meet you! I would love to understand what is important to you when it comes to your career?`}
            />
          </Box>
        </div>
        {data &&
          data?.length > 0 &&
          data.find(s => s.id === selectedId) &&
          data
            .find(x => x.id === selectedId)!
            .messages?.map((m, index, array) => {
              const isLastMessage = index === array.length - 1;
              if (m?.content === chatIntro) return;
              if (m?.role === OpenAiRoleType.ASSISTANT)
                return (
                  <div
                    key={m.role + index}
                    ref={isLastMessage ? lastMessageRef : null}
                  >
                    <Box
                      sx={{
                        backgroundColor: '#dedede',
                        borderRadius: 6,
                        marginTop: 2,
                        p: 2,
                        marginLeft: '5%',
                        maxWidth: '70%',
                        width: 'fit-content',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <ThumbUpRounded
                          sx={{ cursor: 'pointer' }}
                          color="primary"
                          onClick={() => sendFeedback(true, m.content)}
                        />
                        <ThumbDownRounded
                          sx={{ cursor: 'pointer' }}
                          color="primary"
                          onClick={() => sendFeedback(false, m.content)}
                        />
                      </div>
                      <OverflowText chatPosition="left" content={m.content} />
                    </Box>
                  </div>
                );

              if (m?.role === OpenAiRoleType.USER)
                return (
                  <div
                    key={m.role + index}
                    ref={isLastMessage ? lastMessageRef : null}
                  >
                    <Box
                      sx={{
                        backgroundColor: '#0078fe',
                        p: 2,
                        marginLeft: 'auto',
                        borderRadius: 6,
                        marginTop: 2,
                        marginRight: '5%',
                        maxWidth: '70%',
                        width: 'fit-content',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      <OverflowText chatPosition="right" content={m.content} />
                    </Box>
                  </div>
                );
            })}
      </Box>
      <Offset sx={{ marginBottom: 3 }} />

      <AppBar
        position="fixed"
        sx={{
          top: 'auto',
          bottom: 0,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row',
          backgroundColor: prefersDarkMode ? 'black' : 'white',
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={5}
          size="small"
          placeholder="Chat"
          InputProps={{
            sx: { borderRadius: 8 },
            endAdornment: chatLoading ? (
              <DotsTyping />
            ) : (
              <>
                <ArrowCircleUp
                  fontSize="large"
                  color="primary"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => sendChat()}
                />
                {browserSupportsSpeechRecognition && listening ? (
                  <MicOutlined
                    sx={{ cursor: 'pointer' }}
                    onClick={async () => {
                      await SpeechRecognition.stopListening();
                      setListening(false);
                    }}
                  />
                ) : (
                  <MicOffOutlined
                    sx={{ cursor: 'pointer' }}
                    onClick={async () => {
                      await SpeechRecognition.startListening({
                        continuous: true,
                      });
                      setListening(true);
                    }}
                  />
                )}
              </>
            ),
          }}
          sx={{ width: '80%', padding: 1 }}
          value={chat}
          onChange={t => setChat(t.target.value)}
        />
        <Button
          onClick={handleChatDone}
          sx={{ borderRadius: 8 }}
          variant="contained"
        >
          I know my coach
        </Button>
      </AppBar>
    </>
  );
}
