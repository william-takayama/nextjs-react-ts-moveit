import '../styles/global.scss';

interface MyAppProps {
  Component: React.FunctionComponent;
  pageProps: object;
}

function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
