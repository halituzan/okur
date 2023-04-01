import React, { useEffect, useState } from "react";
// import { books } from "../fakeBookData.js";
import BookCaseTable from "./booktable/BookCaseTable.jsx";
import axios from "axios";
export default function BookCase() {
  const [userData, setUserData] = useState([]);

  const fetchUserBook = async (id) => {
    const { data } = await axios(
      `https://${process.env.NEXT_PUBLIC_USERS_MOCK_API}.mockapi.io/users/1/userBooks`
    );
    setUserData(data);
  };
  useEffect(() => {
    fetchUserBook();
  }, []);
  console.log(`https://${process.env.NEXT_PUBLIC_USERS_MOCK_API}.mockapi.io/users/1/userBooks/`)
  const removeBook = async (book) => {
    // HTTP - PUT request with (bookID,userID)
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
    await fetchUserBook(id);
    
  };

  return (
    <div className="p-4 dark:border-gray-700 mt-14">
      <BookCaseTable
        userData={userData}
        removeBook={removeBook}
        addBook={addBook}
      />
    </div>
  );
}
