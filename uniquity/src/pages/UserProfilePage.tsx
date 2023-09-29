import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { LazyUserProfile, UserProfile } from '../models';
import { InfoOutlined } from '@mui/icons-material';
import profileImage from '../assets/profile.jpg';
import { generateUserSummaryCall } from '../helpers/ChatHelpers';

export default function UserProfilePage() {
  const [userProfile, setUserProfile] = useState<LazyUserProfile>();
  const [buttonDisabled, setButtonsDisabled] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [assess, setAssess] = useState<any>();
  // Snack Bar
  const [snackbarOpen, setSnackBarOpen] = useState<boolean>(false);
  useEffect(() => {
    const sub = DataStore.observeQuery(UserProfile).subscribe(({ items }) => {
      if (items && items.length > 0) {
        setUserProfile(items[0]);
        setAssess(JSON.parse(items[0].personalityTest!));
      }
    });
    return () => sub.unsubscribe();
  }, []);

  function handleRating(index: number, newValue: number | null) {
    const nextAssess = assess.map((q: { rating: number }, i: number) => {
      if (i === index) {
        q.rating = newValue || 0;
        return q;
      } else {
        return q;
      }
    });
    setAssess(nextAssess);
    DataStore.save(
      UserProfile.copyOf(userProfile!, d => {
        d.personalityTest = JSON.stringify(assess);
      }),
    );
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        alignContent: 'center',
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert
          onClose={() => setSnackBarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Profile Saved
        </Alert>
      </Snackbar>
      <Box m={2}>
        <Grid mb={5} item xs={12}>
          <img
            width="100%"
            height={200}
            style={{ objectFit: 'cover' }}
            src={profileImage}
          />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Name"
              fullWidth
              value={userProfile && userProfile.name ? userProfile.name : ''}
              onChange={event => {
                setUserProfile(
                  UserProfile.copyOf(userProfile!, draft => {
                    draft.name = event.target.value;
                  }),
                );
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone number"
              fullWidth
              helperText="1231231234"
              value={userProfile && userProfile.phone ? userProfile.phone : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="By Adding your phone number you are opting in to text coaching"
                      placement="top-end"
                    >
                      <InfoOutlined />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              onChange={event => {
                setUserProfile(
                  UserProfile.copyOf(userProfile!, draft => {
                    draft.phone = event.target.value;
                  }),
                );
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Professional Background"
              fullWidth
              multiline
              minRows={10}
              value={
                userProfile && userProfile.background
                  ? userProfile.background
                  : ''
              }
              onChange={event => {
                setUserProfile(
                  UserProfile.copyOf(userProfile!, draft => {
                    draft.background = event.target.value;
                  }),
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="AI Generated User Summary"
              fullWidth
              multiline
              minRows={10}
              value={
                userProfile && userProfile.userSummary
                  ? userProfile.userSummary
                  : ''
              }
              onChange={event => {
                setUserProfile(
                  UserProfile.copyOf(userProfile!, draft => {
                    draft.userSummary = event.target.value;
                  }),
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={buttonDisabled}
              onClick={async () => {
                await DataStore.save(userProfile!);
                setSnackBarOpen(true);
              }}
              sx={{ float: 'right', width: 80 }}
              variant="contained"
            >
              Save
            </Button>
            <Button
              disabled={buttonDisabled}
              onClick={async () => {
                setButtonsDisabled(true);
                const result = await generateUserSummaryCall();
                setButtonsDisabled(false);
                console.log(result);
              }}
              sx={{ mr: 3, float: 'right' }}
              variant="contained"
            >
              Regenerate Summary
            </Button>
          </Grid>
          <Grid mb={5} item xs={12}>
            <Typography mt={5} variant="h5">
              What motivates you at work
            </Typography>
            {assess &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              assess.map((q: any, index: any) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                    borderBottomStyle: 'solid',
                    borderBottomWidth: 1,
                  }}
                  key={index}
                >
                  <Typography component="legend">{q.question}</Typography>
                  <Rating
                    value={q.rating}
                    onChange={(_event, newValue) =>
                      handleRating(index, newValue)
                    }
                  ></Rating>
                </div>
              ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
