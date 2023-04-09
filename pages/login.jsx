import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Image from "next/image";
import Head from "next/head";

export default function login() {
  const router = useRouter();
  const [stroage, setStroage] = useState(null);
  const [showPass, setShowPass] = useState(true);
  const [login, setLogin] = useState({
    password: "",
    email: "",
  });

  useEffect(() => {
    setStroage(localStorage.getItem("bookyId"));
  }, []);

  useEffect(() => {
    if (stroage !== null) {
      router.push("/dashboard");
      toast.success(`Giriş Başarılı`);
    }
  }, [stroage]);

  const loginHandler = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
  const showPassword = () => {
    setShowPass(showPass ? false : true);
  };

  return (
    <div className="h-screen md:flex">
      <Head>
        <title>Booky Üye Giriş Sayfası - booky.com.tr</title>
      </Head>

      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-rose-500 to-purple-700 i justify-around items-center hidden book-auth">
        <div className="w-1/2">
          <Link href="/" className="flex justify-center">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={200}
              height={30}
              style={{ width: "auto", height: "auto" }}
            />
            <h1 className="text-white font-bold text-4xl ml-2 font-sans"></h1>
          </Link>

          <p className="text-white mt-1 text-xl">Giriş Sayfası</p>

          {/* <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Anasayfa</button> */}
          <p className="text-white">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <p className="text-white">
            Lorem Ipsum has been the industry standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book.
          </p>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
      </div>
      <div className="flex flex-col md:w-1/2 justify-center py-10 items-center bg-white">
        <div className="worm">
          {showPass ? (
            <Image
              src="/images/worm.svg"
              alt="Worm"
              width={300}
              height={300}
              placeholder="blur"
              blurDataURL={"/images/worm.svg"}
            />
          ) : (
            <Image
              src={"/images/worm1.svg"}
              alt="Worm"
              width={300}
              height={300}
              placeholder="blur"
              blurDataURL={"/images/worm1.svg"}
            />
          )}
        </div>
        <form className="bg-white">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Giriş Yap!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
            Aşağıdaki bilgileri eksiksiz doldurun.
          </p>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={!login.email ? "h-5 w-5 text-gray-400" : "h-5 w-5"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name="email"
              placeholder="E-posta"
              value={login.email}
              onChange={(e) => loginHandler(e)}
            />
          </div>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 relative">
            {!showPass ? (
              <svg
                version="1.1"
                id="katman_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <g>
                  <path
                    fill="none"
                    d="M12.1,6.9H13C13,5.3,11.6,4,10,4C8.3,4,7,5.3,7,7v2h6V8.9h-0.9V6.9z"
                  />
                  <path
                    d="M15,9V8.9h-2V9H7V7c0-1.7,1.3-3,3-3c1.6,0,3,1.3,3,2.9h2C15,4.2,12.7,2,10,2C7.2,2,5,4.2,5,7v2c-1.1,0-2,0.9-2,2v5
      c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2v-5C17,9.9,16.1,9,15,9z M11.5,16.2l-0.9-1.3c-0.2-0.3-0.4-0.7-0.6-1h0c-0.2,0.3-0.4,0.7-0.6,1
      l-0.8,1.3H7.3l2.1-3l-2-2.8h1.2l0.8,1.2c0.2,0.3,0.4,0.6,0.6,0.9h0c0.2-0.3,0.4-0.6,0.6-1l0.8-1.2h1.1l-2,2.8l2,3H11.5z"
                  />
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={
                  !login.password ? "h-5 w-5 text-gray-400" : "h-5 w-5"
                }
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}

            <input
              className="pl-2 outline-none border-none"
              type={showPass ? "password" : "text"}
              name="password"
              id="password"
              placeholder="Şifrenizi Girin"
              value={login.password}
              onChange={(e) => loginHandler(e)}
            />
            <div id="show-password" onClick={() => showPassword()}>
              {showPass ? (
                <AiFillEye className="h-5 w-5 text-gray-400" />
              ) : (
                <AiFillEyeInvisible className="h-5 w-5" />
              )}
            </div>
          </div>

          <button
            type="button"
            className="block w-full bg-rose-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Giriş Yap
          </button>
          <div className="flex content-center">
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              Şifremi Unuttum ?
            </span>
            <Link
              href="/register"
              className="block w-full bg-emerald-500 py-2 rounded-2xl text-white font-semibold mb-2 flex justify-center items-center"
            >
              Kayıt Ol
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
