'use client'

import { Provider } from "react-redux";
import { store } from "@/library/redux/store";
import "../app/globals.css";
import { AppProps } from "next/app";
import useAuthListener from "@/library/Hooks/useAuthListener";
function MyApp({ Component, pageProps }:AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
    }
export default MyApp;
