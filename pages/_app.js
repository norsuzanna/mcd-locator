import "leaflet/dist/leaflet.css";
import "../styles/globals.css"; // if you have global styles
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>McDonald's Outlet Map</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
