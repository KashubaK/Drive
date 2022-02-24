import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from './pages/Home';
import {MantineProvider, MantineThemeOverride} from '@mantine/core';
import {HomeEditor} from "./pages/HomeEditor";

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
          <Route path="/editor" element={<HomeEditor />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App
