import React, { useEffect, useRef } from "react";
import { DeclineBookRequest } from "../../../../helpers/books.helpers";
import { AiFillCloseCircle } from "react-icons/ai";

const DeclineModal = ({ currentBook, setOpenDecline }) => {
  const declineModalRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      declineModalRef.current &&
      !declineModalRef.current.contains(event.target)
    ) {
      setOpenDecline(false);
    }
  };

  const declineHandler = async () => {
    await DeclineBookRequest(currentBook.id).then((_) => {
      setOpenDecline(false);
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div className="justify-start items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-3/4 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div
            ref={declineModalRef}
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-auto"
          >
            {/*header*/}
            <div className="flex items-start justify-center p-5 border-b border-solid border-rose-600 rounded-t">
              <h3 className="text-2xl font-semibold">
                Kitap Talebini Reddediyorsunuz
              </h3>
              {/* <button
                className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => {
                  setOpenDecline(false);
                }}
              >
                <AiFillCloseCircle className="fill-rose-600" />
              </button> */}
            </div>
            <div className="p-4 h-40 flex flex-col justify-center items-center">
              <p className="font-bold text-xl">{currentBook.name} </p>
              <p className="text-lg">
                {" "}
                adlı kitabı reddediyorsunuz emin misiniz?
              </p>
            </div>
            <div className="p-4 border-t border-rose-600 flex justify-center items-center">
              <button
                className="bg-rose-600 mr-2 p-2 text-white w-[100px] rounded-lg"
                onClick={() => declineHandler()}
              >
                Evet
              </button>
              <button
                className="bg-slate-600 mr-2 p-2 text-white w-[100px] rounded-lg"
                onClick={() => setOpenDecline(false)}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default DeclineModal;
