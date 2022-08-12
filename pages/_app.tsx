import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ContextProvider } from "../components/ContextProvider";
import { useRouter } from "next/router";
import { useUserContext } from "../components/ContextProvider";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const user = useUserContext();
  useEffect(()=>{
    console.log("USER")
    console.log(user);
   
    //router.replace('/userPanel');

  }, [user])

  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
