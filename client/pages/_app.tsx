import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { BrandingProvider } from '../context/BrandingContext'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    posthog.capture('$pageview');
  }, []);

  return (
    <BrandingProvider>
      <Component {...pageProps} />
    </BrandingProvider>
  )
}

export default MyApp
