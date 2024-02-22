import React, { useEffect, useState } from "react";
import {
  GetAvailableBooks,
  GetBookRequests,
  GetBooksIRead,
} from "../../helpers/books.helpers";
import BooksTable from "./booktable/BooksTable";
import RequestBookTable from "./RequestedList/RequestBookTable";
import { useSelector } from "react-redux";

const Talepler = () => {
  const [requestsBookList, setRequestsBookList] = useState([]);
  const [booksIRead, setBooksIRead] = useState([]);
  const [activeTab, setActiveTab] = useState(1); // 1 ise Talep Ettiklerim, 2 ise Talep edilenler, 3 ise okunanlar
  const myInformation = useSelector((state) => state.users.userInformation);
  const requestsBooksHandler = async () => {
    try {
      const response = await GetBookRequests();
      setRequestsBookList(response);
      const res = await GetBooksIRead();
      setBooksIRead(res.data);
    } catch (error) {}
  };

  /* Hooks */
  useEffect(() => {
    requestsBooksHandler();
  }, []);
  return (
    <div className="p-4 dark:border-gray-700 mt-14">
      <div className="flex mb-2">
        <button
          className={`p-1 border-b-2  ${
            activeTab === 1 ? "border-pink-600" : "border-transparent"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Talep Edilenler
        </button>
        <button
          className={`p-1 border-b-2  ${
            activeTab === 2 ? "border-pink-600" : "border-transparent"
          }`}
          onClick={() => setActiveTab(2)}
        >
          Talep Ettiklerim
        </button>
        <button
          className={`p-1 border-b-2  ${
            activeTab === 3 ? "border-pink-600" : "border-transparent"
          }`}
          onClick={() => setActiveTab(3)}
        >
          Okunan Kitaplar
        </button>
      </div>
      <div className="book-list">
        {requestsBookList && activeTab === 2 ? (
          <RequestBookTable
            tableHead={[
              { id: 1, name: "Kitap Adı" },
              { id: 2, name: "Yazar" },
              { id: 3, name: null },
            ]}
            bookList={requestsBookList.filter((item) => {
              return (
                item.ownerId !== myInformation?.userId && item.reqStatus !== 5
              );
            })}
            listBookFunc={() => {}}
          />
        ) : requestsBookList && activeTab === 1 ? (
          <RequestBookTable
            tableHead={[
              { id: 1, name: "Kitap Adı" },
              { id: 2, name: "Yazar" },
              { id: 3, name: null },
            ]}
            bookList={requestsBookList.filter((item) => {
              return item.ownerId === myInformation?.userId;
            })}
            listBookFunc={() => {}}
          />
        ) : (
          <RequestBookTable
            tableHead={[
              { id: 1, name: "Kitap Adı" },
              { id: 2, name: "Yazar" },
              { id: 3, name: null },
            ]}
            bookList={booksIRead}
            listBookFunc={() => {}}
          />
        )}
      </div>
    </div>
  );
};

export default Talepler;
