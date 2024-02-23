/* React and Next */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import "flowbite";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

/* Components */
import Home from "../components/dashboard/Home";
import Redirection from "../components/Redirection";

/* Services Helpers */
import { GetAvailableBooks } from "../helpers/books.helpers";
import Layout from "../components/layout/Layout";
import { useDispatch } from "react-redux";
import { myBookListReducer } from "../store/slices/bookSlice";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Kullanıcı Sayfası - booky.com.tr</title>
      </Head>
      <Layout>
        <Home />
      </Layout>

      <ToastContainer position="bottom-right" />
    </>
  );
}
