import React from "react";
import { useSelector } from "react-redux";

export default function BooksTable({ bookList, listBookFunc, tableHead }) {
  const myInformation = useSelector((state) => state.users.userInformation);

  return (
    <div className="relative overflow-x-auto flex flex-col">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
        <tbody>
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
                {book.lastRequestStatus === "Available" &&
                book.ownerId !== myInformation?.userId ? (
                  <button
                    type="button"
                    className="px-3 bg-rose-500 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
                    onClick={() => listBookFunc(book.id)}
                  >
                    Talep Et
                  </button>
                ) : (
                  <button
                    type="button"
                    className="px-3  bg-gray-500 text-white text-l mt-4 py-2  font-bold mb-2  justify-center items-center "
                    disabled={true}
                    style={{ visibility: "hidden" }}
                  >
                    Talep Edildi
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
