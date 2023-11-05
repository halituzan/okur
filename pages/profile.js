import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
/* Icons */
import { AiOutlineHome, AiOutlineInbox, AiOutlineSelect } from "react-icons/ai";
import { GiBookshelf, GiBookPile } from "react-icons/gi";
import {
  BsFillPersonLinesFill,
  BsJournalBookmarkFill,
  BsFillPeopleFill,
  BsUpload,
} from "react-icons/bs";

/* Components */
import Home from "../components/dashboard/Home";
import Notification from "../components/dashboard/Notification";
import BookCase from "../components/dashboard/BookCase";
import Books from "../components/dashboard/Books";
import ApprovelUser from "../components/dashboard/ApprovelUser/ApprovelUser";
import ApprovelBooks from "../components/dashboard/ApprovelBooks/ApprovelBooks";
import Users from "../components/dashboard/Users/Users";
import {
  ChangePassword,
  EditUser,
  GetMyInformation,
} from "../helpers/users.helpers";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { avatarList } from "../public/avatars/1x";
import { useDispatch } from "react-redux";
import { userInfoReducer } from "../store/slices/userSlice";
const Profile = () => {
  const dispatch = useDispatch();
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
  const [opened, { open, close }] = useDisclosure(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [editValue, setEditValue] = useState({
    name: "",
    surname: "",
  });
  const { name, surname } = editValue;
  const [myInfo, setMyInfo] = useState({});
  const [editPassword, setEditPassword] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordAgain: "",
  });
  const { oldPassword, newPassword, newPasswordAgain } = editPassword;
  const myInfoHandler = async () => {
    try {
      const res = await GetMyInformation();
      dispatch(userInfoReducer(res.data));
      setMyInfo(res.data);
    } catch (error) {}
  };
  const changePasswordHandler = async () => {
    if (!oldPassword || !newPassword || !newPasswordAgain) {


      toast.error("Lütfen tüm alanları doldurunuz.");
      return;
    } else if (newPassword !== newPasswordAgain) {
      toast.error("Yeni parolalar uyuşmuyor");
      return;
    }


    try {
      await ChangePassword(editPassword);
      setOpenEdit(false);
    } catch (error) {
      toast.error(error.response.data.Message);
    }

    setEditValue({
      name: "",
      surname: "",
    });
    setEditPassword({
      oldPassword: "",
      newPassword: "",
      newPasswordAgain: "",
    });
  };

  const editUser = async () => {
    try {
      const res = await EditUser({ ...editValue, avatar });
 
      setOpenEdit(false);
      localStorage.setItem("user", JSON.stringify(res.data));
      await myInfoHandler();
    } catch (error) {}
  };

  useEffect(() => {
    myInfoHandler();
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
                    className="flex items-center w-24 justify-center font-bold px-4 py-2 text-white border bg-gray-500/100 rounded-lg ml-2"
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
                      editUser();
                    }}
                    disabled={!surname || !name}
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
            <div className="info mt-2 w-full flex flex-col md:flex-row justify-start items-center">
              <div className="relative">
                <Image
                  src={
                    avatar
                      ? `/avatars/3x/${avatar}.png`
                      : myInfo?.avatar
                      ? `/avatars/3x/${myInfo?.avatar}.png`
                      : "/avatars/3x/1.png"
                  }
                  width={200}
                  height={200}
                  alt={`avatar ${avatar ? avatar : myInfo.avatar}`}
                />
                {openEdit && (
                  <>
                    <span
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 w-20 h-20 rounded-full flex justify-center items-center text-rose-600 cursor-pointer hover:shadow-xl"
                      onClick={open}
                    >
                      <AiOutlineSelect size={40} className="" />
                    </span>
                  </>
                )}
              </div>
              <div className="ml-5">
                <div className="my-4 flex w-full justify-start items-center">
                  <span className="w-full md:w-[200px] md:flex-0 flex-1 font-bold mr-2 after:content-[':']">
                    Ad
                  </span>
                  {openEdit ? (
                    <input
                      type="text"
                      className="block p-1 pl-3 flex-1 w-full text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-rose-500 focus:border-rose-500"
                      placeholder="Ad"
                      value={name}
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
                      value={surname}
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
          </div>
          {openEdit && (
            <div className="flex flex-col">
              <div className="border-b-2 border-gray-600 flex justify-between items-center py-2">
                <h2 className="text-black text-2xl py-2">Şifreyi Değiştir</h2>
                <button
                  onClick={() => {
                    changePasswordHandler();
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
      {/* Avatar Modal */}
      <Modal opened={opened} onClose={close}>
        <div className="flex justify-center flex-wrap items-start">
          {avatarList.map((item, index) => {
            return (
              <span
                key={index}
                className="m-2"
                onClick={() => setAvatar((index + 1).toString())}
              >
                <Image
                  src={item.default.src}
                  width={100}
                  height={100}
                  alt={`avatar ${index + 1}`}
                />
              </span>
            );
          })}
        </div>
      </Modal>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Profile;
