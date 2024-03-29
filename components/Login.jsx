import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Network from "@/helpers/Network";
import { LoginHandler } from "@/helpers/users.helpers";
export default function Login({ showPass, setShowPass }) {
  const router = useRouter();
  const [storage, setStorage] = useState(null);

  const [login, setLogin] = useState({
    password: "",
    studentId: "",
  });

  const { password, studentId } = login;

  useEffect(() => {
    setStorage(localStorage.getItem("bookyId"));
  }, []);

  useEffect(() => {
    if (storage !== null) {
      router.push("/dashboard");
      toast.success(`Giriş Başarılı`);
      // setLogin({
      //   ...login,
      //   password: JSON.parse(storage).password,
      //   studentId: JSON.parse(storage).studentId,
      // });
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
      const res = await LoginHandler({
        schoolNumber: studentId,
        password: password,
      });
      localStorage.setItem("token", res.token);
      await Network.get("/api/User/GetMyInformation").then((response) => {
        localStorage.setItem("myInformation", JSON.stringify(response.data));
      });
      toast.success("Giriş Başarılı");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(`Girilen bilgiler doğru değil, lütfen tekrar deneyin.`);
    }
  };

  return (
    <div className="flex justify-center py-10 items-center">
      <form className="w-full">
        {/* <h1 className="text-gray-800 font-bold text-2xl mb-1">Giriş Yap!</h1> */}

        {/* <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={!login.studentId ? "h-5 w-5 text-gray-400" : "h-5 w-5"}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <g id="surface1">
              <path d="M 17.429688 14.761719 C 17.371094 14.828125 17.332031 14.914062 17.332031 15 C 17.332031 15.085938 17.367188 15.171875 17.429688 15.238281 C 17.492188 15.296875 17.578125 15.332031 17.667969 15.332031 C 17.753906 15.332031 17.839844 15.296875 17.902344 15.238281 C 17.964844 15.171875 18 15.085938 18 15 C 18 14.914062 17.964844 14.828125 17.902344 14.761719 C 17.78125 14.644531 17.558594 14.640625 17.429688 14.761719 Z M 17.429688 14.761719 " />
              <path d="M 7.878906 14.089844 L 6.667969 13.46875 L 6.667969 13.339844 C 7.210938 13.042969 7.589844 12.554688 7.804688 11.882812 C 8.128906 11.714844 8.332031 11.378906 8.332031 11.007812 L 8.332031 10.671875 C 8.332031 10.363281 8.191406 10.078125 7.949219 9.890625 C 7.742188 8.628906 6.863281 7.992188 5.332031 7.992188 C 5.261719 7.992188 5.191406 7.992188 5.121094 8 C 4.71875 8.03125 4.332031 7.945312 4.046875 7.753906 C 3.910156 7.660156 3.808594 7.570312 3.742188 7.488281 C 3.59375 7.300781 3.285156 7.289062 3.128906 7.46875 C 3.050781 7.550781 3.015625 7.664062 3.03125 7.78125 C 3.042969 7.902344 3.0625 8.050781 3.097656 8.207031 C 3.160156 8.53125 3.160156 8.53125 3.070312 8.726562 C 3.035156 8.800781 2.992188 8.890625 2.945312 9.011719 C 2.835938 9.28125 2.757812 9.578125 2.710938 9.894531 C 2.476562 10.082031 2.332031 10.367188 2.332031 10.671875 L 2.332031 11.007812 C 2.332031 11.378906 2.539062 11.714844 2.863281 11.882812 C 3.074219 12.554688 3.457031 13.042969 4 13.339844 L 4 13.464844 L 2.742188 14.085938 C 2.285156 14.335938 2 14.8125 2 15.335938 L 2 15.777344 C 2 16.046875 2 16.671875 5.332031 16.671875 C 8.667969 16.671875 8.667969 16.046875 8.667969 15.777344 L 8.667969 15.363281 C 8.667969 14.820312 8.363281 14.332031 7.878906 14.089844 Z M 7.878906 14.089844 " />
              <path d="M 10.332031 9.671875 L 13.667969 9.671875 C 13.851562 9.671875 14 9.523438 14 9.339844 C 14 9.15625 13.851562 9.007812 13.667969 9.007812 L 10.332031 9.007812 C 10.148438 9.007812 10 9.15625 10 9.339844 C 10 9.523438 10.148438 9.671875 10.332031 9.671875 Z M 10.332031 9.671875 " />
              <path d="M 10.667969 14.671875 L 10.332031 14.671875 C 10.148438 14.671875 10 14.820312 10 15.007812 C 10 15.191406 10.148438 15.339844 10.332031 15.339844 L 10.667969 15.339844 C 10.851562 15.339844 11 15.191406 11 15.007812 C 11 14.820312 10.851562 14.671875 10.667969 14.671875 Z M 10.667969 14.671875 " />
              <path d="M 12.667969 14.671875 L 12 14.671875 C 11.816406 14.671875 11.667969 14.820312 11.667969 15.007812 C 11.667969 15.191406 11.816406 15.339844 12 15.339844 L 12.667969 15.339844 C 12.851562 15.339844 13 15.191406 13 15.007812 C 13 14.820312 12.851562 14.671875 12.667969 14.671875 Z M 12.667969 14.671875 " />
              <path d="M 14.332031 14.671875 L 14 14.671875 C 13.816406 14.671875 13.667969 14.820312 13.667969 15.007812 C 13.667969 15.191406 13.816406 15.339844 14 15.339844 L 14.332031 15.339844 C 14.519531 15.339844 14.667969 15.191406 14.667969 15.007812 C 14.667969 14.820312 14.519531 14.671875 14.332031 14.671875 Z M 14.332031 14.671875 " />
              <path d="M 16.332031 14.671875 L 15.667969 14.671875 C 15.480469 14.671875 15.332031 14.820312 15.332031 15.007812 C 15.332031 15.191406 15.480469 15.339844 15.667969 15.339844 L 16.332031 15.339844 C 16.519531 15.339844 16.667969 15.191406 16.667969 15.007812 C 16.667969 14.820312 16.519531 14.671875 16.332031 14.671875 Z M 16.332031 14.671875 " />
              <path d="M 17.667969 11.007812 L 10.332031 11.007812 C 10.148438 11.007812 10 11.15625 10 11.339844 C 10 11.523438 10.148438 11.671875 10.332031 11.671875 L 17.667969 11.671875 C 17.851562 11.671875 18 11.523438 18 11.339844 C 18 11.15625 17.851562 11.007812 17.667969 11.007812 Z M 17.667969 11.007812 " />
              <path d="M 17.667969 13.007812 L 10.332031 13.007812 C 10.148438 13.007812 10 13.15625 10 13.339844 C 10 13.523438 10.148438 13.671875 10.332031 13.671875 L 17.667969 13.671875 C 17.851562 13.671875 18 13.523438 18 13.339844 C 18 13.15625 17.851562 13.007812 17.667969 13.007812 Z M 17.667969 13.007812 " />
              <path d="M 18.441406 4.667969 L 12.332031 4.667969 L 12.332031 2.105469 C 12.332031 1.679688 11.988281 1.332031 11.5625 1.332031 L 8.4375 1.332031 C 8.011719 1.332031 7.667969 1.679688 7.667969 2.105469 L 7.667969 4.667969 L 1.558594 4.667969 C 0.699219 4.667969 0 5.367188 0 6.226562 L 0 17.109375 C 0 17.96875 0.699219 18.667969 1.558594 18.667969 L 18.441406 18.667969 C 19.300781 18.667969 20 17.96875 20 17.105469 L 20 6.226562 C 20 5.367188 19.300781 4.667969 18.441406 4.667969 Z M 10 2.332031 C 10.734375 2.332031 11.332031 2.929688 11.332031 3.667969 C 11.332031 4.402344 10.734375 5 10 5 C 9.265625 5 8.667969 4.402344 8.667969 3.667969 C 8.667969 2.929688 9.265625 2.332031 10 2.332031 Z M 19.332031 17.105469 C 19.332031 17.601562 18.933594 18 18.441406 18 L 1.558594 18 C 1.066406 18 0.667969 17.601562 0.667969 17.105469 L 0.667969 6.226562 C 0.667969 5.734375 1.066406 5.332031 1.558594 5.332031 L 7.667969 5.332031 L 7.667969 6.5625 C 7.667969 6.988281 8.011719 7.332031 8.4375 7.332031 L 11.5625 7.332031 C 11.988281 7.332031 12.332031 6.988281 12.332031 6.5625 L 12.332031 5.332031 L 18.441406 5.332031 C 18.933594 5.332031 19.332031 5.734375 19.332031 6.226562 Z M 19.332031 17.105469 " />
            </g>
          </svg>
          <input
            className="pl-2 outline-none border-none "
            type="text"
            name="studentId"
            placeholder="Öğrenci Numarası"
            value={login.studentId}
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
              className={!login.password ? "h-5 w-5 text-gray-400" : "h-5 w-5"}
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
            className="pl-2 outline-none border-none "
            type={showPass ? "password" : "text"}
            name="password"
            id="password"
            placeholder="Şifre"
            value={login.password}
            onChange={(e) => loginHandler(e)}
          />
          <div
            id="show-password"
            onClick={() => setShowPass(showPass ? false : true)}
          >
            {showPass ? (
              <AiFillEye className="h-5 w-5 text-gray-400" />
            ) : (
              <AiFillEyeInvisible className="h-5 w-5" />
            )}
          </div>
        </div> */}

        {/* <button
          type="button"
          className="block w-full bg-rose-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          onClick={() => loginSender()}
        >
          Giriş Yap
        </button> */}
        <button
          type="button"
          className="block w-full bg-rose-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
        >
          <Link href="/login">Giriş Yap</Link>
        </button>
        <button
          type="button"
          className="block w-full bg-rose-500 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
        >
          <Link href="/register">Kayıt Ol</Link>
        </button>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
