import React from 'react';
import DarkModeWrapper from './components/DarkModeWrapper';
import SnackbarWrapper from './alerts/SnackbarWrapper';
import Layout from './Layout';

function App() {
  return (
    <DarkModeWrapper>
      <SnackbarWrapper>
        <Layout />
      </SnackbarWrapper>
    </DarkModeWrapper>
  );
}

export default App;
