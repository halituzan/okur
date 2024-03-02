import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'sweetalert2/dist/sweetalert2.min.css';
import HomePage from "../components/home/HomePage";

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
    } else {
      router.push(`/login`);
    }
  };
  useEffect(() => {
    redirectDashboard();
  }, [stroage]);

  return (
    <>
      <Head>
        <title>Anasayfa - okurapp.com</title>
      </Head>

      <HomePage />
    </>
  );
}
