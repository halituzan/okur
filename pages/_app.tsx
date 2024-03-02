import "@/styles/globals.css";
import "@/styles/default.css";
import type { AppProps } from "next/app";
import "flowbite";
import { Provider } from "react-redux";
import store from "@/store";
import Head from "next/head";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>OkurApp - okurapp.com</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
