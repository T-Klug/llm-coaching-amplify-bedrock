import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';
import { useEffect } from 'react';
import { Analytics } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function Root() {
  const { user } = useAuthenticator();
  useEffect(() => {
    Analytics.updateEndpoint({
      address: user.attributes?.email, // The unique identifier for the recipient. For example, an address could be a device token, email address, or mobile phone number.
      attributes: {
        group: user.getSignInUserSession()?.getAccessToken().payload[
          'cognito:groups'
        ],
      },
      optOut: 'NONE',
      // Customized userId
      userId: user.attributes?.email,
    });
  }, [user]);
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
