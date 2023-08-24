import Typography from '@mui/material/Typography';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import {
  ArrowForwardIosOutlined,
  Looks3Outlined,
  Looks4Outlined,
  Looks5Outlined,
  LooksOneOutlined,
  LooksTwoOutlined,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { LazyOpenAIChat, OpenAIChat } from '../models';
import { HistoryDrawer } from '../components/landing/HistoryDrawer/HistoryDrawer';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#277A37',
  },
});

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <LooksOneOutlined fontSize="inherit" />,
    label: 'One',
  },
  2: {
    icon: <LooksTwoOutlined fontSize="inherit" />,
    label: 'Two',
  },
  3: {
    icon: <Looks3Outlined fontSize="inherit" />,
    label: 'Three',
  },
  4: {
    icon: <Looks4Outlined fontSize="inherit" />,
    label: 'Four',
  },
  5: {
    icon: <Looks5Outlined fontSize="inherit" />,
    label: 'Five',
  },
};

const steps = [
  {
    label: 'What is your name?',
    description: `Enter your name so we know what to call you.`,
  },
  {
    label: 'Take a personality test',
    description:
      'Take a test to help our Coach tailor their tone and approach to you.',
  },
  {
    label: 'Share your professional background',
    description: `Add your resume or linkedIn so we sessions are further tailored to you.`,
  },
  {
    label: 'Review your profile',
    description: `Take a look at your profile and make any corrections needed.`,
  },
  {
    label: 'Introduction to your coach',
    description:
      'Get to know your personalized coach a little with some fun icebreakers.',
  },
];

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export default function Landing() {
  const [activeStep, setActiveStep] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  // Chat data
  const [data, setData] = useState<LazyOpenAIChat[]>();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Websocket for the chats
  useEffect(() => {
    const sub = DataStore.observeQuery(OpenAIChat).subscribe(({ items }) => {
      setData(items);
    });
    return () => sub.unsubscribe();
  }, []);

  return (
    <>
      <HistoryDrawer
        data={data}
        overlayVisible={overlayVisible}
        setOverlayVisible={setOverlayVisible}
      />
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
        <Card raised sx={{ borderRadius: 6, width: '85%' }}>
          <CardContent>
            <div style={{ marginBottom: 10 }}>
              <Typography variant="h5">Your Coaching Streak</Typography>
              <Divider flexItem variant="middle" />
            </div>
            <Typography>
              Talk to your coach every week to unlock your full potential at
              work.
            </Typography>
            <StyledRating
              IconContainerComponent={IconContainer}
              size="large"
              readOnly
              value={3}
            />
          </CardContent>
        </Card>
        <Card raised sx={{ borderRadius: 6, marginTop: 5, width: '85%' }}>
          <CardContent>
            <div style={{ marginBottom: 10 }}>
              <Typography variant="h5">Personalize Your Coach</Typography>
              <Divider flexItem variant="middle" />
            </div>
            <Box>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step?.label}>
                    <StepLabel
                      optional={
                        index === 4 ? (
                          <Typography variant="caption">Last step</Typography>
                        ) : null
                      }
                    >
                      {step?.label}
                    </StepLabel>
                    <StepContent>
                      <Typography>{step.description}</Typography>
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button>
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                  </Button>
                </Paper>
              )}
            </Box>
          </CardContent>
        </Card>
        <Card raised sx={{ borderRadius: 6, marginTop: 5, width: '85%' }}>
          <CardContent>
            <div style={{ marginBottom: 10 }}>
              <Typography variant="h5">Work On Your Goals</Typography>
              <Divider flexItem variant="middle" />
            </div>
            <Typography>TBD</Typography>
            <Button variant="contained" sx={{ marginTop: 3 }}>
              Set your First Goal
            </Button>
          </CardContent>
        </Card>
        <Card raised sx={{ borderRadius: 6, marginTop: 5, width: '85%' }}>
          <CardContent>
            <div style={{ marginBottom: 10 }}>
              <Typography variant="h5">Get Impromptu Help</Typography>
              <Divider flexItem variant="middle" />
            </div>
            <Typography>TBD</Typography>

            <Typography sx={{ marginTop: 10 }} variant="h6">
              Previous Chats
            </Typography>
            <Divider flexItem variant="middle" />
            <List
              sx={{
                display: 'inline-block',
                borderRadius: 8,
                width: '100%',
              }}
              dense
            >
              {data &&
                data
                  .slice(data.length - 3, data.length)
                  .reverse()
                  .map(
                    d =>
                      d.messages && (
                        <ListItem key={d.id}>
                          <ListItemButton component="a" href={`/chat/${d.id}`}>
                            <ListItemText
                              primaryTypographyProps={{
                                noWrap: true,
                                width: '85%',
                              }}
                              primary={d.messages[1]!.content}
                            />
                            <ListItemIcon sx={{ fontSize: 20 }}>
                              <ArrowForwardIosOutlined />
                            </ListItemIcon>
                          </ListItemButton>
                        </ListItem>
                      ),
                  )}
            </List>
            <div>
              <Button
                variant="contained"
                sx={{ margin: 3 }}
                onClick={() => navigate('/chat')}
              >
                Start A New Chat
              </Button>
              <Button
                variant="contained"
                sx={{ margin: 3 }}
                onClick={() => setOverlayVisible(true)}
              >
                View More Chat History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
