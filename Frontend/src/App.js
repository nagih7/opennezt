import React from 'react';
import { RootProvider } from './context/RootContext';
import { SignalProvider } from './context/SignalContext';
import { RouterProvider } from 'react-router-dom';
import router from './router/route';
import ChakraProvider from './components/UI/provider';
import { Toaster } from './components/UI/toaster';
import Mobile_Responsive from './components/common/Mobile_Responsive';

const isMobileDevice = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};

const App = () => {
  if (isMobileDevice()) {
    return <Mobile_Responsive />;
  }
  
  return (
    <ChakraProvider>
      <RootProvider>
        <SignalProvider>
          <RouterProvider router={router} />
          <Toaster />
        </SignalProvider>
      </RootProvider>
    </ChakraProvider>
  );
};

export default App;
