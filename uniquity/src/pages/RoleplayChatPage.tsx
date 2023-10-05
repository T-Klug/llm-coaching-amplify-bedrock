import { DataStore } from 'aws-amplify';
import { useEffect, useRef, useState } from 'react';
import { OpenAiRoleType, LazyRoleplayChat, RoleplayChat } from '../models';
import DotsTyping from '../components/chat/typing/dotsTyping';
import ArrowCircleUp from '@mui/icons-material/ArrowCircleUp';
import MicOffOutlined from '@mui/icons-material/MicOffOutlined';
import MicOutlined from '@mui/icons-material/MicOutlined';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import {
  generateRoleplaySummary,
  submitRoleplayChat,
} from '../helpers/ChatHelpers';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import './Chat.css';
import OverflowText from '../components/chat/OverflowText';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import SummaryModal from '../components/roleplay/SummaryModal';
import Slider from '@mui/material/Slider';
import CardMedia from '@mui/material/CardMedia';
import { difficulty, scenarios } from '../helpers/ScenarioHelpers';
import Grid from '@mui/material/Grid';
import { Avatar, CardHeader, Dialog, Tooltip } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import HomeOutlined from '@mui/icons-material/HomeOutlined';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function RoleplayChatPage() {
  const { roleplayId } = useParams();

  const [welcomeMessage, setWelcomeMessage] = useState<string>();

  // State for selected scenario
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedScenario, setSelectedScenario] = useState<any>(); // default scenario
  const [openModal, setOpenModal] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [difficultyLevel, setDifficultyLevel] = useState<any>(difficulty[0]);
  const [data, setData] = useState<LazyRoleplayChat[]>();
  // Selected Chat ID
  const [selectedId, setSelectedId] = useState<string | undefined>(roleplayId);
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
  const [summaryId, setSummaryId] = useState<string>('');
  const [summaryOpen, setSummaryOpen] = useState<boolean>(false);
  const [summaryLoading, setSummaryLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleChatDone() {
    if (selectedId) {
      setSummaryLoading(true);
      const result = await generateRoleplaySummary(selectedId);
      if (result.data && result.data.generateRoleplaySummaryFunc) {
        setSummaryId(result.data.generateRoleplaySummaryFunc.id);
        setSummaryOpen(true);
        setSummaryLoading(false);
      }
    }
  }

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
    const sub = DataStore.observeQuery(RoleplayChat).subscribe(({ items }) => {
      setData(items);
    });
    return () => sub.unsubscribe();
  }, []);

  // Send Chat Method
  const sendChat = async () => {
    if (summaryLoading) {
      return;
    }
    if (listening) {
      await SpeechRecognition.stopListening();
      setListening(false);
    }

    let response;
    if (chat && !selectedId) {
      response = await DataStore.save(
        new RoleplayChat({
          messages: [{ role: 'USER', content: chat }],
          scenario: selectedScenario.message,
          difficulty: difficultyLevel.prompt,
          scenarioPrompt: selectedScenario.scenario,
        }),
      );
      setChat('');
      resetTranscript();
    } else if (chat && selectedId) {
      const model = data?.find(d => d.id === selectedId);
      const saveModel = RoleplayChat.copyOf(model!, draft => {
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
    await submitRoleplayChat(response);
    setChatLoading(false);
  };

  return (
    <>
      <SummaryModal
        open={summaryOpen}
        setOpen={setSummaryOpen}
        summaryId={summaryId}
      />

      {/* Welcome Message Card */}
      <Card sx={{ borderRadius: 6 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" sx={{ mb: 3 }}>
            {welcomeMessage}
          </Typography>
          {/* ... rest of the content */}
        </CardContent>
      </Card>

      {/* Scenario & Difficulty Selection Modal */}
      <Dialog
        fullScreen
        open={openModal}
        onClose={() => console.log('No close')}
      >
        <div style={{ margin: 40 }}>
          <Avatar
            onClick={() => navigate('/')}
            sx={{ float: 'right', cursor: 'pointer' }}
          >
            <HomeOutlined />
          </Avatar>
          <Typography textAlign={'center'} variant="h5" mb={4}>
            Welcome to role play scnearios
          </Typography>
          <Typography>
            Select difficulty of the AI roleplayer
            <Tooltip
              title="You can select beginner, intermediate, or advanced. This setting tells the AI how confrontational it should be."
              placement="top"
            >
              <InfoOutlined fontSize="small" />
            </Tooltip>
          </Typography>

          <Slider
            value={difficultyLevel ? difficultyLevel.level : 1}
            step={1}
            marks
            min={1}
            max={3}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(_: any, newValue: number | number[]) =>
              setDifficultyLevel(difficulty[(newValue as number) - 1])
            }
            valueLabelDisplay="auto"
            valueLabelFormat={i => difficulty[i - 1].name}
          />
          <Typography variant="h6" mb={3}>
            Click one of the scenarios:
          </Typography>
          <Grid container spacing={2}>
            {scenarios.map(s => {
              return (
                <Grid item key={s.scenario}>
                  <Card
                    raised
                    sx={{
                      cursor: 'pointer',
                      maxHeight: 500,
                      maxWidth: 400,
                      borderRadius: 8,
                    }}
                    onClick={() => {
                      setSelectedScenario(s);
                      setWelcomeMessage(s.message);
                      setOpenModal(false);
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={s.image}
                      alt={s.message}
                    />
                    <CardHeader title={s.title} />
                    <CardContent>
                      <Typography>{s.message}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Dialog>

      <Box>
        {data &&
          data?.length > 0 &&
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
          disabled={summaryLoading}
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
          disabled={summaryLoading}
          onClick={handleChatDone}
          sx={{ borderRadius: 8 }}
          variant="contained"
        >
          {summaryLoading ? <CircularProgress /> : 'Done Role Playing'}
        </Button>
      </AppBar>
    </>
  );
}
