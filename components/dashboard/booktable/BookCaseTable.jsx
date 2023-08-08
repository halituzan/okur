import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AiFillDelete,
  AiOutlineAppstoreAdd,
  AiFillBook,
  AiFillEdit,
} from "react-icons/ai";

export default function BookCaseTable({
  userData,
  addBook,
  removeBook,
  fetchUserBook,
  userBookList,
}) {
  const [showModal, setShowModal] = React.useState(false);
  const [addBookValue, setAddBookValue] = useState({
    bookName: "",
    bookWriter: "",
  });

  useEffect(() => {
    if (userData?.id) {
      fetchUserBook(userData.id);
    }
  }, [userData]);

  const addBookHandler = (e) => {
    setAddBookValue({ ...addBookValue, [e.target.name]: e.target.value });
  };
  // const userBooks = userData;

  return (
    <div className="relative overflow-x-auto flex flex-col">
      <button
        data-modal-target="addBookModal"
        data-modal-toggle="addBookModal"
        type="button"
        className="block w-auto px-3 bg-rose-500 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center self-end"
        onClick={() => setShowModal(true)}
      >
        <AiOutlineAppstoreAdd className="text-2xl mr-2" />
        Kitap Ekle
      </button>
      <div className="modals">
        {showModal ? (
          <>
            <div className="justify-start items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-3/4 my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Kitap Ekle</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex flex-col sm:flex-row">
                    <div className="flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-3/5 w-full">
                      <AiFillBook className="text-2xl" />
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
                      <AiFillEdit className="text-2xl" />
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
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-rose-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Kapat
                    </button>
                    <button
                      className="bg-rose-500 text-white active:bg-rose-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        addBook(addBookValue, userData[0]?.id);
                      }}
                    >
                      Kaydet
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
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
          {userBookList
            ?.filter((i) => i.status === true)
            .map((book, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={index}
              >
                <th
                  scope="row"
                  className="px-2  font-medium text-gray-900  dark:text-white"
                >
                  {book.bookName}
                </th>

                <td className="px-2">{book.bookWriter}</td>
                <td className="px-2 flex justify-end items-center pr-0">
                  <button
                    type="button"
                    className="block px-3 bg-rose-500 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
                    onClick={() => removeBook(book)}
                  >
                    <AiFillDelete /> Sil
                  </button>
                </td>
              </tr>
            ))}
          {userBookList.length > 0 ? (
            <tr className="border-b border-t border-rose-500">
              <td>Onay aşamasında olanlar &#x21E3;</td>
            </tr>
          ) : (
            ""
          )}
          {userBookList
            ?.filter((i) => i.status === false)
            .map((booky, index) => {
              return (
                <tr
                  className="bg-slate-100	 border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-2  font-medium text-gray-900  dark:text-white"
                  >
                    {booky.bookName}
                  </th>

                  <td className="px-2">{booky.bookWriter}</td>
                  <td className="px-2 flex justify-end items-center pr-0">
                    <button
                      type="button"
                      className="block px-3 bg-rose-500 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
                      onClick={() => removeBook(booky)}
                    >
                      <AiFillDelete /> Sil
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
