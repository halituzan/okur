import React, { useEffect, useState } from "react";
import {
  GetAvailableBooks,
  GetBookRequests,
} from "../../helpers/books.helpers";
import BooksTable from "./booktable/BooksTable";
import RequestBookTable from "./RequestedList/RequestBookTable";

const Talepler = () => {
  const [requestsBookList, setRequestsBookList] = useState([]);
  const [activeTab, setActiveTab] = useState(1); // 1 ise Talep Ettiklerim, 2 ise Talep edilenler, 3 ise okunanlar
  const myInformation = JSON.parse(localStorage.getItem("myInformation"));
  const requestsBooksHandler = async () => {
    await GetBookRequests()
      .then((res) => {
        setRequestsBookList(res.data);
      })
      .catch((err) => console.log(err));
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
                item.ownerId !== myInformation.userId && item.reqStatus !== 5
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
              return item.ownerId === myInformation.userId;
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
            bookList={requestsBookList.filter((item) => {
              return item.reqStatus === 5;
            })}
            listBookFunc={() => {}}
          />
        )}
      </div>
    </div>
  );
};

export default Talepler;
