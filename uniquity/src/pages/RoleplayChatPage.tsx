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
import { /*useNavigate,*/ useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import SummaryModal from '../components/roleplay/SummaryModal';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';
import CardMedia from '@mui/material/CardMedia';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function RoleplayChatPage() {
  const { roleplayId } = useParams();

  const [welcomeMessage, setWelcomeMessage] = useState<string>();

  const updateWelcomeMessage = () => {
    let message = 'Welcome to role playing!';
    if (selectedScenario === 'Performance Reviews') {
      message += " You're about to conduct a performance review.";
    }
    // Add other scenarios here as needed

    message += ` This session is set at ${getDifficultyLabel(
      difficultyLevel,
    )} level.`;
    message +=
      " Uniquity AI has assumed the role of your employee, Bill. Initiate the convo whenever you are ready! Don't forget to also ask how he's doing personally. Once you feel like you've covered everything, you can wrap it up and click done.";

    setWelcomeMessage(message);
  };

  // State for selected scenario
  const [selectedScenario, setSelectedScenario] = useState<string>(
    'Performance Reviews',
  ); // default scenario
  const [openModal, setOpenModal] = useState(true);
  const [difficultyLevel, setDifficultyLevel] = useState<number>(1); // 1 for Beginner, 2 for Intermediate, 3 for Advanced

  // This function updates the prompt message based on the user's selections.
  const handleProceedClick = () => {
    // Update the prompt or any other action based on user's selection here.
    // For example, if you're setting a prompt message, you can do:

    // Update the welcome message based on the user's selection
    updateWelcomeMessage();

    if (selectedScenario === 'Performance Reviews') {
      // Update the prompt message based on the difficulty level.
      // This is just an example. You can set any messages you like.
      if (difficultyLevel === 1) {
        // Set beginner level prompt for Performance Reviews.
      } else if (difficultyLevel === 2) {
        // Set intermediate level prompt for Performance Reviews.
      } else if (difficultyLevel === 3) {
        // Set advanced level prompt for Performance Reviews.
      }
    }
    // Close the modal.
    setOpenModal(false);
  };

  // Chat data
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

  const difficultyLabels = ['Beginner', 'Intermediate', 'Advanced'];

  const getDifficultyLabel = (value: number) => {
    return difficultyLabels[value - 1];
  };

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
          scenario: selectedScenario, // Set the scenario
          difficulty: getDifficultyLabel(difficultyLevel), // Set the difficulty
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
        draft.scenario = selectedScenario; // Set the scenario
        draft.difficulty = getDifficultyLabel(difficultyLevel); // Set the difficulty
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
      <Modal open={openModal} onClose={() => console.log('No close')}>
        <Box
          sx={{
            width: 300,
            padding: 4,
            backgroundColor: 'white',
            margin: 'auto',
            marginTop: '15vh',
          }}
        >
          <Typography gutterBottom>Select a scenario:</Typography>
          <Card
            onClick={() => setSelectedScenario('Performance Reviews')}
            sx={{ mb: 2 }}
          >
            <CardMedia
              component="img"
              height="140"
              image="https://images.pexels.com/photos/3184333/pexels-photo-3184333.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="Performance Reviews"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Performance Reviews
              </Typography>
            </CardContent>
          </Card>
          {/* Add more scenario cards as needed */}

          <Typography gutterBottom mt={3}>
            Select difficulty:
          </Typography>
          <Slider
            value={difficultyLevel}
            step={1}
            marks
            min={1}
            max={3}
            // TODO: Uncomment and use 'event' later when needed
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(_: any, newValue: number | number[]) =>
              setDifficultyLevel(newValue as number)
            }
            valueLabelDisplay="auto"
            valueLabelFormat={getDifficultyLabel}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleProceedClick} // ensure this handler is set
          >
            Proceed
          </Button>
        </Box>
      </Modal>

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
