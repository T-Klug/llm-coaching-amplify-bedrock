import { API, DataStore } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import { useEffect, useRef, useState } from 'react';
import { CreateOpenAIChatFuncMutation } from '../graphql/API';
import { createOpenAIChatFunc } from '../graphql/mutations';
import {
  LazyMessagesType,
  LazyOpenAIChat,
  OpenAIChat,
  OpenAiRoleType,
} from '../models';
import DotsTyping from '../components/typing/dotsTyping';
import {
  Box,
  Dialog,
  Divider,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import {
  ArrowCircleUp,
  ArrowRightOutlined,
  ControlPoint,
  HistoryOutlined,
} from '@mui/icons-material';

export default function Chat() {
  const [data, setData] = useState<LazyOpenAIChat[]>();
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const [chat, setChat] = useState<string>('');
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  useEffect(() => {
    const sub = DataStore.observeQuery(OpenAIChat).subscribe(({ items }) =>
      setData(items)
    );
    return () => sub.unsubscribe();
  }, [selectedId]);

  const submitOpenAI = async (response: OpenAIChat) => {
    const saveModel = OpenAIChat.copyOf(response, draft => draft);
    const functionInput = {
      id: saveModel.id,
      messages: saveModel.messages,
    };
    await API.graphql<GraphQLQuery<CreateOpenAIChatFuncMutation>>({
      query: createOpenAIChatFunc,
      variables: { input: functionInput },
    });
  };

  const newChat = () => setSelectedId(undefined);

  const sendChat = async () => {
    let response;
    if (chat && !selectedId) {
      response = await DataStore.save(
        new OpenAIChat({ messages: [{ role: 'USER', content: chat }] })
      );
      setChat('');
    } else if (chat && selectedId) {
      const model = data?.find(d => d.id === selectedId);
      const saveModel = OpenAIChat.copyOf(model!, draft => {
        draft.messages?.push({ role: 'USER', content: chat });
      });
      response = await DataStore.save(saveModel);
      console.log(response);
      setChat('');
    } else {
      return;
    }
    if (!selectedId) setSelectedId(response.id);
    setChatLoading(true);
    await submitOpenAI(response);
    setChatLoading(false);
  };

  const BuildListItem = (
    id: string,
    messages: (LazyMessagesType | null)[] | null | undefined
  ) => {
    return (
      <div key={id}>
        <ListItem
          sx={{ cursor: 'pointer' }}
          key={id}
          onClick={() => {
            setSelectedId(id);
            setOverlayVisible(false);
          }}
        >
          <ListItemText
            primary={messages && messages[messages?.length - 1]?.content}
          />
          <ListItemIcon>
            <ArrowRightOutlined />
          </ListItemIcon>
        </ListItem>
        <Divider />
      </div>
    );
  };

  return (
    <>
      <Dialog open={overlayVisible} onClose={() => setOverlayVisible(false)}>
        <>
          <Box
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          ></Box>
          <Paper>
            <Typography textAlign="center" variant="h5">
              Select a previous chat
            </Typography>
            {data?.map(d => BuildListItem(d.id, d.messages))}
          </Paper>
        </>
      </Dialog>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              mb: 14,
            }}
          >
            <>
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
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{
                              color: '#fff',
                              textAlign: 'right',
                            }}
                          >
                            {m.content}
                          </Typography>
                        </Box>
                      );
                  })}
            </>
            <div ref={scrollRef} />
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        position="fixed"
        sx={{
          top: 'auto',
          bottom: 60,
          width: '80%',
        }}
      >
        <Grid item xs={12} mb={1}>
          {chatLoading && <DotsTyping />}
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Paper>
                <TextField
                  fullWidth
                  multiline
                  placeholder="Chat"
                  InputProps={{
                    endAdornment: (
                      <>
                        <ArrowCircleUp
                          fontSize="large"
                          color="primary"
                          sx={{ cursor: 'pointer' }}
                          onClick={() => sendChat()}
                        />
                        <HistoryOutlined
                          onClick={() => setOverlayVisible(true)}
                          fontSize="large"
                          sx={{ cursor: 'pointer' }}
                        />
                        <ControlPoint
                          onClick={() => newChat()}
                          fontSize="large"
                          sx={{ cursor: 'pointer' }}
                        />
                      </>
                    ),
                  }}
                  value={chat}
                  onChange={t => setChat(t.target.value)}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
