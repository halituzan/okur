import React, { useRef, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
const Modal = ({ showModal, setShowModal, body, footer }) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    showModal && (
      <>
        <div className="justify-start items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-3/4 my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div
              ref={modalRef}
              className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            >
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-rose-600 rounded-t">
                <h3 className="text-3xl font-semibold">Kitap Ekle</h3>
                <button
                  className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <AiFillCloseCircle className="fill-rose-600" />
                </button>
              </div>
              <div className="p-4">{body && body}</div>
              <div className="p-4 border-t border-rose-600">
                {footer && footer}
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    )
  );
};

export default Modal;
