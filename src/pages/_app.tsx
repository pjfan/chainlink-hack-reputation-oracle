import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Web3ContextProvider } from '@/context/web3Context';
import { SearchContextProvider } from '@/hooks/useSearch';
import { StyledEngineProvider } from '@mui/material';
import { MoralisProvider } from 'react-moralis';

function MyApp({ Component, pageProps }: AppProps) {
  const MORALIS_SERVER_URL = process.env.MORALIS_SERVER_URL;
  const MORALIS_APP_ID = process.env.MORALIS_APP_ID;
  return (
    <>
      {MORALIS_APP_ID && MORALIS_SERVER_URL ? (
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
      ) : (
        <>requires Moralis connection</>
      )}
    </>
  );
}

export default MyApp;
