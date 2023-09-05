import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "flowbite";
export default function DashboardNavbar({
  buttonList,
  setButtonList,
  notifications,
  teacherButtonList,
  setTeacherButtonList,
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userInformation, setUserInformation] = useState(null);
  const router = useRouter();
  const dropdown = useRef();
  const sidebar = useRef();
  const logOut = () => {
    localStorage.clear("myInformation");
    if (localStorage.getItem("myInformation") === null) {
      router.back("/");
    }
  };

  const menuHandler = (l, type) => {
    let newButtonList = [...buttonList];
    let newTeacherButtonList = [...teacherButtonList];
    setButtonList(
      newButtonList.map((i) =>
        i.name === l.name
          ? { ...i, isClicked: true }
          : { ...i, isClicked: false }
      )
    );
    setTeacherButtonList(
      newTeacherButtonList.map((i) =>
        i.name === l.name
          ? { ...i, isClicked: true }
          : { ...i, isClicked: false }
      )
    );
    setShowMenu(true);
  };
  useEffect(() => {
    setUserInformation(JSON.parse(localStorage.getItem("myInformation")));
  }, []);
  useEffect(() => {
    console.log(userInformation);
  }, [userInformation]);

  const handleClickOutside = (event) => {
    if (dropdown.current && !dropdown.current.contains(event.target)) {
      setShowSettings(false);
    }
    if (sidebar.current && !sidebar.current.contains(event.target)) {
      setShowMenu(true);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-rose-500 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => {
                  showMenu ? setShowMenu(false) : setShowMenu(true);
                }}
              >
                <span className="sr-only">Kategoriler</span>
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
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={50}
                    height={42}
                    placeholder="blur"
                    blurDataURL={"/images/logo.svg"}
                    style={{ width: "50px", height: "42px" }}
                  />
                </span>
              </Link>
            </div>
            <div
              className="flex items-center"
              onClick={() => {
                showSettings ? setShowSettings(false) : setShowSettings(true);
              }}
            >
              <div className="flex items-center">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Üye Menüsü</span>
                    <p className="p-1.5 text-xl text-white ">
                      {userInformation?.name[0].toUpperCase() +
                        userInformation?.surname[0].toUpperCase()}
                    </p>
                  </button>
                </div>
                <div
                  ref={dropdown}
                  className={
                    showSettings
                      ? "z-50 pr-2 right-1.5 top-14 absolute text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                      : "z-50 pr-2 hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  }
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {(
                        userInformation?.name +
                        " " +
                        userInformation?.surname
                      ).toLocaleUpperCase()}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {userInformation?.email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Profil
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                        onClick={() => logOut()}
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
        ref={sidebar}
        className={
          showMenu
            ? "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            : "fixed top-0 left-64 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 sm:left-0 dark:bg-gray-800 dark:border-gray-700"
        }
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between">
          <ul className="space-y-2 font-medium">
            {buttonList.map((l, index) => {
              return l.badge && notifications.length > 0 ? (
                <li className="aside-buttons" key={index}>
                  <Link
                    href="/dashboard"
                    className={
                      l.isClicked
                        ? "flex items-center p-2 text-white bg-rose-500 rounded-lg dark:text-white hover:bg-rose-500 dark:hover:bg-gray-700"
                        : "flex items-center p-2 text-gray-900 rounded-lg hover:text-white dark:text-white hover:bg-rose-500 dark:hover:bg-gray-700"
                    }
                    onClick={(e) => {
                      menuHandler(l, "all");
                    }}
                  >
                    <span>{l.icon}</span>

                    <span className="flex-1 ml-3 whitespace-nowrap">
                      {l.title}
                    </span>
                    {notifications.length > 0 ? (
                      <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-white bg-green-500 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        {notifications.length}
                      </span>
                    ) : (
                      ""
                    )}
                  </Link>
                </li>
              ) : (
                <li className="aside-buttons" key={l.name}>
                  <Link
                    href="/dashboard"
                    className={
                      l.isClicked
                        ? "flex items-center p-2 bg-rose-500 text-white rounded-lg dark:text-white hover:bg-rose-500 hover:text-white dark:hover:bg-gray-700"
                        : "flex items-center p-2 text-gray-900 rounded-lg hover:text-white dark:text-white hover:bg-rose-500 dark:hover:bg-gray-700"
                    }
                    onClick={() => {
                      menuHandler(l, "all");
                    }}
                  >
                    {l.icon}
                    <span className="ml-3">{l.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          {userInformation?.userType === 0 && (
            <ul className="mb-10">
              <h3 className="ml-2 border-b-2">Öğretmen İşlemleri</h3>
              {teacherButtonList.map((l, index) => {
                return (
                  <li className="aside-buttons my-2" key={l.name}>
                    <Link
                      href="/dashboard"
                      className={
                        l.isClicked
                          ? "flex items-center p-2 bg-rose-500 text-white rounded-lg dark:text-white hover:bg-rose-500 hover:text-white dark:hover:bg-gray-700"
                          : "flex items-center p-2 text-gray-900 rounded-lg hover:text-white dark:text-white hover:bg-rose-500 dark:hover:bg-gray-700"
                      }
                      onClick={(e) => {
                        menuHandler(l, "teacher");
                      }}
                    >
                      {l.icon}
                      <span className="ml-3">{l.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
