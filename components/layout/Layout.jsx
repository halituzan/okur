import React from "react";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <DashboardNavbar>
      {children}

      <ToastContainer position='top-right' />
    </DashboardNavbar>
  );
};

export default Layout;
