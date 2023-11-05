import { createSlice } from "@reduxjs/toolkit";
import { AiOutlineHome, AiOutlinePullRequest } from "react-icons/ai";
import { GiBookPile, GiBookshelf } from "react-icons/gi";
import {
  BsFillPeopleFill,
  BsFillPersonLinesFill,
  BsJournalBookmarkFill,
} from "react-icons/bs";

const initialState = {
  notifications: [
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
  ],
  buttonList: [
    {
      icon: <AiOutlineHome />,
      title: "Anasayfa",
      name: "home",
      badge: false,
      isClicked: true,
      navigate: "/dashboard",
      userType: 1,
    },
    {
      icon: <GiBookPile />,
      title: "Kitaplar",
      name: "bookrequest",
      badge: false,
      isClicked: false,
      navigate: "/books",
      userType: 1,
    },
    {
      icon: <GiBookshelf />,
      title: "Kitaplığım",
      name: "bookcase",
      badge: false,
      isClicked: false,
      navigate: "/book-case",
      userType: 1,
    },
    {
      icon: <AiOutlinePullRequest />,
      title: "Talepler",
      name: "talepler",
      badge: false,
      isClicked: false,
      navigate: "/requests",
      userType: 1,
    },
  ],
  teacherButtonList: [
    {
      icon: <BsFillPersonLinesFill />,
      title: "Öğrenci Onayları",
      name: "approveluser",
      badge: false,
      isClicked: false,
      navigate: "/approve-user",
      userType: 0,
    },
    {
      icon: <BsJournalBookmarkFill />,
      title: "Kitap Onayları",
      name: "approvelbooks",
      badge: false,
      isClicked: false,
      navigate: "/approve-books",
      userType: 0,
    },
    {
      icon: <BsFillPeopleFill />,
      title: "Kullanıcılar",
      name: "users",
      badge: false,
      isClicked: false,
      navigate: "/users",
      userType: 0,
    },
  ],
};

const defaultSlice = createSlice({
  name: "defaults",
  initialState,
  reducers: {},
});

export const {} = defaultSlice.actions;

export default defaultSlice.reducer;
