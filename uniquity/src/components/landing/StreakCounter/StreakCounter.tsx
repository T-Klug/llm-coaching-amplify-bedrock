import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import celebrateImage from '../../../assets/celebrate.jpg';
import LooksOneOutlined from '@mui/icons-material/LooksOneOutlined';
import LooksTwoOutlined from '@mui/icons-material/LooksTwoOutlined';
import Looks3Outlined from '@mui/icons-material/Looks3Outlined';
import Looks4Outlined from '@mui/icons-material/Looks4Outlined';
import Looks5Outlined from '@mui/icons-material/Looks5Outlined';

import { forwardRef } from 'react';

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

const StreakCounter = forwardRef<HTMLDivElement | null>(
  function StreakCounter(_props, ref) {
    return (
      <Card ref={ref} raised sx={{ borderRadius: 6, width: '85%' }}>
        <CardMedia
          sx={{ objectPosition: '20% 80%' }}
          height={200}
          component="img"
          image={celebrateImage}
          alt="Celebrate Image"
        />
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
            value={1}
          />
        </CardContent>
      </Card>
    );
  },
);

export default StreakCounter;
