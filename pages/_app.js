import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "../src/styles/globals.css";

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      options={{
        // Stale Time controls how often the useSession in the client should
        // contact the server to sync the session state. Value in seconds.
        // e.g.
        // * 0  - Disabled (always use cache value)
        // * 60 - Sync session state with server if it's older than 60 seconds
        staleTime: 0,
        // Refetch Interval tells windows / tabs that are signed in to keep sending
        // a keep alive request (which extends the current session expiry) to
        // prevent sessions in open windows from expiring. Value in seconds.
        //
        // Note: If a session has expired when keep alive is triggered, all open
        // windows / tabs will be updated to reflect the user is signed out.
        refetchInterval: 0,
      }}
      session={pageProps.session}
    >
      <Component {...pageProps} />
    </SessionProvider>
  </>
);

export default App;
