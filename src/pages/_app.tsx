import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Web3ContextProvider } from '@/context/web3Context';
import { SearchContextProvider } from '@/hooks/useSearch';
import { StyledEngineProvider } from '@mui/material';
import { MoralisProvider } from 'react-moralis';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function MyApp({ Component, pageProps }: AppProps) {
  const MORALIS_SERVER_URL = process.env.MORALIS_SERVER_URL;
  const MORALIS_APP_ID = process.env.MORALIS_APP_ID;

  const theme = createTheme({
    palette: {
      mode: 'dark',
      background: {default: '#371B58', paper: '#2E0249' },
      primary: { main: '#711A75', dark: '#371B58' },
    },
  });

  return (
    <>
      {MORALIS_APP_ID && MORALIS_SERVER_URL ? (
        <ThemeProvider theme={theme}>
          <StyledEngineProvider injectFirst>
            <Web3ContextProvider>
              <SearchContextProvider>
                <MoralisProvider
                  serverUrl={MORALIS_SERVER_URL}
                  appId={MORALIS_APP_ID}
                  initializeOnMount
                >
                  <Component {...pageProps} />
                </MoralisProvider>
              </SearchContextProvider>
            </Web3ContextProvider>
          </StyledEngineProvider>
        </ThemeProvider>
      ) : (
        <>requires Moralis connection</>
      )}
    </>
  );
}

export default MyApp;
