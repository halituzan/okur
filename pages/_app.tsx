import '@/styles/globals.css'
import '@/styles/default.css'
import type { AppProps } from 'next/app'
import "flowbite"
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
