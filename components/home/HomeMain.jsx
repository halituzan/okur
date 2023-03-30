import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { books } from "../fakeBookData.js";
import Image from "next/image";
import Link from "next/link";
export default function HomeMain() {
  return (
    <>
      <header className="bg-slate-200 rounded-t-md -m-2 p-5 flex justify-between border-b border-rose-500">
        <div className="h-left flex ">
         
          <div className="search-button ml-3 flex justify-center items-center">
            <AiOutlineSearch
              className="search-icon text-l text-rose-500 cursor-pointer"
              onClick={() => {
                document.getElementById("search").classList.toggle("active");
              }}
            />
            <input
              type="text"
              name="search"
              id="search"
              className="search "
              placeholder="Kitap Ara"
              onBlur={() => {
                document.getElementById("search").classList.remove("active");
              }}
            />
          </div>
        </div>
        <div className="h-right flex">
          <Link
            href="/login"
            className="text-rose-500 font-bold flex xl:hidden p-2 bg-white rounded-2xl"
          >
            <BiLogIn className="text-2xl text-rose-500" /> Giriş Yap
          </Link>
          {/* <AiOutlineBook className="text-xl text-rose-500" /> */}
        </div>
      </header>

      <main className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 ">
        {books.length > 0
          ? books?.map((book, index) => {
              return (
                <div key={index} className="shadow-md h-full">
                  {
                    <div className="flex flex-col justify-start items-between bg-white h-full">
                      <div
                        className="image bg-slate-200 p-2 flex justify-center h-4/6"
                        style={{
                          backgroundImage: `url(${book.image})`,
                          backdropFilter: "blur(1px)",
                          backgroundSize: "300%",
                          backgroundPosition: "center",
                          zIndex: "1",
                        }}
                      >
                        <Image
                          src={book.image}
                          alt={book.name}
                          width={100}
                          height={200}
                          className="shadow-md border border-stone-600 shadow-stone-600	"
                        />
                      </div>
                      <div className="card-body p-1 self-start h-2/6 w-full">
                        <div className="card-title text-base">{book.name}</div>
                        <div className="card-author">{book.author}</div>
                      </div>
                    </div>
                  }
                </div>
              );
            })
          : ""}
      </main>
    </>
  );
}
