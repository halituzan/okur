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
import Network from "../helpers/Network";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [token, setToken] = useState(null);


  const mountData = async () => {
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      await Network.get("api/Book/GetAvailableBooks", {
        headers,
      })
        .then((res) => {
          if (res.success) {
            setBookData(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/login");
      setLoading(false);
    } else {
      setToken(localStorage.getItem("token"));
      mountData();
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    mountData();
  }, [token]);

  return !loading ? (
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

      <div className="p-4 sm:ml-64 h-screen">
        {buttonList.map((i) =>
          i.isClicked ? <div key={i.name}>{i.component}</div> : ""
        )}
      </div>
    </>
  );
}

// export async function getServerSideProps({ req }) {
//   const token = localStorage.getItem("token");

//   if (token === null) {
//     router.push("/login");
//     setLoading(false);
//   } else {
//     mountData();
//     setLoading(true);
//   }

//   try {
//     const decoded = verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
//     const userId = decoded.userId;
//     if (mongoose.connection.readyState === 0) {
//       mongoose
//         .connect(URI)
//         .then(() => console.log("MongoDB bağlantısı başarılı!"))
//         .catch((err) => console.error("MongoDB bağlantısı hatası:", err));
//     }

//     const user = await User.findOne({ _id: userId });
//     const support = await Support.findOne({ userId: user._id });

//     if (!user) {
//       return {
//         redirect: {
//           destination: "/login",
//           permanent: false,
//         },
//       };
//     }

//     if (!user.isActive) {
//       return {
//         redirect: {
//           destination: "/login",
//           permanent: false,
//         },
//       };
//     }

//     const expectedUserId = user._id.toString();

//     if (userId !== expectedUserId) {
//       return {
//         redirect: {
//           destination: "/login",
//           permanent: false,
//         },
//       };
//     }

//     return {
//       props: {
//         userData: JSON.parse(JSON.stringify(user)),
//         supportData: JSON.parse(JSON.stringify(support)),
//       },
//     };
//   } catch (err) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }
// }
