import React, { useEffect, useState } from "react";
// import { books } from "../fakeBookData.js";
import BookCaseTable from "./booktable/BookCaseTable.jsx";
import axios from "axios";
import Network from "../../helpers/Network.js";
import { toast } from "react-toastify";
export default function BookCase() {
  const [userBookList, setUserBookList] = useState([]);
  const [token, setToken] = useState(null);
 
  const removeBook = async (book) => {
    // HTTP - PUT request with (bookID,userID)
    console.log(book);
  };
  const mountData = async () => {
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      await Network.get("api/Book/GetMyBooks", {
        headers,
      })
        .then((res) => {
          if (res.success) {
            setUserBookList(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const addBook = async (bookValue) => {
    const { bookName, bookWriter } = bookValue;

    if (!bookName || !bookWriter) {
      toast.error("Kitap İsmi veya Yazar Adı Girmediniz.");
      return;
    }

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await Network.post(
        "api/Book",
        {
          name: bookName,
          author: bookWriter,
        },
        headers
      );
      if (response.success) {
        mountData();
      }
      toast.success("Kitap Başarılı Bir Şekilde Eklendi.");
    } catch (error) {
      toast.error("Kitap Eklenirken Bir Hata Oluştu.");
      console.log(error);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    mountData();
  }, []);
  useEffect(() => {
    mountData();
  }, [token]);

  return (
    <div className="p-4 dark:border-gray-700 mt-14">
      <BookCaseTable
        removeBook={removeBook}
        addBook={addBook}
        userBookList={userBookList}
      />
    </div>
  );
}
