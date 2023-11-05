import React from "react";
import DashboardNavbar from "../dashboard/DashboardNavbar";

const Layout = ({ children }) => {
  return <DashboardNavbar>{children}</DashboardNavbar>;
};

export default Layout;
