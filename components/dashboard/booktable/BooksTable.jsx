import React from "react";

export default function BooksTable({ bookList, listBookFunc, tableHead }) {
  return (
    <div className="relative overflow-x-auto flex flex-col">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="book-table-head text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tableHead.map((i) => {
              return (
                <th scope="col" className="px-2 py-3" key={i.id}>
                  {i.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="book-table overflow-auto h-[calc(100vh - 310px)] w-[calc(100vw - 290px)] flex flex-col">
          {bookList?.map((book, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={book.id}
            >
              <th
                scope="row"
                className="px-2 font-medium text-gray-900  dark:text-white"
              >
                {book.name}
              </th>

              <td className="px-2">{book.author}</td>
              <td className="px-2 flex justify-end items-center pr-0">
                <button
                  type="button"
                  className="px-3 bg-rose-500 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
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
