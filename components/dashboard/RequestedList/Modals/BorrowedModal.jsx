import React, { useRef } from "react";
import { BookBorrowed } from "../../../../helpers/books.helpers";
import { AiFillCloseCircle } from "react-icons/ai";

const BorrowedModal = ({ currentBook, setOpenBookBorrowed }) => {
  const bookBorrowedModalRef = useRef(null);
  return (
    <div>
      <div className="justify-start items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-3/4 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div
            ref={bookBorrowedModalRef}
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          >
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-rose-600 rounded-t">
              <h3 className="text-2xl font-semibold">Kitabı Onaylıyorsunuz</h3>
              <button
                className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => {
                  setOpenBookBorrowed(false);
                }}
              >
                <AiFillCloseCircle className="fill-rose-600" />
              </button>
            </div>
            <div className="p-4">
              <span className="font-bold">{currentBook.name}</span> adlı kitabı
              teslim aldınız mı?
            </div>
            <div className="p-4 border-t border-rose-600">
              <button onClick={() => BookBorrowed(currentBook.id)}>Evet</button>
              <button onClick={() => setOpenBookBorrowed(false)}>İptal</button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default BorrowedModal;
