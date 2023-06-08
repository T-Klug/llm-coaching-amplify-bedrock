import { useAuthenticator } from '@aws-amplify/ui-react';
import logo from '../assets/logo.png';
import anotherLogo from '../assets/react-native.png';
import andAnotherLogo from '../assets/openai.jpg';
import Card from '@mui/material/Card';
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Typography,
  Grid,
} from '@mui/material';
import { LaunchOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { user, signOut } = useAuthenticator();
  const navigate = useNavigate();
  return (
    <>
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid>
          <Card variant="outlined" sx={{ maxWidth: 400, borderRadius: 4 }}>
            <CardContent>
              <Typography
                sx={{ textAlign: 'center', pb: 3 }}
                variant="h5"
                component="div"
              >
                What's on your Mind?
              </Typography>
              <CardMedia
                sx={{ height: 200, backgroundSize: 'contain' }}
                image={logo}
              />
              <Typography variant="body2" color="text.secondary" sx={{ p: 5 }}>
                This is where an activity might be and a card representing it
              </Typography>
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<LaunchOutlined />}
                  onClick={() => navigate('/details')}
                >
                  View Now
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
        <Grid>
          <Card variant="outlined" sx={{ maxWidth: 400, borderRadius: 4 }}>
            <CardContent>
              <Typography
                sx={{ textAlign: 'center', pb: 3 }}
                variant="h5"
                component="div"
              >
                Another Activity
              </Typography>
              <CardMedia
                sx={{ height: 200, backgroundSize: 'contain' }}
                image={anotherLogo}
              />
              <Typography variant="body2" color="text.secondary" sx={{ p: 5 }}>
                This is where an activity might be and a card representing it
              </Typography>
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<LaunchOutlined />}
                  onClick={() => navigate('/details')}
                >
                  View Now
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
        <Grid>
          <Card variant="outlined" sx={{ maxWidth: 400, borderRadius: 4 }}>
            <CardContent>
              <Typography
                sx={{ textAlign: 'center', pb: 3 }}
                variant="h5"
                component="div"
              >
                And Another
              </Typography>
              <CardMedia
                sx={{ height: 200, backgroundSize: 'contain' }}
                image={andAnotherLogo}
              />
              <Typography variant="body2" color="text.secondary" sx={{ p: 5 }}>
                This is where an activity might be and a card representing it
              </Typography>
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<LaunchOutlined />}
                  onClick={() => navigate('/details')}
                >
                  View Now
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
        <Grid>
          <Paper elevation={24} sx={{ minWidth: 400, textAlign: 'center' }}>
            <Typography>{user?.attributes?.email}</Typography>
            <Button variant="contained" onClick={() => signOut()}>
              Logout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
