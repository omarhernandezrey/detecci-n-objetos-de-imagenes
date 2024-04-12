import { useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "/model/browser/edge-impulse-standalone.js";
    script.async = true;
    script.onload = () => {
      console.log("Edge Impulse model loaded.");
      document.dispatchEvent(new CustomEvent('modelReady'));  // Emitir un evento cuando el modelo esté cargado
    };
    document.body.appendChild(script);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
