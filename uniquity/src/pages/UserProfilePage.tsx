import {
  Box,
  Grid,
  InputAdornment,
  Rating,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { LazyUserProfile, UserProfile } from '../models';
import { InfoOutlined } from '@mui/icons-material';
import profileImage from '../assets/profile.jpg';

export default function UserProfilePage() {
  const [userProfile, setUserProfile] = useState<LazyUserProfile>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [assess, setAssess] = useState<any>();
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
              value={userProfile ? userProfile.name : ''}
              onChange={event => {
                DataStore.save(
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
              helperText="(123)-123-1234"
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
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Professional Background"
              fullWidth
              multiline
              minRows={10}
              value={userProfile ? userProfile.background : ''}
              onChange={event => {
                DataStore.save(
                  UserProfile.copyOf(userProfile!, draft => {
                    draft.background = event.target.value;
                  }),
                );
              }}
            />
          </Grid>
          <Grid mb={5} item xs={12}>
            <Typography mt={5} variant="h5">
              Personality Test
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
