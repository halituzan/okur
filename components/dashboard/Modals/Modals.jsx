import Image from "next/image";
import React, { useEffect, useRef } from "react";

const Modals = ({
  icon,
  title,
  description,
  close = () => {},
  request = () => {},
}) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen w-screen fixed top-0 left-0 z-50 bg-slate-600/30 flex justify-center items-center">
      <div className="w-[500px] h-80 rounded-xl bg-white flex flex-col items-center justify-center" ref={modalRef}>
        <div className="self-center flex-1 justify-center items-center flex">
          <Image
            src={icon}
            width={100}
            height={100}
            alt="success"
            className="bg-[#B9EAD852] p-2 rounded-full"
          />
        </div>
        <div className="flex justify-center items-center flex-col flex-1">
          <div>
            <p className="text-xl text-slate-600 font-bold">{title}</p>
          </div>
          <div className="flex justify-center items-center text-center">
            <p className="text-xl font-medium text-slate-500">{description}</p>
          </div>
        </div>
        <div className="h-20">
          <button
            className="w-32 px-2 py-2 rounded-xl bg-rose-600 text-white mx-1 font-bold"
            onClick={request}
          >
            Evet
          </button>
          <button
            className="w-32 px-2 py-2 rounded-xl bg-slate-400 text-white mx-1 font-bold"
            onClick={close}
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modals;
