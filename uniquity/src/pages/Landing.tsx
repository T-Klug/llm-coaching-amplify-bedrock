import Typography from '@mui/material/Typography';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Looks3Outlined,
  Looks4Outlined,
  Looks5Outlined,
  LooksOneOutlined,
  LooksTwoOutlined,
} from '@mui/icons-material';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import MobileStepper from '@mui/material/MobileStepper';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    label: 'Get to know each other',
    description: `Meet your new Coach, and answer some questions about yourself.`,
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
];

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export default function Landing() {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;
  const navigate = useNavigate();
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
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
              <Typography variant="h6" sx={{ width: '100%', marginTop: 10 }}>
                {steps[activeStep].label}
              </Typography>

              <Box sx={{ marginBottom: 10, width: '100%', p: 2 }}>
                {steps[activeStep].description}
              </Box>
              <MobileStepper
                variant="dots"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                  >
                    Next
                    <KeyboardArrowRight />
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    <KeyboardArrowLeft />
                    Back
                  </Button>
                }
              />
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
            <Button
              variant="contained"
              sx={{ marginTop: 3 }}
              onClick={() => navigate('/chat')}
            >
              Chat with your coach now
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
