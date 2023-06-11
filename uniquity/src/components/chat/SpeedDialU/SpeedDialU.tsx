import { useAuthenticator } from '@aws-amplify/ui-react';
import {
  Menu,
  HistoryOutlined,
  ControlPoint,
  AdminPanelSettingsOutlined,
  LogoutOutlined,
} from '@mui/icons-material';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useNavigate } from 'react-router-dom';

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
  const newChat = () => setSelectedId(undefined);

  return (
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
        icon={<HistoryOutlined />}
        tooltipTitle="History"
        onClick={() => setOverlayVisible(true)}
      />
      <SpeedDialAction
        icon={<ControlPoint />}
        tooltipTitle="New Chat"
        onClick={() => newChat()}
      />
      {user
        .getSignInUserSession()
        ?.getAccessToken()
        .payload['cognito:groups'].includes('Admin') && (
        <SpeedDialAction
          icon={<AdminPanelSettingsOutlined />}
          tooltipTitle="Admin"
          onClick={() => navigate('/admin')}
        />
      )}
      <SpeedDialAction
        icon={<LogoutOutlined />}
        tooltipTitle="Sign Out"
        onClick={() => signOut()}
      />
    </SpeedDial>
  );
}
