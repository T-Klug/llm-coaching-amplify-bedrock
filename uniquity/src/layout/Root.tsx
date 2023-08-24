import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect } from 'react';
import { Analytics, Notifications } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import LogoLight from '../assets/logo-black-no-back.svg';
import LogoDark from '../assets/logo-no-back.svg';
import { SpeedDialU } from '../components/layout/SpeedDialU/SpeedDialU';
import Typography from '@mui/material/Typography';

export default function Root() {
  const { user } = useAuthenticator();
  const { InAppMessaging } = Notifications;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
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
      // This function creates anonymous visitor IDs in Pendo unless you change the visitor id field to use your app's values
      // This function uses the placeholder 'ACCOUNT-UNIQUE-ID' value for account ID unless you change the account id field to use your app's values
      // Call this function in your authentication promise handler or callback when your visitor and account id values are available
      // Please use Strings, Numbers, or Bools for value types.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      pendo.initialize({
        visitor: {
          id: user.username, // Required if user is logged in, default creates anonymous ID
          email: user.attributes?.email, // Recommended if using Pendo Feedback, or NPS Email
          // full_name:    // Recommended if using Pendo Feedback
          role: user.getSignInUserSession()?.getAccessToken().payload[
            'cognito:groups'
          ], // Optional

          // You can add any additional visitor level key-values here,
          // as long as it's not one of the above reserved names.
        },

        account: {
          id: window.location.hostname, // Required if using Pendo Feedback, default uses the value 'ACCOUNT-UNIQUE-ID'
          // name:         // Optional
          // is_paying:    // Recommended if using Pendo Feedback
          // monthly_value:// Recommended if using Pendo Feedback
          // planLevel:    // Optional
          // planPrice:    // Optional
          // creationDate: // Optional

          // You can add any additional account level key-values here,
          // as long as it's not one of the above reserved names.
        },
      });
    };
    setupMessaging();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <SpeedDialU />
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignContent: 'center',
          textAlign: 'center',
          alignItems: 'center',
          marginTop: 40,
        }}
      >
        <img
          style={{ maxWidth: 300 }}
          src={prefersDarkMode ? LogoDark : LogoLight}
        />
        <Typography variant="h6">
          Unlock your full potential at work with our AI coach
        </Typography>
      </div>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Outlet />
    </Container>
  );
}
