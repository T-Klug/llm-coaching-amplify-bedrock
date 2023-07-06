import { useAuthenticator } from '@aws-amplify/ui-react';
import {
  Menu,
  HistoryOutlined,
  ControlPoint,
  AdminPanelSettingsOutlined,
  LogoutOutlined,
  Feedback,
} from '@mui/icons-material';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useNavigate } from 'react-router-dom';
import AlertDialogSlide from '../AlertDialogSlideIn/AlertDialogSlideIn';
import { useState } from 'react';
import { DataStore } from 'aws-amplify';

type SpeedDialUType = {
  setOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>;
};
export function SpeedDialU(props: SpeedDialUType) {
  const { setOverlayVisible, setSelectedId } = props;
  // Auth Context
  const { user, signOut } = useAuthenticator();
  // Navigation Context
  const navigate = useNavigate();
  // New Chat Method
  const newChat = () => {
    setSelectedId(undefined);
  };
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
          icon={<Feedback />}
          tooltipTitle="Feedback"
          onClick={() => setFeedbackOpen(true)}
        />
        <SpeedDialAction
          icon={<ControlPoint />}
          tooltipTitle="New Chat"
          onClick={() => newChat()}
        />
        <SpeedDialAction
          icon={<HistoryOutlined />}
          tooltipTitle="History"
          onClick={() => setOverlayVisible(true)}
        />
        {user
          .getSignInUserSession()
          ?.getAccessToken()
          .payload['cognito:groups']?.includes('Admin') && (
          <SpeedDialAction
            icon={<AdminPanelSettingsOutlined />}
            tooltipTitle="Admin"
            onClick={() => navigate('/admin')}
          />
        )}
        <SpeedDialAction
          icon={<LogoutOutlined />}
          tooltipTitle="Sign Out"
          onClick={async () => {
            signOut();
            await DataStore.clear();
          }}
        />
      </SpeedDial>
    </>
  );
}
