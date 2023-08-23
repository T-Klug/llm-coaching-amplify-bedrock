import Typography from '@mui/material/Typography';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import {
  Looks3Outlined,
  Looks4Outlined,
  Looks5Outlined,
  LooksOneOutlined,
  LooksTwoOutlined,
} from '@mui/icons-material';
import { styled } from '@mui/material';
import Divider from '@mui/material/Divider';

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

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export default function Landing() {
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
        <div>
          <Typography>Your Coaching Streak</Typography>
          <Divider flexItem variant="middle" />
        </div>
        <Typography>
          Talk to your coach every week to unlock your full potential at work.
        </Typography>
        <StyledRating
          IconContainerComponent={IconContainer}
          size="large"
          readOnly
          value={3}
        />
      </div>
    </>
  );
}
