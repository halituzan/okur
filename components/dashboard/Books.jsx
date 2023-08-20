import React, { useState, useEffect } from "react";
import Pagination from "./booktable/Pagination";
import BooksTable from "./booktable/BooksTable";
import axios from "axios";
import { GetAvailableBooks } from "../../helpers/books.helpers";
export default function Books() {
  const [pagination, setPagination] = useState({
    totalPage: 0,
    currentPage: 0,
  });
  const [search, setSearch] = useState("");
  const [bookList, setBookList] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const [token, setToken] = useState(null);

  /* Functions */

  const mountData = async () => {
    if (token) {
      await GetAvailableBooks(setBookList, token);
    }
  };

  const fetchSearchData = async (word) => {};

  const handleKeyDown = (e) => {
    // if (e.key === "Enter") {
    //   fetchSearchData(search);
    // }
  };

  /* Hooks */
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      mountData();
    }
  }, []);
  useEffect(() => {
    mountData();
  }, [token]);

  const kitapIste = () => {};
  return (
    <div>
      <div>
        <div className="p-4 dark:border-gray-700 mt-14 flex justify-center border-b-2 items-center grid grid-cols-4">
          <div className="flex items-center border-2 px-3 ml-2 lg:col-span-3 col-span-5 mb-2">
            <input
              className="pl-2 outline-none border-none w-full"
              type="text"
              name="bookName"
              placeholder="Kitap adı veya yazar ile ara"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
          <div className="flex justify-center items-center ml-2 lg:col-span-1 col-span-5 mb-2">
            <button
              type="button"
              className="flex lg:w-autopx-3 w-full bg-rose-500 text-white text-l py-2 font-bold px-3 justify-center items-center"
              onClick={() => fetchSearchData(search)}
            >
              Kitap Ara
            </button>
          </div>
        </div>
        {pagination.totalPage > 0 ? (
          <div className="pagination mt-2 flex lg:justify-end justify-center">
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              bookList={bookList}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="book-list">
        {!bookList ? (
          ""
        ) : (
          <BooksTable bookList={bookList} listBookFunc={kitapIste} />
        )}
      </div>
    </div>
  );
}
