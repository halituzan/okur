import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AiFillDelete,
  AiOutlineAppstoreAdd,
  AiFillBook,
  AiFillEdit,
} from "react-icons/ai";
import { toast } from "react-toastify";
import Modal from "../../Modal";

export default function BookCaseTable({ addBook, removeBook, userBookList }) {
  const [showModal, setShowModal] = React.useState(false);
  const [addBookValue, setAddBookValue] = useState({
    bookId: "",
    bookName: "",
    bookWriter: "",
  });

  const addBookHandler = (e) => {
    setAddBookValue({ ...addBookValue, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative overflow-x-auto flex flex-col">
      <button
        data-modal-target="addBookModal"
        data-modal-toggle="addBookModal"
        type="button"
        className=" w-auto px-3 bg-rose-500 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center self-end"
        onClick={() => setShowModal(true)}
      >
        <AiOutlineAppstoreAdd className="text-2xl mr-2" />
        Kitap Ekle
      </button>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-3">
              Kitap Adı
            </th>

            <th scope="col" className="px-2 py-3">
              Yazar
            </th>
            <th scope="col" className="px-2 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {userBookList?.map((book, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={index}
            >
              <th
                scope="row"
                className="px-2  font-medium text-gray-900  dark:text-white"
              >
                {book.name}
              </th>

              <td className="px-2">{book.author}</td>
              <td className="px-2 flex justify-end items-center pr-0">
                <button
                  type="button"
                  className=" px-3 bg-rose-500 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
                  onClick={() => removeBook(book)}
                >
                  <AiFillDelete /> Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Kitap Ekleme Modalı */}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        body={
          <div className="relative p-6 flex flex-col sm:flex-row">
            <div className="flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-3/5 w-full">
              <AiFillBook
                className={
                  addBookValue.bookName
                    ? "text-2xl fill-rose-600"
                    : "text-2xl"
                }
              />
              <input
                className="pl-2 outline-none border-none w-full"
                type="text"
                name="bookName"
                placeholder="Kitap Adı"
                value={addBookValue.bookName}
                onChange={(e) => addBookHandler(e)}
              />
            </div>
            <div className="flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-2/5 w-full">
              {/* Yazar İconu */}
              <AiFillEdit
                className={
                  addBookValue.bookWriter
                    ? "text-2xl fill-rose-600"
                    : "text-2xl"
                }
              />
              <input
                className="pl-2 outline-none border-none w-full"
                type="text"
                name="bookWriter"
                placeholder="Yazar Adı"
                value={addBookValue.bookWriter}
                onChange={(e) => addBookHandler(e)}
              />
            </div>
          </div>
        }
        footer={
          <div className="flex items-center justify-end ">
            <button
              className="text-rose-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(false)}
            >
              Kapat
            </button>
            <button
              className={
                addBookValue.bookWriter !== "" && addBookValue.bookName !== ""
                  ? "bg-rose-500 text-white active:bg-rose-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  : "bg-gray-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              }
              type="button"
              onClick={() => {
                if (
                  addBookValue.bookWriter === "" ||
                  addBookValue.bookName === ""
                ) {
                  toast.error("Lütfen Gerekli Bilgileri Doldurun");
                } else {
                  setShowModal(false);
                  addBook(addBookValue);
                }
              }}
              disabled={addBookValue.bookWriter === "" && addBookValue.bookName}
            >
              Kaydet
            </button>
          </div>
        }
      />
    </div>
  );
}
