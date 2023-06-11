import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';
import { useEffect } from 'react';
import { Analytics, Notifications } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function Root() {
  const { user } = useAuthenticator();
  const { InAppMessaging } = Notifications;
  useEffect(() => {
    const setupMessaging = async () => {
      await InAppMessaging.identifyUser(user.getUsername(), {
        attributes: {
          group: user.getSignInUserSession()?.getAccessToken().payload[
            'cognito:groups'
          ],
        },
      });
      await Analytics.record({ name: 'Root-Loaded' });
    };
    setupMessaging();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
