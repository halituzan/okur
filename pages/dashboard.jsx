/* React and Next */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import "flowbite";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

/* Icons */
import { AiOutlineHome, AiOutlineInbox } from "react-icons/ai";
import { GiBookshelf, GiBookPile } from "react-icons/gi";
import {
  BsFillPersonLinesFill,
  BsJournalBookmarkFill,
  BsFillPeopleFill,
} from "react-icons/bs";

/* Components */
import Home from "../components/dashboard/Home";
import Notification from "../components/dashboard/Notification";
import BookCase from "../components/dashboard/BookCase";
import Books from "../components/dashboard/Books";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import Redirection from "../components/Redirection";
import ApprovelUser from "../components/dashboard/ApprovelUser/ApprovelUser";
import ApprovelBooks from "../components/dashboard/ApprovelBooks/ApprovelBooks";
import Users from "../components/dashboard/Users/Users";

/* Services Helpers */
import { GetAvailableBooks } from "../helpers/books.helpers";
import Layout from "../components/layout/Layout";

export default function Dashboard() {
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
      userType: 1,
    },
    {
      icon: <AiOutlineInbox />,
      title: "Bildirimler",
      name: "notification",
      badge: true,
      isClicked: false,
      component: <Notification notifications={notifications} />,
      userType: 1,
    },
    {
      icon: <GiBookPile />,
      title: "Kitaplar",
      name: "bookrequest",
      badge: false,
      isClicked: false,
      component: <Books />,
      userType: 1,
    },
    {
      icon: <GiBookshelf />,
      title: "Kitaplığım",
      name: "bookcase",
      badge: false,
      isClicked: false,
      component: <BookCase />,
      userType: 1,
    },
  ]);
  const [teacherButtonList, setTeacherButtonList] = useState([
    {
      icon: <BsFillPersonLinesFill />,
      title: "Öğrenci Onayları",
      name: "approveluser",
      badge: false,
      isClicked: false,
      component: <ApprovelUser />,
      userType: 0,
    },
    {
      icon: <BsJournalBookmarkFill />,
      title: "Kitap Onayları",
      name: "approvelbooks",
      badge: false,
      isClicked: false,
      component: <ApprovelBooks />,
      userType: 0,
    },
    {
      icon: <BsFillPeopleFill />,
      title: "Kullanıcılar",
      name: "users",
      badge: false,
      isClicked: false,
      component: <Users />,
      userType: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState([]);

  const mountData = async () => {
    setLoading(true);
    await GetAvailableBooks()
      .then((res) => {
        if (res.success) {
          setBookData(res.data.resultList);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    mountData();
  }, []);

  return loading ? (
    <Redirection />
  ) : (
    <>
      <Head>
        <title>Kullanıcı Sayfası - booky.com.tr</title>
      </Head>
      <Layout
        teacherButtonList={teacherButtonList}
        setTeacherButtonList={setTeacherButtonList}
        setButtonList={setButtonList}
        buttonList={buttonList}
      />

      <div className="p-4 sm:ml-64 h-screen">
        {buttonList.map(
          (i) => i.isClicked && <div key={i.name}>{i.component}</div>
        )}
        {teacherButtonList.map(
          (i) => i.isClicked && <div key={i.name}>{i.component}</div>
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}
