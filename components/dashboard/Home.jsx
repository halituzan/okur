import React, { useEffect, useState } from "react";
import "flowbite";
import {
  GetAvailableBooks,
  GetBookRequests,
  GetBooksIRead,
} from "../../helpers/books.helpers";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  bookListReducer,
  myBookListReducer,
} from "../../store/slices/bookSlice";
export default function Home() {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.books.bookList);
  const myBookList = useSelector((state) => state.books.myBookList);

  const [showRequestModal, setShowRequestModal] = useState(false);

  const mountData = async () => {
    await GetAvailableBooks().then((res) => {
      dispatch(bookListReducer(res?.data?.resultList));
    });
    await GetBooksIRead().then((res) => {
      dispatch(myBookListReducer(res.data));
    });
  };

  useEffect(() => {
    mountData();
  }, []);

  return (
    <div className="p-4 border-gray-200 border-dashed rounded-lg mt-14">
      <div className="grid grid-cols-4 gap-4 mb-4 ">
        <div className="flex flex-col col-span-1 items-center justify-center text-center h-48 rounded bg-gray-50">
          <span className="mb-2">Kitabın Teslim Tarihi</span>
          <p className="text-2xl text-black  ">{/* <Countdown /> */}</p>
        </div>
        <div className="flex flex-col col-span-1 items-center justify-center text-center h-48 rounded bg-gray-50">
          <span className="mb-2">Kitabın Alım Tarihi</span>
          <p className="text-2xl text-gray-400 ">{/* <Countdown /> */}</p>
        </div>
        <div className="flex flex-col divide-y items-start py-2 col-span-2 justify-start h-48 w-full rounded bg-gray-50 relative">
          <p className="text-md my-1 font-bold self-center text-gray-400 absolute top-[-20px] bg-gray-50 px-5 rounded-tl-lg rounded-tr-md">
            Okuduğun Kitaplar
          </p>
          {myBookList.reverse().map((item, index) => {
            return (
              <p key={item.id} className="py-1 px-2 w-full">
                {index + 1} - <span className="font-bold">{item.name}</span>{" "}
                <span className="italic">{item.author}</span>
              </p>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-start justify-start mb-4 rounded bg-gray-50 divide-y-2">
        <h3 className="p-4 text-2xl">Son Listelenen Kitaplar</h3>
        {bookList?.map((book, index) => {
          return (
            <div
              className="w-full p-2 flex justify-between items-center hover:bg-gray-100 "
              key={"book" + index}
            >
              <span className="flex-1">{book.name}</span>
              <span className="flex-1">{book.author}</span>
              {/* <button
                className="flex items-center p-2 text-white bg-rose-500 rounded-lg ml-2"
                onClick={() => setShowRequestModal(true)}
              >
                Talep Et
              </button> */}
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
