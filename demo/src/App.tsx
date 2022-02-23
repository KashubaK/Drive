import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from './pages/Home';
import {MantineProvider, MantineThemeOverride} from '@mantine/core';

const theme: MantineThemeOverride = {
  fontSizes: {
    xl: 72,
    lg: 48,
    md: 24,
  }
}

function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App
