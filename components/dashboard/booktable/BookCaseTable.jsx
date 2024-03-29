import React, { useState } from "react";
import {
  AiFillDelete,
  AiFillBook,
  AiFillEdit,
  AiOutlineEdit,
} from "react-icons/ai";
import { toast } from "react-toastify";
import Modal from "../../Modal";
import { UpdateBook } from "../../../helpers/books.helpers";
import svgData from "../../../svgData";
const { informationIcon } = svgData;
export default function BookCaseTable({
  addBook,
  removeBook,
  userBookList,
  showModal,
  setShowModal,
  tableHead,
  mountData,
}) {
  const [addBookValue, setAddBookValue] = useState({
    bookId: "",
    name: "",
    author: "",
  });
  const [currentBook, setCurrentBook] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editModalValue, setEditModalValue] = useState({
    id: null,
    name: "",
    author: "",
  });
  const addBookHandler = (e) => {
    setAddBookValue({ ...addBookValue, [e.target.name]: e.target.value });
  };

  const updateBook = async () => {
    await UpdateBook(editModalValue).then(async (_) => {
      setOpenEditModal(false);
      await mountData();
    });
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
                {book.lastRequestStatus === "Available" ? (
                  <>
                    {" "}
                    <button
                      type="button"
                      className="px-3 mr-3 bg-rose-500 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
                      onClick={() => {
               
                        setEditModalValue({
                          ...editModalValue,
                          id: book.id,
                          name: book.name,
                          author: book.author,
                        });
                        setOpenEditModal(true);
                      }}
                    >
                      <AiOutlineEdit /> Güncelle
                    </button>
                    <button
                      type="button"
                      className=" px-3 bg-rose-500 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
                      onClick={() => {
                    
                        setCurrentBook(book);
                        setOpenDeleteModal(true);
                      }}
                    >
                      <AiFillDelete /> Sil
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="px-3 bg-transparant text-orange-600 text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
                    title="Kitabı düzenleyebilmeniz için teslim almalısınız."
                  >
                    {informationIcon()} Kitap Düzenlenmez
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Kitap Ekleme Modalı */}
      {showModal && (
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
      )}
      {/* Kitap Silme Modalı */}
      {openDeleteModal && (
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
                  removeBook(currentBook).then((res) =>
                    setOpenDeleteModal(false)
                  )
                }
              >
                Evet
              </button>
            </div>
          }
        ></Modal>
      )}
      {/* Kitap Güncelleme Modalı */}
      <Modal
        showModal={openEditModal}
        setShowModal={setOpenEditModal}
        title="Kitap Düzenleme"
        body={
          <div className="relative p-6 flex flex-col sm:flex-row">
            <div className="flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-3/5 w-full">
              <AiFillBook
                className={
                  editModalValue.name ? "text-2xl fill-rose-600" : "text-2xl"
                }
              />
              <input
                className="pl-2 outline-none border-none w-full"
                type="text"
                name="name"
                placeholder="Kitap Adı"
                value={editModalValue.name}
                onChange={(e) =>
                  setEditModalValue({ ...editModalValue, name: e.target.value })
                }
              />
            </div>
            <div className="flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-2/5 w-full">
              {/* Yazar İconu */}
              <AiFillEdit
                className={
                  editModalValue.author ? "text-2xl fill-rose-600" : "text-2xl"
                }
              />
              <input
                className="pl-2 outline-none border-none w-full"
                type="text"
                name="author"
                placeholder="Yazar Adı"
                value={editModalValue.author}
                onChange={(e) =>
                  setEditModalValue({
                    ...editModalValue,
                    author: e.target.value,
                  })
                }
              />
            </div>
          </div>
        }
        footer={
          <div className="flex justify-center">
            <button
              className="p-2 bg-gray-600 rounded-lg mx-2 w-20 my-2 text-white hover:bg-gray-700"
              onClick={() => {
                setEditModalValue({
                  ...editModalValue,
                  id: null,
                  name: "",
                  author: "",
                });
                setOpenEditModal(false);
              }}
            >
              İptal
            </button>
            <button
              className="p-2 bg-rose-600 rounded-lg mx-2 w-20 my-2 text-white hover:bg-rose-700"
              onClick={() =>
                updateBook().then((res) => setOpenEditModal(false))
              }
            >
              Kaydet
            </button>
          </div>
        }
      ></Modal>
    </div>
  );
}
