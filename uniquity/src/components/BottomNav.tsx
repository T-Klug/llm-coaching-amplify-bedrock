import { useAuthenticator } from '@aws-amplify/ui-react';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import {
  AdminPanelSettingsOutlined,
  ChatBubbleOutline,
  HomeOutlined,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const { user } = useAuthenticator();
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <BottomNavigation showLabels value={useLocation().pathname}>
        <BottomNavigationAction
          label={'Home'}
          icon={<HomeOutlined />}
          component={Link}
          to="/home"
          value="/home"
        />
        <BottomNavigationAction
          label="Chat"
          icon={<ChatBubbleOutline />}
          component={Link}
          value="/chat"
          to="/chat"
        />
        {user
          .getSignInUserSession()
          ?.getAccessToken()
          .payload['cognito:groups'].includes('Admin') && (
          <BottomNavigationAction
            component={Link}
            label="Admin"
            icon={<AdminPanelSettingsOutlined />}
            to="/admin"
            value="/admin"
          />
        )}
      </BottomNavigation>
    </AppBar>
  );
}
