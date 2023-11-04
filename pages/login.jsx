import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Image from "next/image";
import Head from "next/head";
import { GetMyInformation, LoginHandler } from "../helpers/users.helpers";
import svgData from "../svgData";
import { useDispatch } from "react-redux";
import { userInfoReducer } from "../store/slices/userSlice";
export default function login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [storage, setStorage] = useState(null);
  const [showPass, setShowPass] = useState(true);
  const [login, setLogin] = useState({
    password: "",
    schoolNumber: "",
  });
  const { password, schoolNumber } = login;

  useEffect(() => {
    setStorage(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (storage !== null) {
      router.push("/dashboard");
      toast.success(`Giriş Başarılı`);
    }
  }, [storage]);

  const loginHandler = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const loginSender = async () => {
    try {
      const res = await LoginHandler(login);
      toast.success("Giriş Başarılı");
      if (!res.token) {
        return;
      }

      localStorage.setItem("token", res.token);
      await GetMyInformation().then((response) => {
        dispatch(userInfoReducer(response.data));
        localStorage.setItem("myInformation", JSON.stringify(response.data));
      });

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(`Girilen bilgiler doğru değil, lütfen tekrar deneyin.`);
    }
  };

  const showPassword = () => {
    setShowPass(showPass ? false : true);
  };
  const { studentIdIcon, lockIcon, unLockIcon } = svgData;
  return (
    <div className="h-screen md:flex">
      <Head>
        <title>Booky Üye Giriş Sayfası - booky.com.tr</title>
      </Head>

      <div className="home-provider relative overflow-hidden md:flex w-1/2  from-rose-500 to-purple-700 i justify-around items-center hidden book-auth">
        <div className="w-1/2">
          <div className="flex justify-center">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={200}
              height={170}
              placeholder="blur"
              blurDataURL={"/images/logo.svg"}
            />
            <h1 className="text-white font-bold text-4xl ml-2 font-sans"></h1>
          </div>

          {/* <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Anasayfa</button> */}
          <p className="text-white mb-2">
            Eğlenceli ve ilgi çekici kitap maceramıza hoş geldin. Şimdi giriş
            yap ve kitaplarla dolu bu büyülü dünyaya geri dön.
          </p>
          <p className="text-white">
            Arkadaşlarınla bağlantı kur, yeni kitaplar keşfet ve kendi
            hikayelerini oluştur. Hadi, okuma tutkusunu yeniden canlandıralım!
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
            {studentIdIcon(!schoolNumber)}

            <input
              className="pl-2 outline-none border-none"
              type="text"
              name="schoolNumber"
              placeholder="Öğrenci Numarası"
              value={schoolNumber}
              onChange={(e) => loginHandler(e)}
            />
          </div>

          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 relative">
            {!showPass ? lockIcon() : unLockIcon(!password)}

            <input
              className="pl-2 outline-none border-none"
              type={showPass ? "password" : "text"}
              name="password"
              id="password"
              placeholder="Şifrenizi Girin"
              value={password}
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
            onClick={() => loginSender()}
          >
            Giriş Yap
          </button>
          <div className="flex content-center">
            {/* <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              Şifremi Unuttum ?
            </span> */}
            <Link
              href="/register"
              className="w-full bg-emerald-500 py-2 rounded-2xl text-white font-semibold mb-2 flex justify-center items-center"
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
