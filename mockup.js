import { AiOutlineHome, AiOutlineInbox } from "react-icons/ai";
import Notification from "./components/dashboard/Notification";
import { GiBookPile, GiBookshelf } from "react-icons/gi";
import Home from "./components/dashboard/Home";
import Books from "./components/dashboard/Books";
import BookCase from "./components/dashboard/BookCase";
import {
  BsFillPeopleFill,
  BsFillPersonLinesFill,
  BsJournalBookmarkFill,
} from "react-icons/bs";
import ApprovelUser from "./components/dashboard/ApprovelUser/ApprovelUser";
import ApprovelBooks from "./components/dashboard/ApprovelBooks/ApprovelBooks";
import Users from "./components/dashboard/Teachers/Users";

const mockup = {
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
      component: <Home />,
      userType: 1,
    },
    {
      icon: <AiOutlineInbox />,
      title: "Bildirimler",
      name: "notification",
      badge: true,
      isClicked: false,
      component: <Notification notifications={mockup.notifications} />,
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
  ],
  teacherButtonList: [
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
  ],
};

export default mockup;
