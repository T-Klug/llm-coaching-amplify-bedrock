import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import { LazyUserProfile, UserProfile } from '../models';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import CardMedia from '@mui/material/CardMedia';
import getToKnowImage from '../assets/get-to-know.jpg';
import roleplayImage from '../assets/roleplay.jpg';
import adhocImage from '../assets/adhoc.jpg';
import goalImage from '../assets/goals.jpg';
import StreakCounter from '../components/landing/StreakCounter/StreakCounter';
import Slide from '@mui/material/Slide';
import { generateUserSummaryCall } from '../helpers/ChatHelpers';

const assessment = [
  {
    id: 1,
    question: 'Challenge',
    rating: 0,
  },
  {
    id: 2,
    question: 'Purpose',
    rating: 0,
  },
  {
    id: 3,
    question: 'Autonomy',
    rating: 0,
  },
  {
    id: 4,
    question: 'Learning',
    rating: 0,
  },
  {
    id: 5,
    question: 'Money',
    rating: 0,
  },
  {
    id: 6,
    question: 'Promotion',
    rating: 0,
  },
  {
    id: 7,
    question: 'Recognition',
    rating: 0,
  },
  {
    id: 8,
    question: 'Job security',
    rating: 0,
  },
  {
    id: 9,
    question: 'Benefits',
    rating: 0,
  },
  {
    id: 10,
    question: 'Competition',
    rating: 0,
  },
  {
    id: 11,
    question: 'Balance',
    rating: 0,
  },
];

export default function Landing() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
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
          items[0].personalityTest?.includes('":0')
        ) {
          setActiveStep(1);
        } else if (!items[0].background) {
          setActiveStep(2);
        } else if (
          items[0].name &&
          items[0].personalityTest &&
          !items[0].personalityTest?.includes('":0') &&
          items[0].background &&
          !items[0].completedIcebreakers
        ) {
          setActiveStep(3);
        } else if (items[0].completedIcebreakers) {
          setActiveStep(4);
        }
      }
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
      label: 'What is your name',
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
      label: 'What motivates you at work',
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
      label: 'What is your professional background',
      description: `Describe your background, copy in your resume, or copy in your linkedin profile contents`,
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
        'Get to know your personalized coach with some fun icebreakers.',
    },
  ];

  const handleIce = async () => {
    generateUserSummaryCall();
    navigate('/icebreaker');
  };

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
        <Card
          raised
          sx={{ borderRadius: 6, marginTop: 5, width: '85%', marginBottom: 5 }}
        >
          <CardMedia height={200} component="img" image={getToKnowImage} />
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
                            onClick={
                              index === steps.length - 1
                                ? handleIce
                                : handleNext
                            }
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === steps.length - 1
                              ? 'Start Chatting Now'
                              : 'Continue'}
                          </Button>
                          <Button
                            variant="outlined"
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
                <>
                  <Typography mb={3}>
                    All steps completed! This is the your personal summary that
                    your coach will start using. You can always change it in
                    your profile.
                  </Typography>
                  <TextField
                    disabled
                    value={userProfile.userSummary}
                    multiline
                    fullWidth
                    minRows={5}
                  />

                  <Button
                    variant="contained"
                    onClick={handleReset}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Restart
                  </Button>
                </>
              )}
            </Box>
          </CardContent>
        </Card>

        <Slide
          direction="left"
          in={activeStep === steps.length}
          mountOnEnter
          unmountOnExit
        >
          <StreakCounter />
        </Slide>
        <Card raised sx={{ borderRadius: 6, marginTop: 5, width: '85%' }}>
          <CardMedia height={200} component="img" image={adhocImage} />
          <CardContent>
            <div style={{ marginBottom: 10 }}>
              <Typography variant="h5">Quick Coaching</Typography>
              <Divider flexItem variant="middle" />
            </div>
            <Typography>
              Talk to your coach about anything that's top of mind
            </Typography>

            <Button
              variant="contained"
              sx={{ margin: 3 }}
              onClick={() => navigate('/chat')}
            >
              Start A Conversation
            </Button>
          </CardContent>
        </Card>
        <Card raised sx={{ borderRadius: 6, marginTop: 5, width: '85%' }}>
          <CardMedia height={200} component="img" image={roleplayImage} />
          <CardContent>
            <div style={{ marginBottom: 10 }}>
              <Typography variant="h5">Role play</Typography>
              <Divider flexItem variant="middle" />
            </div>
            <Typography>
              Your AI coach will role play a scenario with you
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/roleplay')}
              sx={{ marginTop: 3 }}
            >
              Role Play
            </Button>
          </CardContent>
        </Card>
        <Card
          raised
          sx={{ borderRadius: 6, marginTop: 5, width: '85%', marginBottom: 5 }}
        >
          <CardMedia
            sx={{ objectPosition: 'top' }}
            height={200}
            component="img"
            image={goalImage}
          />
          <CardContent>
            <div style={{ marginBottom: 10 }}>
              <Typography variant="h5">Goals</Typography>
              <Divider flexItem variant="middle" />
            </div>
            <Typography>
              Work with your AI coach to set and track goals
            </Typography>
            <Button variant="contained" sx={{ marginTop: 3 }}>
              Set your first goal
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
