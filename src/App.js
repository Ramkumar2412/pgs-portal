// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import { ToastBar, Toaster, toast } from 'react-hot-toast';
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>  <Toaster
          toastOptions={{
            success: {
              style: {
                border: `2px solid rgb(75,181,67) `,
                paddingTop: '2px',
                paddingBottom: '2px',
                height: '3.5rem',
                color: 'black',
                width: 'auto',
                maxWidth: '100%',
                backgroundColor: 'rgb(255,255,255)',
              },
              iconTheme: {
                primary: '#4BB543',
                secondary: 'white',
              },
            },
            error: {
              style: {
                paddingTop: '2px',
                paddingBottom: '2px',
                height: '3.5rem',
                border: '2px solid rgb(255,51,51)',
                backgroundColor: 'rgb(255,255,255)',
                color: 'black',
                width: ' auto',
                maxWidth: '100%',
              },
            },
          }}
        >
          {(t) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <Stack
                  flexDirection="row"
                  sx={{
                    width: '100%',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <Stack flexDirection="row">
                    {icon}
                    {message}
                  </Stack>
                </Stack>
              )}
            </ToastBar>
          )}
        </Toaster>
          <ProgressBarStyle />
          <ScrollToTop />
          <Router />
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
