import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
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
import ApprovelUser from "../components/dashboard/ApprovelUser/ApprovelUser";
import ApprovelBooks from "../components/dashboard/ApprovelBooks/ApprovelBooks";
import Users from "../components/dashboard/Users/Users";
const Profile = () => {
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

  const [openEdit, setOpenEdit] = useState(false);
  const [editValue, setEditValue] = useState({
    name: "",
    surname: "",
  });
  const [myInfo, setMyInfo] = useState({});
  const [editPassword, setEditPassword] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordAgain: "",
  });
  useEffect(() => {
    const myInfo = JSON.parse(localStorage.getItem("myInformation"));
    setMyInfo(myInfo);
  }, []);

  return (
    <div>
      <Layout
        teacherButtonList={teacherButtonList}
        setTeacherButtonList={setTeacherButtonList}
        setButtonList={setButtonList}
        buttonList={buttonList}
      />
      <div className="p-4 sm:ml-64 h-screen">
        <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 ">
          <div className="flex flex-col">
            <div className="border-b-2 border-gray-600 flex justify-between items-center py-2">
              <h2 className="text-black text-2xl py-2">Kullanıcı Bilgileri</h2>
              {openEdit ? (
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setEditValue({
                        name: "",
                        surname: "",
                      });
                      setEditPassword({
                        oldPassword: "",
                        newPassword: "",
                        newPasswordAgain: "",
                      });
                      setOpenEdit(false);
                    }}
                    className="flex items-center w-24 justify-center font-bold px-4 py-2 text-whit border bg-gray-500/100 rounded-lg ml-2"
                  >
                    İptal
                  </button>
                  <button
                    onClick={() => {
                      setEditValue({
                        name: "",
                        surname: "",
                      });
                      setEditPassword({
                        oldPassword: "",
                        newPassword: "",
                        newPasswordAgain: "",
                      });
                      setOpenEdit(false);
                    }}
                    className="flex items-center w-24 justify-center font-bold px-4 py-2 text-white text-sm bg-rose-500 rounded-lg ml-2"
                  >
                    Kaydet
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditValue({
                      name: myInfo.name,
                      surname: myInfo.surname,
                    });
                    setOpenEdit(true);
                  }}
                  className="flex items-center w-24 justify-center font-bold px-4 py-2 text-white text-sm bg-rose-500 rounded-lg ml-2"
                >
                  Düzenle
                </button>
              )}
            </div>
            <div className="info mt-2 w-full lg:w-1/2">
              <div className="my-4 flex w-full justify-start items-center">
                <span className="w-full md:w-[200px] md:flex-0 flex-1 font-bold mr-2 after:content-[':']">
                  Ad
                </span>
                {openEdit ? (
                  <input
                    type="text"
                    className="block p-1 pl-3 flex-1 w-full text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="Ad"
                    value={editValue.name}
                    onChange={(e) => {
                      setEditValue({ ...editValue, name: e.target.value });
                    }}
                  />
                ) : (
                  <span className="flex-1 w-full">{myInfo.name}</span>
                )}
              </div>
              <div className="my-4 flex w-full justify-start items-center">
                <span className="w-full md:w-[200px] md:flex-0 flex-1 font-bold mr-2 after:content-[':']">
                  Soyad
                </span>
                {openEdit ? (
                  <input
                    type="text"
                    className="block p-1 pl-3 flex-1 w-full text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="Soyad"
                    value={editValue.surname}
                    onChange={(e) => {
                      setEditValue({ ...editValue, surname: e.target.value });
                    }}
                  />
                ) : (
                  <span className="flex-1 w-full">{myInfo.surname}</span>
                )}
              </div>
              <div className="my-4 flex w-full justify-start items-center">
                <span className="w-full md:w-[200px] md:flex-0 flex-1 font-bold mr-2 after:content-[':']">
                  Email
                </span>
                <span className="flex-1 w-full">{myInfo.email}</span>
              </div>
              <div className="my-4 flex w-full justify-start items-center">
                <span className="w-full md:w-[200px] md:flex-0 flex-1 font-bold mr-2 after:content-[':']">
                  Öğrenci No
                </span>
                <span className="flex-1 w-full">{myInfo.schoolNumber}</span>
              </div>
              <div className="my-4 flex w-full justify-start items-center">
                <span className="w-full md:w-[200px] md:flex-0 flex-1 font-bold mr-2 after:content-[':']">
                  Kullanıcı Tipi
                </span>
                <span className="flex-1 w-full">
                  {myInfo.userType === 0 ? "Öğretmen" : "Öğrenci"}
                </span>
              </div>
            </div>
          </div>
          {openEdit && (
            <div className="flex flex-col">
              <div className="border-b-2 border-gray-600 flex justify-between items-center py-2">
                <h2 className="text-black text-2xl py-2">Şifreyi Değiştir</h2>
                <button
                  onClick={() => {
                    setEditValue({
                      name: "",
                      surname: "",
                    });
                    setEditPassword({
                      oldPassword: "",
                      newPassword: "",
                      newPasswordAgain: "",
                    });
                    setOpenEdit(false);
                  }}
                  className="flex items-center w-24 justify-center font-bold px-4 py-2 text-white text-sm bg-rose-500 rounded-lg ml-2"
                >
                  Kaydet
                </button>
              </div>
              <div className="flex flex-col md:flex-row justify-between mt-4">
                <div className="w-full md:w-1/3 flex flex-col mx-2">
                  <label className="mb-2 font-bold" htmlFor="oldPassword">
                    Güncel Şifreniz
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    className="block p-1 pl-3 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="***********"
                    value={editPassword.oldPassword}
                    onChange={(e) => {
                      setEditPassword({
                        ...editPassword,
                        oldPassword: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="w-full md:w-1/3 flex flex-col mx-2">
                  <label className="mb-2 font-bold" htmlFor="newPassword">
                    Yeni Şifreniz
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    className="block p-1 pl-3 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="***********"
                    value={editPassword.newPassword}
                    onChange={(e) => {
                      setEditPassword({
                        ...editPassword,
                        newPassword: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="w-full md:w-1/3 flex flex-col mx-2">
                  <label className="mb-2 font-bold" htmlFor="newPasswordAgain">
                    Yeni Şifrenizi Tekrarlayın
                  </label>
                  <input
                    type="password"
                    id="newPasswordAgain"
                    className="block p-1 pl-3 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="***********"
                    value={editPassword.newPasswordAgain}
                    onChange={(e) => {
                      setEditPassword({
                        ...editPassword,
                        newPasswordAgain: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;