import React, { useState, useEffect } from "react";
import Pagination from "./booktable/Pagination";
import BooksTable from "./booktable/BooksTable";
import axios from "axios";
export default function Books() {
  const [pagination, setPagination] = useState({
    totalPage: 10,
    currentPage: 0,
  });
  const [bookList, setBooks] = useState([]);
  const fetchApi = async () => {
    const { data } = await axios(
      `https://${
        process.env.NEXT_PUBLIC_BOOKY_MOCK_API
      }.mockapi.io/bookApi/booky?page=${pagination.currentPage + 1}&limit=10`
    );

    setBooks(data);
  };

  const fetchAllData = async () => {
    const { data } = await axios(
      `https://${process.env.NEXT_PUBLIC_BOOKY_MOCK_API}.mockapi.io/bookApi/booky`
    );

    setPagination({ ...pagination, totalPage: Math.ceil(data.length / 10) });
    console.log(data.length);
  };
  useEffect(() => {
    fetchApi();

    // HTTP - Get request for all Book
  }, [pagination.currentPage]);
  useEffect(() => {
    fetchAllData();

    // HTTP - Get request for all Book
  }, []);
  console.log(pagination);
  const kitapIste = () => {};
  return (
    <div>
      <div>
        <div className="p-4 dark:border-gray-700 mt-14 flex justify-center border-b-2 items-center grid grid-cols-5">
          <div className="flex items-center border-2 px-3 ml-2 lg:col-span-2 col-span-5 mb-2">
            <input
              className="pl-2 outline-none border-none w-full"
              type="text"
              name="bookName"
              placeholder="Kitap Adı"
            />
          </div>
          <div className="flex items-center border-2 px-3 ml-2 lg:col-span-2 col-span-5 mb-2">
            <input
              className="pl-2 outline-none border-none w-full"
              type="text"
              name="writer"
              placeholder="Yazar"
            />
          </div>
          <div className="flex justify-center items-center ml-2 lg:col-span-1 col-span-5 mb-2">
            <button
              type="button"
              className="flex lg:w-autopx-3 w-full bg-rose-500 text-white text-l py-2 font-bold px-3 flex justify-center items-center"
            >
              Kitap Ara
            </button>
          </div>
        </div>
        <div className="pagination mt-2 flex lg:justify-end justify-center">
          <Pagination
            pagination={pagination}
            setPagination={setPagination}
            bookList={bookList}
          />
        </div>
      </div>

      <div className="book-list">
        <BooksTable bookList={bookList} listBookFunc={kitapIste} />
      </div>
    </div>
  );
}
