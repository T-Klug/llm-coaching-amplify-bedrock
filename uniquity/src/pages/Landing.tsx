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
import { Link, useNavigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import {
  LazyOpenAIChat,
  LazyUserProfile,
  OpenAIChat,
  UserProfile,
} from '../models';
import { HistoryDrawer } from '../components/landing/HistoryDrawer/HistoryDrawer';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';

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

const assessment = [
  {
    id: 1,
    question: 'I enjoy exploring new ideas and concepts.',
    rating: 0,
  },
  {
    id: 2,
    question: 'I am open to trying different approaches to problem-solving.',
    rating: 0,
  },
  {
    id: 3,
    question: 'I find value in seeking out diverse perspectives.',
    rating: 0,
  },
  {
    id: 4,
    question: 'I am organized and like to plan my tasks in advance.',
    rating: 0,
  },
  {
    id: 5,
    question: 'I pay attention to detail and accuracy in my work.',
    rating: 0,
  },
  {
    id: 6,
    question:
      'I set specific goals for myself and work towards achieving them.',
    rating: 0,
  },
  {
    id: 7,
    question: 'I enjoy socializing and interacting with new people.',
    rating: 0,
  },
  {
    id: 8,
    question: 'I feel energized by attending social events and gatherings.',
    rating: 0,
  },
  {
    id: 9,
    question: 'I am comfortable expressing my opinions in group settings.',
    rating: 0,
  },
  {
    id: 10,
    question: 'I find it important to maintain harmonious relationships.',
    rating: 0,
  },
  {
    id: 11,
    question: 'I am approachable and willing to help others.',
    rating: 0,
  },
  {
    id: 12,
    question: 'I enjoy collaborating and finding common ground with others.',
    rating: 0,
  },
  {
    id: 13,
    question: 'I often experience worry and anxiety about future outcomes.',
    rating: 0,
  },
  {
    id: 14,
    question: 'I tend to dwell on negative experiences and thoughts.',
    rating: 0,
  },
  {
    id: 15,
    question: 'I am sensitive to criticism and feedback from others.',
    rating: 0,
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
  const [userProfile, setUserProfile] = useState<LazyUserProfile>(
    new UserProfile({
      name: '',
      personalityTest: '',
      background: '',
    }),
  );
  const [assess, setAssess] = useState(assessment);
  useEffect(() => {
    const sub = DataStore.observeQuery(UserProfile).subscribe(({ items }) => {
      if (items && items.length > 0) {
        setUserProfile(items[0]);
        setAssess(JSON.parse(items[0].personalityTest!));
        if (!items[0].name) {
          setActiveStep(0);
        } else if (
          !items[0].personalityTest ||
          items[0].personalityTest?.includes('0')
        ) {
          setActiveStep(1);
        } else if (!items[0].background) {
          setActiveStep(2);
        } else if (
          items[0].name &&
          items[0].personalityTest &&
          !items[0].personalityTest?.includes('0') &&
          items[0].background
        ) {
          setActiveStep(3);
        }
      }
    });
    return () => sub.unsubscribe();
  }, []);

  // Websocket for the chats
  useEffect(() => {
    const sub = DataStore.observeQuery(OpenAIChat).subscribe(({ items }) => {
      setData(items);
    });
    return () => sub.unsubscribe();
  }, []);

  function handleRating(index: number, newValue: number | null) {
    const nextAssess = assess.map((q, i) => {
      if (i === index) {
        q.rating = newValue || 0;
        return q;
      } else {
        return q;
      }
    });
    setAssess(nextAssess);
  }

  const steps = [
    {
      label: 'What is your name?',
      component: (
        <TextField
          sx={{ width: '60%' }}
          value={userProfile.name}
          onChange={event =>
            setUserProfile(prev =>
              UserProfile.copyOf(prev, draft => {
                draft.name = event.target.value;
              }),
            )
          }
        />
      ),
    },
    {
      label: 'Take a personality test',
      component: assess.map((q, index) => (
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
            onChange={(_event, newValue) => handleRating(index, newValue)}
          ></Rating>
        </div>
      )),
    },
    {
      label: 'Share your professional background',
      description: `Add your resume or linkedIn so we sessions are further tailored to you.`,
      component: (
        <TextField
          fullWidth
          multiline
          minRows={10}
          value={userProfile.background}
          onChange={event =>
            setUserProfile(prev =>
              UserProfile.copyOf(prev, draft => {
                draft.background = event.target.value;
              }),
            )
          }
        />
      ),
    },
    {
      label: 'Get to know your AI coach',
      description:
        'Get to know your personalized coach a little with some fun icebreakers.',
    },
  ];

  const handleNext = async () => {
    const saveData = UserProfile.copyOf(userProfile, d => {
      d.personalityTest = JSON.stringify(assess);
    });
    await DataStore.save(saveData);
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
              <Typography variant="h5">Your coaching streak</Typography>
              <Divider flexItem variant="middle" />
            </div>
            <Typography>
              Talk to your AI coach every week to learn and grow.
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
              <Typography variant="h5">Personalize your AI coach</Typography>
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
                        {step.component}
                        <div>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === steps.length - 1
                              ? 'Start Chatting Now'
                              : 'Continue'}
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
              <Typography variant="h5">
                Work towards your goals with your AI coach
              </Typography>
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
              <Typography variant="h5">
                Get impromptu help from your AI coach
              </Typography>
              <Divider flexItem variant="middle" />
            </div>
            <Typography>TBD</Typography>

            <Button
              variant="contained"
              sx={{ margin: 3 }}
              onClick={() => navigate('/chat')}
            >
              Start A New Chat
            </Button>

            <Typography sx={{ marginTop: 3 }} variant="h6">
              Previous Chats
            </Typography>

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
                          <ListItemButton component={Link} to={`/chat/${d.id}`}>
                            <ListItemText
                              primaryTypographyProps={{
                                noWrap: true,
                              }}
                              primary={
                                d.messages[0]?.content?.includes(
                                  "Hi there! I'm Uniquity AI, your personal development coach.",
                                )
                                  ? d.messages[1]?.content
                                  : d.messages[0]?.content
                              }
                            />
                            <ListItemIcon
                              sx={{ fontSize: 20, minWidth: 'unset' }}
                            >
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
