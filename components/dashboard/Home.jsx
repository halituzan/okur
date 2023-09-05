import React, { useEffect, useState } from "react";
import "flowbite";
import { GetAvailableBooks } from "../../helpers/books.helpers";
import Modal from "../Modal";
import Countdown from "../countdown/Countdown";
export default function Home() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [bookList, setBookList] = useState([]);

  const mountData = async () => {
    await GetAvailableBooks().then((res) => {
      setBookList(res.data.resultList);
    });
  };

  useEffect(() => {
    mountData();
  }, []);

  return (
    <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
      <div className="grid grid-cols-4 gap-4 mb-4 ">
        <div className="flex flex-col col-span-1 items-center justify-center text-center h-48 rounded bg-gray-50 dark:bg-gray-800">
          <span className="mb-2">Kitabın Teslim Tarihi</span>
          <p className="text-2xl text-black  dark:text-gray-500">
            {/* <Countdown /> */}
          </p>
        </div>
        <div className="flex flex-col col-span-1 items-center justify-center text-center h-48 rounded bg-gray-50 dark:bg-gray-800">
          <span className="mb-2">Kitabın Alım Tarihi</span>
          <p className="text-2xl text-gray-400 dark:text-gray-500">
            {/* <Countdown /> */}
          </p>
        </div>
        <div className="flex items-center col-span-2 justify-center h-48 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">
            Okuduğu son 5 kitap
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start mb-4 rounded bg-gray-50 dark:bg-gray-800 divide-y-2">
        <h3 className="p-4 text-2xl">Son Listelenen Kitaplar</h3>
        {bookList?.map((book, index) => {
          return (
            <div
              className="w-full p-2 flex justify-between items-center hover:bg-gray-100 "
              key={"book" + index}
            >
              <span className="flex-1">{book.name}</span>
              <span className="flex-1">{book.author}</span>
              <button
                className="flex items-center p-2 text-white bg-rose-500 rounded-lg ml-2"
                onClick={() => setShowRequestModal(true)}
              >
                Talep Et
              </button>
            </div>
          );
        })}
      </div>

      <Modal
        setShowModal={setShowRequestModal}
        showModal={showRequestModal}
        body={<div>body</div>}
        footer={<div>footer</div>}
      />
    </div>
  );
}
