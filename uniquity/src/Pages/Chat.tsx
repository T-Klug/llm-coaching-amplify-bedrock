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
  Button,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import {
  ArrowCircleUp,
  ArrowRightOutlined,
  ChatOutlined,
  ControlPoint,
  HistoryOutlined,
} from '@mui/icons-material';

export default function Chat() {
  const [data, setData] = useState<LazyOpenAIChat[]>();
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [overlayVisible, setOverlayVisible] = useState<boolean>(true);
  const [chat, setChat] = useState<string>('');
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  useEffect(() => {
    if (!selectedId) setOverlayVisible(true);
    const sub = DataStore.observeQuery(OpenAIChat).subscribe(({ items }) =>
      setData(items)
    );
    return () => sub.unsubscribe();
  }, [selectedId]);

  const submit = async () => {
    setChatLoading(true);
    setChat('');
    const model = data?.find(d => d.id === selectedId);
    const saveModel = OpenAIChat.copyOf(model!, draft => {
      draft.messages?.push({ role: 'USER', content: chat });
    });
    const functionInput = {
      id: saveModel.id,
      messages: saveModel.messages,
    };
    await API.graphql<GraphQLQuery<CreateOpenAIChatFuncMutation>>({
      query: createOpenAIChatFunc,
      variables: { input: functionInput },
    });
    setChatLoading(false);
  };

  const newChat = async () => {
    const response = await API.graphql<
      GraphQLQuery<CreateOpenAIChatFuncMutation>
    >({
      query: createOpenAIChatFunc,
    });
    setSelectedId(response.data?.createOpenAIChatFunc?.id);
    setOverlayVisible(false);
  };

  const BuildListItem = (
    id: string,
    messages: (LazyMessagesType | null)[] | null | undefined
  ) => {
    return (
      <ListItem
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
    );
  };

  return (
    <>
      <Modal open={overlayVisible} onClose={() => setOverlayVisible(false)}>
        <>
          <Box
            sx={{
              flexDirection: 'row',
              marginBottom: 10,
              justifyContent: 'space-between',
            }}
          >
            <Typography>Select a previous chat or start a new chat</Typography>
          </Box>
          <Paper style={{ height: '85%' }}>
            {data?.map(d => BuildListItem(d.id, d.messages))}
          </Paper>
          <Button endIcon={<ChatOutlined />} onClick={() => newChat()}>
            New Chat
          </Button>
        </>
      </Modal>
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
        alignSelf="flex-end"
        sx={{
          top: 'auto',
          bottom: 60,
          width: '90%',
        }}
      >
        <Grid item xs={12} mb={1}>
          {chatLoading && <DotsTyping />}
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={10}>
              <TextField
                fullWidth
                multiline
                placeholder="Chat"
                value={chat}
                onChange={t => setChat(t.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <ArrowCircleUp onClick={() => submit()} />
              <HistoryOutlined />
              <ControlPoint />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
