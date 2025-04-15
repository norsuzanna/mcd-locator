import "leaflet/dist/leaflet.css";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>McDonald&apos;s Outlet Map</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
