import { useAuthenticator } from '@aws-amplify/ui-react';
import Menu from '@mui/icons-material/Menu';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import FeedbackOutlined from '@mui/icons-material/FeedbackOutlined';
import SourceOutlined from '@mui/icons-material/SourceOutlined';
import TransferWithinAStationOutlined from '@mui/icons-material/TransferWithinAStationOutlined';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useNavigate } from 'react-router-dom';
import AlertDialogSlide from '../AlertDialogSlideIn/AlertDialogSlideIn';
import { useState } from 'react';
import { DataStore } from 'aws-amplify';

export function SpeedDialU() {
  // Auth Context
  const { signOut } = useAuthenticator();
  // Navigation Context
  const navigate = useNavigate();
  // Feedback form dialog
  const [feedbackOpen, setFeedbackOpen] = useState<boolean>(false);

  return (
    <>
      <AlertDialogSlide open={feedbackOpen} setOpen={setFeedbackOpen} />
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{
          position: 'fixed',
          top: 5,
          right: 16,
        }}
        icon={<Menu />}
        direction="down"
        FabProps={{
          sx: {
            bgcolor: 'darkgray',
            '&:hover': {
              bgcolor: 'darkgray',
            },
          },
        }}
      >
        <SpeedDialAction
          icon={<HomeOutlined />}
          tooltipTitle="Home"
          onClick={() => navigate('/')}
        />
        <SpeedDialAction
          icon={<PersonOutlineOutlined />}
          tooltipTitle="Profile"
          onClick={() => navigate('/profile')}
        />
        <SpeedDialAction
          icon={<ChatBubbleOutline />}
          tooltipTitle="Quick coaching"
          onClick={() => navigate('/chat')}
        />
        <SpeedDialAction
          icon={<TransferWithinAStationOutlined />}
          tooltipTitle="Role play"
          onClick={() => navigate('/roleplay')}
        />
        <SpeedDialAction
          icon={<SourceOutlined />}
          tooltipTitle="Context documents"
          onClick={() => navigate('/documents')}
        />
        <SpeedDialAction
          icon={<FeedbackOutlined />}
          tooltipTitle="Feedback"
          onClick={() => setFeedbackOpen(true)}
        />
        <SpeedDialAction
          icon={<LogoutOutlined />}
          tooltipTitle="Sign out"
          onClick={async () => {
            signOut();
            await DataStore.clear();
          }}
        />
      </SpeedDial>
    </>
  );
}
