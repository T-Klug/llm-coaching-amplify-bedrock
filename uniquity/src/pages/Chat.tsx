import { DataStore } from 'aws-amplify';
import { useEffect, useRef, useState } from 'react';
import {
  Feedback,
  LazyOpenAIChat,
  OpenAIChat,
  OpenAiRoleType,
} from '../models';
import DotsTyping from '../components/chat/typing/dotsTyping';
import {
  ArrowCircleUp,
  MicOffOutlined,
  MicOutlined,
  ThumbDownRounded,
  ThumbUpRounded,
} from '@mui/icons-material';
import LogoLight from '../assets/logo-black-no-back.svg';
import LogoDark from '../assets/logo-no-back.svg';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { helperPrompts, submitOpenAI } from '../helpers/ChatHelpers';
import { HistoryDrawer } from '../components/chat/HistoryDrawer/HistoryDrawer';
import { SpeedDialU } from '../components/chat/SpeedDialU/SpeedDialU';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { useDraggable } from 'react-use-draggable-scroll';
import './Chat.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import OverflowText from '../components/chat/OverflowText';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
export default function Chat() {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { events } = useDraggable(ref);
  // Chat data
  const [data, setData] = useState<LazyOpenAIChat[]>();
  // Selected Chat ID
  const [selectedId, setSelectedId] = useState<string | undefined>();
  // Speed Dial visibility
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  // Controlled input for chat
  const [chat, setChat] = useState<string>('');
  // Controls chat loading
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  // // Scroll Ref for pushing chat up
  // const scrollRef = useRef<HTMLDivElement>(null);
  // Check if dark or light mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // State for if the microphone is listening
  const [listening, setListening] = useState<boolean>(false);
  // Speech recognition
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  // Snack Bar
  const [snackbarOpen, setSnackBarOpen] = useState<boolean>(false);

  // If they are creating transcripts with the microphone set the chat input to it
  useEffect(() => {
    setChat(transcript);
  }, [transcript]);

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  // Websocket for the chats
  useEffect(() => {
    const sub = DataStore.observeQuery(OpenAIChat).subscribe(({ items }) => {
      setData(items);
      if (items && items.length >= 1) setSelectedId(items[items.length - 1].id);
    });
    return () => sub.unsubscribe();
  }, []);

  //Send Feedback
  const sendFeedback = async (
    like: boolean,
    content: string | null | undefined
  ) => {
    if (content) {
      DataStore.save(new Feedback({ like, comment: content }));
      setSnackBarOpen(true);
    }
  };

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
            { role: 'USER', content: chatFromPrompt ? chatFromPrompt : chat },
          ],
        })
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
      <HistoryDrawer
        data={data}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        overlayVisible={overlayVisible}
        setOverlayVisible={setOverlayVisible}
      />
      <SpeedDialU
        setSelectedId={setSelectedId}
        setOverlayVisible={setOverlayVisible}
      />
      <Box pt={10}>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <img
            style={{ maxWidth: 300 }}
            src={prefersDarkMode ? LogoDark : LogoLight}
          />
        </div>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
          }}
        >
          <Typography>
            <b>
              <i>Unlock your full potential at work with our AI coach</i>
            </b>
          </Typography>
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
            {helperPrompts.map(b => (
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

        {data && data?.length > 0 &&
          data.find(s => s.id === selectedId) &&
          data
            .find(x => x.id === selectedId)!
            .messages?.map((m, index, array) => {
              const isLastMessage = index === array.length - 1;

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

        {/* <div ref={scrollRef} /> */}
      </Box>
      <Offset sx={{ marginBottom: 3 }} />

      <AppBar
        position="fixed"
        sx={{
          top: 'auto',
          bottom: 0,
          alignContent: 'center',
          alignItems: 'center',
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
      </AppBar>
    </>
  );
}
