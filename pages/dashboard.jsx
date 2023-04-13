/* React and Next */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import "flowbite";
/* Icons */
import { AiOutlineHome, AiOutlineInbox } from "react-icons/ai";
import { GiBookshelf, GiBookPile } from "react-icons/gi";
/* Components */
import Home from "../components/dashboard/Home";
import Notification from "../components/dashboard/Notification";
import BookCase from "../components/dashboard/BookCase";
import Books from "../components/dashboard/Books";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import Redirection from "../components/Redirection";

export default function Dashboard() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([
    {
      userId: "1",
      bookID: "asdsad",
      bookName: "Dinozorlar Ülkesinde Çürümüş Bal Kabağı",
      bookWriter: "Halit Uzan",
      type: "delivery",
      typeStatus: true,
    },
    {
      userId: "1",
      bookID: "123124123",
      bookName: "Aşk",
      bookWriter: "Elif Şafak",
      type: "pickUp",
      typeStatus: true,
    },
    {
      userId: "1",
      bookID: "asdafasd",
      bookName: "Yarınsız Yarın",
      bookWriter: "Nazan Öncel",
      type: "pickUp",
      typeStatus: true,
    },
    {
      userId: "1",
      bookID: "12asd",
      bookName: "Kuyucaklı Yusuf",
      bookWriter: "Sabahattin Ali",
      type: "delivery",
      typeStatus: true,
    },
  ]);
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
      component: <Notification notifications={notifications} />,
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

  const [stroage, setStroage] = useState(false);

  useEffect(() => {
    // localStorage.getItem("bookyId") === null ? router.push("/login") : "";
    // localStorage.getItem("bookyId") === null
    //   ? setStroage(false)
    //   : setStroage(true);

    if (localStorage.getItem("bookyId") === null) {
      router.push("/login");
      setStroage(false);
    } else {
      setStroage(true);
    }
  }, []);

  return !stroage ? (
    <Redirection />
  ) : (
    <>
      <Head>
        <title>Kullanıcı Sayfası - booky.com.tr</title>
      </Head>
      <DashboardNavbar
        buttonList={buttonList}
        setButtonList={setButtonList}
        notifications={notifications}
      />

      <div className="p-4 sm:ml-64 ">
        {buttonList.map((i) =>
          i.isClicked ? <div key={i.name}>{i.component}</div> : ""
        )}
      </div>
    </>
  );
}
