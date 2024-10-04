'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import store from '../features/store';
import { Provider } from 'react-redux';
import { theme } from '../theme';

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  );
}
