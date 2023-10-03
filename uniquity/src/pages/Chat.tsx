import { DataStore } from 'aws-amplify';
import { useEffect, useRef, useState } from 'react';
import {
  LazyOpenAIChat,
  LazyUserProfile,
  OpenAIChat,
  OpenAiRoleType,
  UserProfile,
} from '../models';
import DotsTyping from '../components/chat/typing/dotsTyping';
import {
  ArrowCircleUp,
  HistoryOutlined,
  MicOffOutlined,
  MicOutlined,
} from '@mui/icons-material';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import {
  individualContributorHelperPrompts,
  managerHelperPrompts,
  submitOpenAI,
} from '../helpers/ChatHelpers';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { useDraggable } from 'react-use-draggable-scroll';
import './Chat.css';
import Button from '@mui/material/Button';
import OverflowText from '../components/chat/OverflowText';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useParams } from 'react-router-dom';
import { HistoryDrawer } from '../components/chat/HistoryDrawer/HistoryDrawer';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function Chat() {
  const { chatId } = useParams();
  const { user } = useAuthenticator();
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { events } = useDraggable(ref);
  // Chat data
  const [data, setData] = useState<LazyOpenAIChat[]>();
  // Selected Chat ID
  const [selectedId, setSelectedId] = useState<string | undefined>(chatId);
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

  const [userProfile, setUserProfile] = useState<LazyUserProfile>();
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);

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
    setSelectedId(chatId);
  }, [chatId]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  // Websocket for the chats
  useEffect(() => {
    const sub = DataStore.observeQuery(OpenAIChat).subscribe(({ items }) => {
      setData(items);
    });
    return () => sub.unsubscribe();
  }, []);

  // Send Chat Method
  const sendChat = async (chatFromPrompt?: string | undefined) => {
    if (listening) {
      await SpeechRecognition.stopListening();
      setListening(false);
    }

    let response;
    if ((chat || chatFromPrompt) && !selectedId) {
      response = await DataStore.save(
        new OpenAIChat({
          messages: [
            {
              role: 'ASSISTANT',
              content: `Hi there ${
                userProfile?.name ?? ''
              }! I'm Uniquity AI, your personal development coach. Whether it's prioritization, goal setting, or advice on work scenarios, I'm here to help. Let's chat! What's your first challenge for us to tackle today?`,
            },
            { role: 'USER', content: chatFromPrompt ? chatFromPrompt : chat },
          ],
        }),
      );
      setChat('');
      resetTranscript();
    } else if ((chat || chatFromPrompt) && selectedId) {
      const model = data?.find(d => d.id === selectedId);
      const saveModel = OpenAIChat.copyOf(model!, draft => {
        draft.messages?.push({
          role: 'USER',
          content: chatFromPrompt ? chatFromPrompt : chat,
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
    await submitOpenAI(response);
    setChatLoading(false);
  };

  const getHelperPrompts = () => {
    const groups = user.getSignInUserSession()?.getAccessToken().payload[
      'cognito:groups'
    ];

    if (groups?.includes('Manager')) {
      return managerHelperPrompts;
    } else if (groups?.includes('individualContributor')) {
      return individualContributorHelperPrompts;
    } else {
      return individualContributorHelperPrompts;
    }
  };

  return (
    <>
      <HistoryDrawer
        data={data}
        overlayVisible={overlayVisible}
        setOverlayVisible={setOverlayVisible}
      />
      <Box>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <div
            ref={ref}
            {...events}
            className="keep-scrolling"
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              overflow: 'auto',
              whiteSpace: 'nowrap',
            }}
          >
            {getHelperPrompts().map(b => (
              <Button
                key={b}
                onClick={async () => {
                  sendChat(b);
                }}
                sx={{ mr: 2, borderRadius: 8 }}
                variant="outlined"
              >
                {b}
              </Button>
            ))}
          </div>
        </div>
        <Divider sx={{ mt: 2, mb: 2 }} />
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
            <OverflowText
              chatPosition="left"
              content={`Hi there ${
                userProfile?.name ?? ''
              }! I'm Uniquity AI, your personal development coach. Whether it's prioritization, goal setting, or advice on work scenarios, I'm here to help. Let's chat! What's your first challenge for us to tackle today?`}
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
              if (
                m?.content?.includes(
                  `I'm Uniquity AI, your personal development`,
                )
              )
                return;
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
          justifyContent: 'center',
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
        <HistoryOutlined
          color="primary"
          sx={{ cursor: 'pointer' }}
          onClick={() => setOverlayVisible(true)}
          fontSize="large"
        />
      </AppBar>
    </>
  );
}
