import React from "react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex md:w-1/2 justify-center py-10 items-center">
      <form>
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Giriş Yap!</h1>

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
            className="pl-2 outline-none border-none bg-slate-100"
            type="text"
            name="email"
            placeholder="E-posta"
          />
        </div>

        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 relative">
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
            className="pl-2 outline-none border-none bg-slate-100"
            type="password"
            name="password"
            id="password"
            placeholder="Şifre"
          />
          {/* <div className={PassFocus && registerValues.password === "" ? 'pass-check' : "hidden"}> Şifreniz 8-12 karakterden oluşmalı, en az 1'er büyük harf, küçük harf,rakam ve özel karakter içermelidir.</div> */}
        </div>

        <button
          type="button"
          className="block w-full bg-rose-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
        >
          Giriş Yap
        </button>
        <button
          type="button"
          className="block w-full bg-rose-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
        >
          <Link href="/register">Kayıt Ol</Link>
        </button>
      </form>
    </div>
  );
}
