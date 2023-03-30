import React, { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineAppstoreAdd } from "react-icons/ai";

import { books } from "../fakeBookData.js";
import BookTable from "./booktable/BookTable.jsx";
export default function BookCase() {
  const [bookList, setBooks] = useState([]);

  useEffect(() => {
    setBooks(books);
    // HTTP - POST or Get request for user book with userID
  }, []);

  const addBook = async () => {
    // HTTP - POST request with (name,author,userID)
    console.log("addBook");
  };

  const removeBook = async (book) => {
    // HTTP - PUT request with (bookID,userID)
    console.log(book);
  };

  return (
    <div className="p-4 dark:border-gray-700 mt-14">
      <BookTable
        bookList={bookList}
        addBook={addBook}
        removeBook={removeBook}
      />
    </div>
  );
}
