import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';
import { useEffect } from 'react';
import { Analytics, Notifications } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function Root() {
  const { user } = useAuthenticator();
  const { InAppMessaging } = Notifications;

  // Setup the identify User for in app messaging at root and send a root loaded event to analytics
  useEffect(() => {
    const setupMessaging = async () => {
      // Update the endpoint to accept email
      Analytics.updateEndpoint({
        address: user.attributes?.email,
        channelType: 'EMAIL',
        optOut: 'NONE',
        userId: user.username,
        userAttributes: {
          username: [user.username],
        },
      });
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
