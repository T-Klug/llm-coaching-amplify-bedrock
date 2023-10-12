/* eslint-disable react-refresh/only-export-components */
import 'regenerator-runtime/runtime';
import { Amplify, Analytics, I18n, Notifications } from 'aws-amplify';
import awsExports from '../aws-exports';

// Material UI Font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Amplify Auth Styles
import '@aws-amplify/ui-react/styles.css';
import {
  Authenticator,
  defaultDarkModeOverride,
  ThemeProvider as AmplifyThemeProvider,
  useTheme,
  View,
  Image,
  Theme,
  defaultTheme,
  Text,
  Link,
} from '@aws-amplify/ui-react';
// Amplify and Pinpoint Messaging
import { withInAppMessaging } from '@aws-amplify/ui-react-notifications';
// React Router
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// Root Render - Outlet is here
import Root from './layout/Root';
// Recommended CSS BASELINE provided by material ui
import CssBaseline from '@mui/material/CssBaseline';
// Hook to check for Dark mode
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useMemo } from 'react';
// Material UI's theme provider
import LightLogo from './assets/logo-black-no-back.svg';
import DarkLogo from './assets/logo-no-back.svg';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Chat from './pages/Chat';
import Landing from './pages/Landing';
import UserProfile from './pages/UserProfilePage';
import IceBreakerChatPage from './pages/IceBreakerChatPage';
import DocumentContext from './pages/DocumentContext';
import RolePlayChat from './pages/RoleplayChatPage';

//configure the amplify resources
Amplify.configure(awsExports);

// Setup autoTrack
Analytics.autoTrack('session', {
  enable: true,
  immediate: true,
  provider: 'AWSPinpoint',
});

Analytics.autoTrack('pageView', {
  enable: true,
  type: 'SPA',
  immediate: true,
  provider: 'AWSPinpoint',
});

Analytics.autoTrack('event', {
  enable: true,
  immediate: true,
  provider: 'AWSPinpoint',
});

// Change the Amplify Auth TOTP language
I18n.putVocabulariesForLanguage('en', {
  Loading: 'QR code would show here',
  Code: '2FA Code',
  Confirm: 'Confirm 2FA',
  'Confirm TOTP Code': 'Confirm 2FA Code',
  'Back to Sign In': 'Back to Login',
  'Setup TOTP': 'Setup 2FA',
});

// Create the router - Root renders the children inside of it
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'profile',
        element: <UserProfile />,
      },
      {
        path: 'roleplay/:roleplayId',
        element: <RolePlayChat />,
      },
      {
        path: 'roleplay',
        element: <RolePlayChat />,
      },
      {
        path: 'chat/:chatId',
        element: <Chat />,
      },
      {
        path: 'chat',
        element: <Chat />,
      },
      {
        path: 'icebreaker/:icebreakerId',
        element: <IceBreakerChatPage />,
      },
      {
        path: 'icebreaker',
        element: <IceBreakerChatPage />,
      },
      {
        path: 'documents',
        element: <DocumentContext />,
      },
    ],
  },
]);

function App() {
  const { InAppMessaging } = Notifications;
  useEffect(() => {
    // sync remote in-app messages
    InAppMessaging.syncMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Customization of Auth Header
  const components = {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image
            alt="Uniquity Logo"
            src={prefersDarkMode ? DarkLogo : LightLogo}
          />
        </View>
      );
    },
    Footer() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]}>
            Copyright © 2023 Uniquity - All Rights Reserved
            <br />
            <Link href="https://uniquity.ai/privacy">
              Privacy Policy
            </Link> -{' '}
            <Link href="https://uniquity.ai/tos">Terms of Service</Link>
          </Text>
        </View>
      );
    },
  };

  // Theme for Material UI
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#1b5e20',
          },
        },
      }),
    [prefersDarkMode],
  );

  // Amplify Theme
  const amplifyTheme: Theme = {
    name: 'my-theme',
    overrides: [defaultDarkModeOverride],
    tokens: {
      colors: {
        brand: {
          primary: defaultTheme.tokens.colors.green,
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AmplifyThemeProvider
        theme={amplifyTheme}
        colorMode={prefersDarkMode ? 'dark' : 'light'}
      >
        <Authenticator hideSignUp={true} components={components}>
          <RouterProvider router={router} />
        </Authenticator>
      </AmplifyThemeProvider>
    </ThemeProvider>
  );
}

export default withInAppMessaging(App);
