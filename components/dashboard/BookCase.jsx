import React, { useEffect, useState } from "react";
// import { books } from "../fakeBookData.js";
import BookCaseTable from "./booktable/BookCaseTable.jsx";
import axios from "axios";
export default function BookCase() {
  const [userData, setUserData] = useState(null);
  const [userBookList, setUserBookList] = useState([]);

  const fetchUserBook = async (id) => {
    const { data } = await axios(
      `https://${process.env.NEXT_PUBLIC_USERS_MOCK_API}.mockapi.io/users/${id}/userBooks/`
    );
    setUserBookList(data);
  };

  const removeBook = async (book) => {
    // HTTP - PUT request with (bookID,userID)
    console.log(book);
  };
  const addBook = async (bookValue, id) => {
    // HTTP - POST request with (bookID,userID)
    await axios.post(
      `https://${process.env.NEXT_PUBLIC_USERS_MOCK_API}.mockapi.io/users/${id}/userBooks/`,
      {
        bookID: bookValue.bookID,
        bookName: bookValue.bookName,
        bookWriter: bookValue.bookWriter,
        status: false,
      }
    );

    useEffect(() => {
      setUserData(localStorage.getItem("bookyId"));
    }, []);
    await axios.post(
      `https://${process.env.NEXT_PUBLIC_BOOKY_MOCK_API}.mockapi.io/bookApi/booky`,
      {
        bookID: bookValue.bookID,
        bookName: bookValue.bookName,
        bookWriter: bookValue.bookWriter,
        userId: id,
        status: false,
      }
    );
    await fetchUserBook(userData[0].id);
  };
  return (
    <div className="p-4 dark:border-gray-700 mt-14">
      <BookCaseTable
        userData={userData}
        removeBook={removeBook}
        addBook={addBook}
        fetchUserBook={fetchUserBook}
        userBookList={userBookList}
      />
    </div>
  );
}
