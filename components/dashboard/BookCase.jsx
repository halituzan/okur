import React, { useEffect, useState } from "react";
import BookCaseTable from "./booktable/BookCaseTable.jsx";
import { toast } from "react-toastify";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import {
  GetMyBooks,
  PostAddBook,
  deleteBook,
} from "../../helpers/books.helpers.js";
export default function BookCase() {
  const [userBookList, setUserBookList] = useState([]);
  const [token, setToken] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tableHead, setTableHead] = useState([
    { id: 1, name: "Kitap Adı" },
    { id: 2, name: "Yazar" },
    { id: 3, name: null },
  ]);

  const removeBook = async (book) => {
    await deleteBook(book.id).then(async (res) => {
      await mountData();
    });
  };
  const mountData = async () => {
    await GetMyBooks()
      .then((res) => {
        console.log(res);

        setUserBookList(res);
      })
      .catch((err) => console.log(err));
  };
  const addBook = async (bookValue) => {
    const { name, author } = bookValue;

    if (!name || !author) {
      toast.error("Kitap İsmi veya Yazar Adı Girmediniz.");
      return;
    }
    try {
      const res = await PostAddBook({ name, author });

      await mountData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    mountData();
  }, []);
  useEffect(() => {
    mountData();
  }, [token]);

  return (
    <div className='p-4 dark:border-gray-700 mt-14'>
      <div className='flex justify-end items-center px-3 ml-2 lg:col-span-3 col-span-5 mb-2'>
        <button
          type='button'
          className=' w-auto px-3 bg-rose-500 text-white text-l mt-0 py-2 font-bold mb-2 flex justify-center items-center self-end'
          onClick={() => setShowModal(true)}
        >
          <AiOutlineAppstoreAdd className='text-2xl mr-2' />
          Kitap Ekle
        </button>
      </div>

      <BookCaseTable
        removeBook={removeBook}
        addBook={addBook}
        userBookList={userBookList}
        showModal={showModal}
        setShowModal={setShowModal}
        tableHead={tableHead}
        mountData={mountData}
      />
    </div>
  );
}
