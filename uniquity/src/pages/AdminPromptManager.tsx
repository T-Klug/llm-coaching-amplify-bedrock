import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import {
  OpenAIModel,
  LazyOpenAIModel,
  Feedback,
  LazyFeedback,
} from '../models';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

export default function AdminPromptManager() {
  const { user } = useAuthenticator();
  const [data, setData] = useState<LazyOpenAIModel>();
  const [feedback, setFeedback] = useState<LazyFeedback[]>();
  const [open, setOpen] = useState(false);
  const [openDS, setOpenDS] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sub = DataStore.observeQuery(OpenAIModel).subscribe(({ items }) =>
      setData(items[0]),
    );
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    const sub = DataStore.observeQuery(Feedback).subscribe(({ items }) =>
      setFeedback(items),
    );
    return () => sub.unsubscribe();
  }, []);
  if (
    !user
      .getSignInUserSession()
      ?.getAccessToken()
      .payload['cognito:groups']?.includes('Admin')
  )
    return <div />;

  return (
    <>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h4" textAlign="center" mb={2}>
          Admin Settings for Open AI
        </Typography>
        <Box m={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="This is the Default System Prompt given to the OpenAI during calls"
                multiline
                value={data ? data.prompt : ''}
                onChange={event => {
                  setData(
                    OpenAIModel.copyOf(data!, draft => {
                      draft.prompt = event.target.value;
                    }),
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Model Open AI should use (gpt-3.5-turbo-0301)"
                fullWidth
                value={data ? data.model : ''}
                onChange={event => {
                  setData(
                    OpenAIModel.copyOf(data!, draft => {
                      draft.model = event.target.value;
                    }),
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Temperature Open AI should use between 0 & 2 (1)"
                value={data ? data.temperature : ''}
                onChange={event => {
                  setData(
                    OpenAIModel.copyOf(data!, draft => {
                      draft.temperature = event.target.value;
                    }),
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Top_P Open AI should use (1)"
                value={data ? data.top_p : ''}
                onChange={event => {
                  setData(
                    OpenAIModel.copyOf(data!, draft => {
                      draft.top_p = event.target.value;
                    }),
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Max Tokens Open AI should use (inf)"
                value={data ? data.max_tokens : ''}
                onChange={event => {
                  setData(
                    OpenAIModel.copyOf(data!, draft => {
                      draft.max_tokens = event.target.value;
                    }),
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Presence Penalty Open AI will use between -2 & 2 (0)"
                value={data ? data.presence_penalty : ''}
                onChange={event => {
                  setData(
                    OpenAIModel.copyOf(data!, draft => {
                      draft.presence_penalty = event.target.value;
                    }),
                  );
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Frequency Penalty Open AI will use between -2 & 2 (0)"
                value={data ? data.frequency_penalty : ''}
                onChange={event => {
                  setData(
                    OpenAIModel.copyOf(data!, draft => {
                      draft.frequency_penalty = event.target.value;
                    }),
                  );
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Box display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={async () => {
            await DataStore.clear();
            setOpenDS(true);
          }}
        >
          Clear DataStore
        </Button>
        <Button variant="contained" onClick={() => navigate('/')}>
          Back to Chat
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            if (!data) return;
            await DataStore.save(data);
            setOpen(true);
          }}
        >
          Save
        </Button>
      </Box>
      <Divider sx={{ mt: 1 }} />
      <Paper>
        <Typography variant="h5">Feedback</Typography>
        {feedback?.map(f => (
          <TextField
            key={f.id}
            fullWidth
            disabled
            value={`Like: ${f.like === null ? 'N/A' : f.like}, Comment: ${
              f.comment
            }`}
          />
        ))}
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          OpenAI Model Saved!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openDS}
        autoHideDuration={6000}
        onClose={() => setOpenDS(false)}
      >
        <Alert
          onClose={() => setOpenDS(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          DataStore Cleared!
        </Alert>
      </Snackbar>
    </>
  );
}
