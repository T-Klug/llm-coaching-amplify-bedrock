/* eslint-disable react-refresh/only-export-components */
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
import { withInAppMessaging } from '@aws-amplify/ui-react-notifications';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './layout/Root';
import Chat from './Pages/Chat';
import AdminPromptManager from './Pages/AdminPromptManager';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import LightLogo from './assets/logo-black-no-back.svg';
import DarkLogo from './assets/logo-no-back.svg';

//configure the amplify resources
Amplify.configure(awsExports);

I18n.putVocabulariesForLanguage('en', {
  Loading: 'QR code would show here',
  Code: '2FA Code',
  Confirm: 'Confirm 2FA',
  'Confirm TOTP Code': 'Confirm 2FA Code',
  'Back to Sign In': 'Back to Login',
});

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
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );
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
