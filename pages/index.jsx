import HomePage from "../components/home/HomePage";
import Head from "next/head";
import Redirection from "../components/Redirection";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const router = useRouter();
  const [stroage, setStroage] = useState(null);

  useEffect(() => {
    setStroage(localStorage.getItem("bookyId"));
  }, []);

  const redirectDashboard = () => {
    if (stroage !== null) {
      router.push(`/dashboard`);
      toast.success("Yönlendiriliyorsunuz.");
    } else{
      router.push(`/login`);
    }
  };
  useEffect(() => {
    redirectDashboard();
  }, [stroage]);

  return (
    <>
      <Head>
        <title>Anasayfa - booky.com.tr</title>
      </Head>
      <HomePage />
      <ToastContainer position="bottom-right" />
    </>
  );
}
