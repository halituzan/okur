import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [registerValues, setRegisterValues] = useState({
    schoolNumber: "",
    password: "",
    email: "",
    passwordConfirm: "",
    fullName: "",
  });
  const [passwordCheck, setPasswordCheck] = useState(true);
  const [isPassCorrect, setIsPassCorrect] = useState(true);
  const [PassFocus, setPassFocus] = useState(false);

  const registerHandler = (e) => {
    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value });
    const regexP =
      /^(?=.*[-\#\$\.\%\&\@\!\+\=\<\>\*])(?=.*[a-zA-Z])(?=.*\D).{8,12}$/;
    if (e.target.name === "password") {
      e.target.value.match(regexP)
        ? setPasswordCheck(true)
        : setPasswordCheck(false);
    } else if (e.target.name === "passwordConfirm") {
      e.target.value === registerValues.password
        ? setIsPassCorrect(true)
        : setIsPassCorrect(false);
    }
  };

  const registerSender = () => {
    const { schoolNumber, password, email, fullName, passwordConfirm } =
      registerValues;
    if (
      passwordCheck &&
      isPassCorrect &&
      password !== "" &&
      passwordConfirm !== ""
    ) {
      if (schoolNumber && password && email && fullName) {
        toast.success("Kayıt Başarılı");
        //fetch işlemi
      } else {
        toast.error("Lütfen tüm bilgileri doldurun");
      }
    } else {
      toast.error("Şifrenizi istenen şekilde Girin");
    }
  };
  const passFocus = () => {
    setPassFocus(true);
  };
  const passFocusOut = () => {
    setPassFocus(false);
  };
  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-rose-500 to-purple-700 i justify-around items-center hidden book-auth">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">OkurNET</h1>
          <hr/>
          <p className="text-white mt-1 text-xl">Kayıt Sayfası</p>
          
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
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form className="bg-white">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Kayıt Ol!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
            Aşağıdaki bilgileri eksiksiz doldurun.
          </p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name="fullName"
              placeholder="Ad Soyad"
              value={registerValues.fullName}
              onChange={(e) => registerHandler(e)}
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name="schollNumber"
              placeholder="Okul Numarası"
              value={registerValues.schoolNumber}
              onChange={(e) => registerHandler(e)}
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
              value={registerValues.email}
              onChange={(e) => registerHandler(e)}
            />
          </div>

          <div
            className={
              passwordCheck
                ? "flex items-center border-2 py-2 px-3 rounded-2xl mb-4 relative"
                : "flex items-center border-2 py-2 px-3 rounded-2xl mb-4 border-rose-500 relative"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="password"
              name="password"
              id="password"
              placeholder="Şifrenizi Girin"
              value={registerValues.password}
              onChange={(e) => registerHandler(e)}
              onFocus={() => passFocus()}
              onBlur={() => passFocusOut}
            />
            {/* <div className={PassFocus && registerValues.password === "" ? 'pass-check' : "hidden"}> Şifreniz 8-12 karakterden oluşmalı, en az 1'er büyük harf, küçük harf,rakam ve özel karakter içermelidir.</div> */}
          </div>

          <div
            className={
              isPassCorrect
                ? "flex items-center border-2 py-2 px-3 rounded-2xl"
                : "flex items-center border-2 py-2 px-3 rounded-2xl border-rose-500"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              type="password"
              name="passwordConfirm"
              placeholder="Şifrenizi Onaylayın"
              value={registerValues.passwordConfirm}
              onChange={(e) => registerHandler(e)}
            />
          </div>
          <button
            type="button"
            className="block w-full bg-rose-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            onClick={() => registerSender()}
          >
            Kayıt Ol
          </button>
          <div className="flex content-center">
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              Şifremi Unuttum ?
            </span>
            <button
              type="button"
              className="block w-full bg-emerald-500 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Giriş Sayfası
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
