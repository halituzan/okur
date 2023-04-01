import React, { useEffect, useState } from "react";
import {
  AiFillDelete,
  AiOutlineAppstoreAdd,
  AiFillBook,
  AiFillEdit,
} from "react-icons/ai";

export default function BooksTable({ bookList, listBookFunc }) {

  return (
    <div className="relative overflow-x-auto flex flex-col">
     

    
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
          {bookList?.map((book, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={book.bookID}
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
                  onClick={() => listBookFunc(book)}
                >
                  Talep Et
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
