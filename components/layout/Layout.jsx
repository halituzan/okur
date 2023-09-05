import React from "react";
import DashboardNavbar from "../dashboard/DashboardNavbar";

const Layout = ({
  buttonList,
  setButtonList,
  teacherButtonList,
  setTeacherButtonList,
}) => {
  return (
    <DashboardNavbar
      buttonList={buttonList}
      setButtonList={setButtonList}
      notifications={[
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
      ]}
      teacherButtonList={teacherButtonList}
      setTeacherButtonList={setTeacherButtonList}
    />
  );
};

export default Layout;
