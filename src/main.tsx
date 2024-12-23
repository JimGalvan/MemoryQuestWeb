import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Container, MantineProvider} from '@mantine/core';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider defaultColorScheme="dark">
            <QueryClientProvider client={queryClient}>
                <MantineProvider>
                    <Container>
                        <App/>
                    </Container>
                </MantineProvider>
            </QueryClientProvider>
        </MantineProvider>
    </StrictMode>,
)
