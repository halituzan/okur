import React, { useState } from "react";
import { AiFillDelete, AiFillBook, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import Modal from "../../Modal";

export default function BookCaseTable({
  addBook,
  removeBook,
  userBookList,
  showModal,
  setShowModal,
  tableHead,
}) {
  const [addBookValue, setAddBookValue] = useState({
    bookId: "",
    name: "",
    author: "",
  });
  const [currentBook, setCurrentBook] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const addBookHandler = (e) => {
    setAddBookValue({ ...addBookValue, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative overflow-x-auto flex flex-col">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tableHead.map((i) => {
              return (
                <th scope="col" key={i.id} className="px-2 py-3">
                  {i.name}
                </th>
              );
            })}
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
                  onClick={() => {
                    console.log("first");
                    setCurrentBook(book);
                    setOpenDeleteModal(true);
                  }}
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
        title="Kitap Ekleme"
        body={
          <div className="relative p-6 flex flex-col sm:flex-row">
            <div className="flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-3/5 w-full">
              <AiFillBook
                className={
                  addBookValue.name ? "text-2xl fill-rose-600" : "text-2xl"
                }
              />
              <input
                className="pl-2 outline-none border-none w-full"
                type="text"
                name="name"
                placeholder="Kitap Adı"
                value={addBookValue.name}
                onChange={(e) => addBookHandler(e)}
              />
            </div>
            <div className="flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-2/5 w-full">
              {/* Yazar İconu */}
              <AiFillEdit
                className={
                  addBookValue.author ? "text-2xl fill-rose-600" : "text-2xl"
                }
              />
              <input
                className="pl-2 outline-none border-none w-full"
                type="text"
                name="author"
                placeholder="Yazar Adı"
                value={addBookValue.author}
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
              onClick={() => {
                setAddBookValue({ bookId: "", name: "", author: "" });

                setShowModal(false);
              }}
            >
              Kapat
            </button>
            <button
              className={
                addBookValue.author !== "" && addBookValue.name !== ""
                  ? "bg-rose-500 text-white active:bg-rose-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  : "bg-gray-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              }
              type="button"
              onClick={() => {
                if (addBookValue.author === "" || addBookValue.name === "") {
                  toast.error("Lütfen Gerekli Bilgileri Doldurun");
                } else {
                  setShowModal(false);
                  addBook(addBookValue);
                  setAddBookValue({ bookId: "", name: "", author: "" });
                }
              }}
              disabled={addBookValue.author === "" && addBookValue.name}
            >
              Kaydet
            </button>
          </div>
        }
        setAddBookValue={setAddBookValue}
      />
      {/* Kitap Silme Modalı */}
      <Modal
        showModal={openDeleteModal}
        setShowModal={setOpenDeleteModal}
        title="Kitap Silme"
        body={
          <div className="text-center">
            <span className="font-bold">{currentBook?.name}</span> adlı kitabı
            silmek istediğinize emin misiniz?
          </div>
        }
        footer={
          <div className="flex justify-center">
            <button
              className="p-2 bg-gray-600 rounded-lg mx-2 w-20 my-2 text-white hover:bg-gray-700"
              onClick={() => setOpenDeleteModal(false)}
            >
              Hayır
            </button>
            <button
              className="p-2 bg-rose-600 rounded-lg mx-2 w-20 my-2 text-white hover:bg-rose-700"
              onClick={() =>
                removeBook(currentBook).then((res) => setOpenDeleteModal(false))
              }
            >
              Evet
            </button>
          </div>
        }
      ></Modal>
    </div>
  );
}
