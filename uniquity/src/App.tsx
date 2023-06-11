/* eslint-disable react-refresh/only-export-components */
import 'regenerator-runtime/runtime';
import { Amplify, I18n, Notifications } from 'aws-amplify';
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
import AdminPromptManager from './pages/AdminPromptManager';

//configure the amplify resources
Amplify.configure(awsExports);

// Change the Amplify Auth TOTP language
I18n.putVocabulariesForLanguage('en', {
  Loading: 'QR code would show here',
  Code: '2FA Code',
  Confirm: 'Confirm 2FA',
  'Confirm TOTP Code': 'Confirm 2FA Code',
  'Back to Sign In': 'Back to Login',
});

// Create the router - Root renders the children inside of it
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Chat />,
      },
      {
        path: 'admin',
        element: <AdminPromptManager />,
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
  };

  // Theme for Material UI
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
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
