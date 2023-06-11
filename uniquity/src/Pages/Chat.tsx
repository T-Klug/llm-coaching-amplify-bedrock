import { DataStore } from 'aws-amplify';
import { useEffect, useRef, useState } from 'react';
import { LazyOpenAIChat, OpenAIChat, OpenAiRoleType } from '../models';
import DotsTyping from '../components/typing/dotsTyping';
import {
  AppBar,
  Box,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  SpeedDial,
  SpeedDialAction,
  SwipeableDrawer,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowCircleUp,
  Menu,
  ControlPoint,
  HistoryOutlined,
  LogoutOutlined,
  AdminPanelSettingsOutlined,
  DeleteOutlineOutlined,
  MicOffOutlined,
  MicOutlined,
} from '@mui/icons-material';
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
import LogoLight from '../assets/logo-black-no-back.svg';
import LogoDark from '../assets/logo-no-back.svg';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { iOS, submitOpenAI, compareDates } from '../helpers/ChatHelpers';

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
  // Auth Context
  const { user, signOut } = useAuthenticator();
  // Navigation Context
  const navigate = useNavigate();
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
    const sub = DataStore.observeQuery(OpenAIChat).subscribe(({ items }) =>
      setData(items)
    );
    return () => sub.unsubscribe();
  }, [selectedId]);

  // Helper method to decide if we should display the history buckets
  const shouldDisplayChatGroup = (
    data: LazyOpenAIChat[] | undefined,
    groupName: string
  ): boolean => {
    const list = data?.map(d => BuildListItem(d, groupName));
    if (list?.length === 1 && list[0] !== undefined) {
      return true;
    }
    if (list?.every((val, _i, arr) => val === arr[0])) {
      return false;
    }
    return true;
  };

  // New Chat Method
  const newChat = () => setSelectedId(undefined);

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

  // Delete Chat Method
  function deleteChat(aiChat: LazyOpenAIChat) {
    if (aiChat && aiChat.id !== selectedId) {
      DataStore.delete(aiChat);
    }
  }

  // History Builder Method
  const BuildListItem = (aiChat: LazyOpenAIChat, listName: string) => {
    const date = new Date(aiChat.createdAt!);
    if (compareDates(date) === listName) {
      return (
        <ListItem
          sx={{
            border: 1,
            borderRadius: 4,
            width: '90%',
            m: 'auto',
            marginBottom: 1,
          }}
          dense
          key={aiChat.id}
          secondaryAction={
            aiChat && (
              <DeleteOutlineOutlined
                sx={{ cursor: 'pointer' }}
                onClick={() => deleteChat(aiChat)}
              />
            )
          }
        >
          <ListItemText
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedId(aiChat.id);
              setOverlayVisible(false);
            }}
            primaryTypographyProps={{ noWrap: true, width: '85%' }}
            primary={aiChat && aiChat?.messages && aiChat.messages[0]?.content}
          />
        </ListItem>
      );
    }
  };

  return (
    <>
      <SwipeableDrawer
        PaperProps={{ sx: { maxHeight: 500 } }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor="bottom"
        open={overlayVisible}
        onClose={() => setOverlayVisible(false)}
        onOpen={() => setOverlayVisible(true)}
      >
        <Typography textAlign="center" variant="h5">
          Previous Coaching Conversations
        </Typography>
        {shouldDisplayChatGroup(data, 'Today') && (
          <List
            subheader={
              <ListSubheader sx={{ backgroundColor: 'unset' }}>
                Today
              </ListSubheader>
            }
          >
            {data?.map(d => BuildListItem(d, 'Today'))}
          </List>
        )}
        {shouldDisplayChatGroup(data, 'Yesterday') && (
          <List
            subheader={
              <ListSubheader sx={{ backgroundColor: 'unset' }}>
                Yesterday
              </ListSubheader>
            }
          >
            {data?.map(d => BuildListItem(d, 'Yesterday'))}
          </List>
        )}
        {shouldDisplayChatGroup(data, 'This week') && (
          <List
            subheader={
              <ListSubheader sx={{ backgroundColor: 'unset' }}>
                This Week
              </ListSubheader>
            }
          >
            {data?.map(d => BuildListItem(d, 'This week'))}
          </List>
        )}
        {shouldDisplayChatGroup(data, 'Other') && (
          <List
            subheader={
              <ListSubheader sx={{ backgroundColor: 'unset' }}>
                This Month+
              </ListSubheader>
            }
          >
            {data?.map(d => BuildListItem(d, 'Other'))}
          </List>
        )}
      </SwipeableDrawer>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{
          position: 'fixed',
          top: 5,
          right: 16,
        }}
        icon={<Menu />}
        direction="down"
        FabProps={{
          sx: {
            bgcolor: 'darkgray',
            '&:hover': {
              bgcolor: 'darkgray',
            },
          },
        }}
      >
        <SpeedDialAction
          icon={<HistoryOutlined />}
          tooltipTitle="History"
          onClick={() => setOverlayVisible(true)}
        />
        <SpeedDialAction
          icon={<ControlPoint />}
          tooltipTitle="New Chat"
          onClick={() => newChat()}
        />
        {user
          .getSignInUserSession()
          ?.getAccessToken()
          .payload['cognito:groups'].includes('Admin') && (
          <SpeedDialAction
            icon={<AdminPanelSettingsOutlined />}
            tooltipTitle="Admin"
            onClick={() => navigate('/admin')}
          />
        )}
        <SpeedDialAction
          icon={<LogoutOutlined />}
          tooltipTitle="Sign Out"
          onClick={() => signOut()}
        />
      </SpeedDial>
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
