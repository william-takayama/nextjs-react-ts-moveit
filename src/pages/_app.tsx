import { ChallengesProvider } from '../contexts/ChallengesContext';
import '../styles/global.scss';

interface MyAppProps {
  Component: React.FunctionComponent;
  pageProps: object;
}

function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  );
}

export default MyApp;
