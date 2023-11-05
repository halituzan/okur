import React, { useEffect, useState } from "react";
import svgData from "../../../svgData";

import { BiBookReader, BiSolidTimer } from "react-icons/bi";
import AcceptModal from "./Modals/AcceptModal";
import DeclineModal from "./Modals/DeclineModal";
import BorrowedModal from "./Modals/BorrowedModal";
import ReturnedModal from "./Modals/ReturnedModal";
import { useSelector } from "react-redux";
const { informationIcon } = svgData;
export default function BooksTable({ bookList, listBookFunc, tableHead }) {
  const myInformation = useSelector((state) => state.users.userInformation);
  const [openAccept, setOpenAccept] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);
  const [openBookBorrowed, setOpenBookBorrowed] = useState(false);
  const [openBookReturned, setOpenBookReturned] = useState(false);
  const [currentBook, setCurrentBook] = useState({});

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
          {bookList
            // .filter((item) => item.reqStatus !== 2)
            ?.map((book, index) => {
              const { reqStatus, ownerId, author, name, id } = book;
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={id}
                >
                  <th
                    scope="row"
                    className="px-2 font-medium text-gray-900  dark:text-white"
                  >
                    {name}
                  </th>

                  <td className="px-2">{author}</td>
                  <td className="px-2 flex justify-end items-center pr-0">
                    {reqStatus === 1 && ownerId !== myInformation?.userId ? (
                      <button
                        type="button"
                        className="px-3 bg-transparant text-rose-600 text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
                        title="Talep Onayı Bekleniyor."
                      >
                        Talep Onayı Bekleniyor.{" "}
                        <span className="ml-2">{informationIcon()}</span>
                      </button>
                    ) : reqStatus === 1 && ownerId === myInformation?.userId ? (
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="px-3 bg-gray-600 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center mr-2 "
                          onClick={() => {
                            setOpenDecline(true);
                            setCurrentBook(book);
                          }}
                          title="Talep Onayı Bekleniyor."
                        >
                          Reddet
                        </button>
                        <button
                          type="button"
                          className="px-3 bg-rose-600 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
                          onClick={() => {
                            setOpenAccept(true);
                            setCurrentBook(book);
                          }}
                          title="Talep Onayı Bekleniyor."
                        >
                          Kabul Et
                        </button>
                      </div>
                    ) : reqStatus === 3 && ownerId === myInformation?.userId ? (
                      <button
                        type="button"
                        className="px-3 bg-transparant text-rose-600 text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
                        title="Lütfen Kitabı Teslim Edin."
                      >
                        Lütfen Kitabı Teslim Edin.{" "}
                        <span className="ml-2">{informationIcon()}</span>
                      </button>
                    ) : reqStatus === 3 && ownerId !== myInformation?.userId ? (
                      <button
                        type="button"
                        className="px-3 bg-rose-600 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
                        onClick={() => {
                          setOpenBookBorrowed(true);
                          setCurrentBook(book);
                        }}
                      >
                        Teslim Aldım
                      </button>
                    ) : reqStatus === 4 && ownerId === myInformation?.userId ? (
                      <button
                        type="button"
                        className="px-3 bg-rose-600 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
                        onClick={() => {
                          setOpenBookReturned(true);
                          setCurrentBook(book);
                        }}
                      >
                        Teslim Aldım
                      </button>
                    ) : reqStatus === 4 && ownerId !== myInformation?.userId ? (
                      <button
                        type="button"
                        className="px-3 cursor-default bg-rose-600 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
                        onClick={() => {}}
                        title="Kalan Süre"
                      >
                        <BiSolidTimer size={20} /> 3 Gün
                      </button>
                    ) : reqStatus === 5 ? (
                      <button
                        type="button"
                        className="px-3 cursor-default bg-rose-600 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
                        onClick={() => {}}
                        title="Okunan Kitaplar"
                        disabled={true}
                      >
                        <BiBookReader size={20} /> Okundu
                      </button>
                    ) : (
                      reqStatus === 2 && (
                        <button
                          type="button"
                          className="px-3 bg-transparant text-rose-600 text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
                          title=""
                        >
                          Talep reddedildi.{" "}
                          <span className="ml-2">{informationIcon()}</span>
                        </button>
                      )
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* Accept Modal */}
      {openAccept && (
        <AcceptModal setOpenAccept={setOpenAccept} currentBook={currentBook} />
      )}
      {/* Decline Modal */}
      {openDecline && (
        <DeclineModal
          setOpenDecline={setOpenDecline}
          currentBook={currentBook}
        />
      )}
      {/* Ödünç Alındı Modal */}
      {openBookBorrowed && (
        <BorrowedModal
          setOpenBookBorrowed={setOpenBookBorrowed}
          currentBook={currentBook}
        />
      )}
      {openBookReturned && (
        <ReturnedModal
          setOpenBookBorrowed={setOpenBookReturned}
          currentBook={currentBook}
        />
      )}
    </div>
  );
}
