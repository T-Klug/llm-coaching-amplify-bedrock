import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { LazySystemPrompt, SystemPrompt } from '../models';
import { Alert, Box, Button, Paper, Snackbar, TextField } from '@mui/material';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function AdminPromptManager() {
  const { user } = useAuthenticator();
  const [data, setData] = useState<LazySystemPrompt>();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const sub = DataStore.observeQuery(SystemPrompt).subscribe(({ items }) =>
      setData(items[0])
    );
    return () => sub.unsubscribe();
  }, []);
  if (
    !user
      .getSignInUserSession()
      ?.getAccessToken()
      .payload['cognito:groups'].includes('Admin')
  )
    return <div />;

  return (
    <>
      <Paper sx={{ mt: 10 }}>
        <TextField
          fullWidth
          label="This is the Default System Prompt fed to the OpenAI during calls"
          multiline
          value={data ? data.prompt : ''}
          onChange={event => {
            setData(
              SystemPrompt.copyOf(data!, draft => {
                draft.prompt = event.target.value;
              })
            );
          }}
        />
      </Paper>
      <Box display="flex" justifyContent="flex-end">
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
          Prompt Saved!
        </Alert>
      </Snackbar>
    </>
  );
}
