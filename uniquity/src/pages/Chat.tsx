import { DataStore } from 'aws-amplify';
import { useEffect, useRef, useState } from 'react';
import { LazyOpenAIChat, OpenAIChat, OpenAiRoleType } from '../models';
import DotsTyping from '../components/chat/typing/dotsTyping';
import {
  ArrowCircleUp,
  MicOffOutlined,
  MicOutlined,
} from '@mui/icons-material';
import LogoLight from '../assets/logo-black-no-back.svg';
import LogoDark from '../assets/logo-no-back.svg';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { submitOpenAI } from '../helpers/ChatHelpers';
import { HistoryDrawer } from '../components/chat/HistoryDrawer/HistoryDrawer';
import { SpeedDialU } from '../components/chat/SpeedDialU/SpeedDialU';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
export default function Chat() {
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
  // Scroll Ref for pushing chat up
  const scrollRef = useRef<HTMLDivElement>(null);
  // Check if dark or light mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // State for if the microphone is listening
  const [listening, setListening] = useState<boolean>(false);
  // Speech recognition
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // Background object for Box in middle of screen
  const background = {
    backgroundImage: `url(${prefersDarkMode ? LogoDark : LogoLight})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    height: 500,
  };
  // If they are creating transcripts with the microphone set the chat input to it
  useEffect(() => {
    setChat(transcript);
  }, [transcript]);
  // Scroll page down as new chats come in
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
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

  // Send Chat Method
  const sendChat = async () => {
    if (listening) {
      await SpeechRecognition.stopListening();
      setListening(false);
    }

    let response;
    if (chat && !selectedId) {
      response = await DataStore.save(
        new OpenAIChat({ messages: [{ role: 'USER', content: chat }] })
      );
      setChat('');
      resetTranscript();
    } else if (chat && selectedId) {
      const model = data?.find(d => d.id === selectedId);
      const saveModel = OpenAIChat.copyOf(model!, draft => {
        draft.messages?.push({ role: 'USER', content: chat });
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
      <Box sx={selectedId ? undefined : background} pt={10}>
        {data &&
          data?.length > 0 &&
          data.find(s => s.id === selectedId) &&
          data
            .find(x => x.id === selectedId)!
            .messages?.map((m, index) => {
              if (m?.role === OpenAiRoleType.ASSISTANT)
                return (
                  <Box
                    key={m.role + index}
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
                    <Typography
                      variant="body2"
                      style={{
                        color: '#000',
                        justifyContent: 'center',
                      }}
                    >
                      {m.content}
                    </Typography>
                  </Box>
                );
              if (m?.role === OpenAiRoleType.USER)
                return (
                  <Box
                    key={m.role + index}
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
                    <Typography
                      variant="body2"
                      style={{
                        color: '#fff',
                      }}
                    >
                      {m.content}
                    </Typography>
                  </Box>
                );
            })}
        <div ref={scrollRef} />
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
