import '@/styles/globals.css'
// import Navigation from '@/components/template/main'
// import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Navigation/> */}
        <Component {...pageProps} />
      {/* </SessionProvider>  */}
    </>
  );
}