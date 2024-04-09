import logo from './logo.svg';
import './App.css';
import Router from './routes';
import ThemeProvider from './theme';
import MotionLazyContainer from './components/animate/MotionLazyContainer';

function App() {
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        
      </ThemeProvider>
    </MotionLazyContainer>
  );
}

export default App;
