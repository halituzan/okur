import Image from "next/image";
import React, { useState } from "react";
import "flowbite";
import { AiOutlineHome, AiOutlineInbox, AiOutlineLogout } from "react-icons/ai";
import { GiBookshelf, GiBookPile } from "react-icons/gi";
import Link from "next/link";
import Home from "../components/dashboard/Home";
import Notification from "../components/dashboard/Notification";
import BookCase from "../components/dashboard/BookCase";
import Head from "next/head";
import Books from "../components/dashboard/Books";

export default function Dashboard() {
  const [buttonList, setButtonList] = useState([
    {
      icon: <AiOutlineHome />,
      title: "Anasayfa",
      name: "home",
      badge: false,
      isClicked: true,
      component: <Home />,
    },
    {
      icon: <AiOutlineInbox />,
      title: "Bildirimler",
      name: "notification",
      badge: true,
      isClicked: false,
      component: <Notification />,
    },
    {
      icon: <GiBookPile />,
      title: "Kitaplar",
      name: "bookrequest",
      badge: false,
      isClicked: false,
      component: <Books />,
    },
    {
      icon: <GiBookshelf />,
      title: "Kitaplığım",
      name: "bookcase",
      badge: false,
      isClicked: false,
      component: <BookCase />,
    },
  ]);

  const sidebarHandler = (e, l, index) => {
    let newButtonList = [...buttonList];
    setButtonList(
      newButtonList.map((i) =>
        i.name === l.name
          ? { ...i, isClicked: true }
          : { ...i, isClicked: false }
      )
    );
  };

  return (
    <div>
      <Head>
        <title>Kullanıcı Sayfası - booky.com.tr</title>
      </Head>
      <nav className="fixed top-0 z-50 w-full bg-rose-500 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="#fff"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <Link href="/" className="flex ml-2 md:mr-24">
                {/* <Image src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" width={50} height={50}/> */}
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={50}
                    height={42}
                  />
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Üye Menüsü</span>
                    <Image
                      className="w-8 h-8 rounded-full"
                      width={50}
                      height={50}
                      src="/images/vesikalik.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      Halit Uzan
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      halituzan@gmail.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Profil
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Ayarlar
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Çıkış Yap
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {buttonList.map((l, index) =>
              l.badge ? (
                <li
                  className="aside-buttons"
                  key={index}
                  onClick={(e) => sidebarHandler(e, l, index)}
                >
                  <Link
                    href="#"
                    className={
                      l.isClicked
                        ? "flex items-center p-2 text-white bg-rose-500 rounded-lg dark:text-white hover:bg-rose-500 dark:hover:bg-gray-700"
                        : "flex items-center p-2 text-gray-900 rounded-lg hover:text-white   dark:text-white hover:bg-rose-500 dark:hover:bg-gray-700"
                    }
                  >
                    {l.icon}
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      {l.title}
                    </span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-white bg-green-500 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      3
                    </span>
                  </Link>
                </li>
              ) : (
                <li
                  className="aside-buttons"
                  key={l.name}
                  onClick={(e) => sidebarHandler(e, l, index)}
                >
                  <Link
                    href="#"
                    className={
                      l.isClicked
                        ? "flex items-center p-2 bg-rose-500 text-white rounded-lg dark:text-white hover:bg-rose-500 hover:text-white dark:hover:bg-gray-700"
                        : "flex items-center p-2 text-gray-900 rounded-lg hover:text-white dark:text-white hover:bg-rose-500 dark:hover:bg-gray-700"
                    }
                  >
                    {l.icon}
                    <span className="ml-3">{l.title}</span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        {buttonList.map((i) =>
          i.isClicked ? <div key={i.name}>{i.component}</div> : ""
        )}
      </div>
    </div>
  );
}
