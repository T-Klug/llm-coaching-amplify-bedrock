import { Button, TextField, Typography } from '@mui/material';

export default function UserProfile() {
  return (
    <>
      <Typography>
        Please provide your phone number to opt-in and enable being able to text
        your coach.
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
        <TextField helperText="(123)-123-1234" />
        <Button sx={{ mt: 3 }} variant="contained">
          Opt-In to texting with your coach
        </Button>
      </div>
    </>
  );
}
