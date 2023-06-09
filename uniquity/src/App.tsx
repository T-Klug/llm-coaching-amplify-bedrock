import { Amplify } from 'aws-amplify';
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
} from '@aws-amplify/ui-react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './layout/Root';
import Chat from './Pages/Chat';
import AdminPromptManager from './Pages/AdminPromptManager';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import Logo from './assets/logo-black-no-back.svg';

//configure the amplify resources
Amplify.configure(awsExports);

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
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundImage: `url(${Logo})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'contain',
                backgroundAttachment: 'fixed',
                backgroundOpacity: '10%',
                height: '100%',
              },
            },
          },
        },
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );
  const amplifyTheme = {
    name: 'my-theme',
    overrides: [defaultDarkModeOverride],
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AmplifyThemeProvider
        theme={amplifyTheme}
        colorMode={prefersDarkMode ? 'dark' : 'light'}
      >
        <Authenticator hideSignUp={true}>
          <RouterProvider router={router} />
        </Authenticator>
      </AmplifyThemeProvider>
    </ThemeProvider>
  );
}

export default App;
