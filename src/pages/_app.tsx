import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../styles/global.scss';

interface MyAppProps {
  Component: React.FunctionComponent;
  // pageComponentProps: PropsWithChildren<ServerSideProps>;
  pageComponentProps: Record<string, unknown>;
}

function MyApp({ Component, pageComponentProps }: MyAppProps): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    function handleRouteChange(url, { shalow }): void {
      console.log(
        `App is changing to ${url} ${
          shalow ? 'with' : 'without'
        } shallow routing `,
      );
    }

    router.events.on('routeChangeStart', handleRouteChange);

    return (): void => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageComponentProps} />;
}

export default MyApp;
