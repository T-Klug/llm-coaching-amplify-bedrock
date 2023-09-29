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
          Admin Settings for Prompting
        </Typography>
        <Box m={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="This is the Default System Prompt given to the model during calls"
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
