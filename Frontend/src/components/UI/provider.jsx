'use client';
import React from 'react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
// import { ColorModeProvider } from './color-mode';

const Provider = (props) => {
    return (
        <ChakraProvider value={defaultSystem}>
            <div {...props} />
        </ChakraProvider>
    );
};

export default Provider;
