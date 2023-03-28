import React, { useState, useEffect } from "react";
import Login from "./Login";
import { AiOutlineSearch, AiOutlineBook } from "react-icons/ai";
import Image from "next/image";

export default function HomePage() {
  const [books, setBooks] = useState([
    {
      name: "Dinozorlar Ülkesinde Çürümüş Bal Kabağı",
      author: "Halit Uzan",
      image:
        "https://i.dr.com.tr/cache/600x600-0/originals/0001946721001-1.jpg",
    },
    {
      name: "Yarınsız Yarın",
      author: "Nazan Öncel",
      image:
        "https://i.dr.com.tr/cache/500x400-0/originals/0001899803001-1.jpg",
    },
    {
      name: "Gece Yarısı Kütüphanesi",
      author: "Matt Haig",
      image:
        "https://i.dr.com.tr/cache/500x400-0/originals/0001922926001-1.jpg",
    },
    {
      name: "Kuyucaklı Yusuf",
      author: "Sabahattin Ali",
      image:
        "https://i.dr.com.tr/cache/500x400-0/originals/0000000052460-1.jpg",
    },
    {
      name: "Olağanüstü Bir Gece",
      author: "Stefan Zweig",
      image:
        "https://i.dr.com.tr/cache/500x400-0/originals/0000000671636-1.jpg",
    },
    {
      name: "Beyaz Zambaklar Ülkesinde",
      author: "Grigory Petrov",
      image:
        "https://i.dr.com.tr/cache/500x400-0/originals/0001917612001-1.jpg",
    },
  ]);

  return (
    <div className="grid grid-cols-3 gap-4 p-4 grid-row-1 h-screen">
      <div className="left xl:col-span-2 col-span-3 row-span-4 p-2 bg-slate-100 rounded-md">
        <header className="bg-slate-200 rounded-t-md -m-2 p-5 flex justify-between border-b border-rose-500">
          <AiOutlineSearch className="text-xl" />
          <AiOutlineBook className="text-xl" />
        </header>
        <div className="m-5">
          <h2 className="mb-4 text-3xl subpixel-antialiased">OkurNET</h2>
          <h3 className="mb-4 text-2xl subpixel-antialiased">
            {" "}
            Yeni nesil dijital kütüphane.{" "}
          </h3>
          <p>Kitaplarınızı değiştirin, okuyun, teslim edin, teslim alın. </p>
          <p>
            Okuduğunuz kitabı arkadaşlarınızla paylaşın, okumak istediğiniz
            kitapları arkadaşlarınızdan talep edin.{" "}
          </p>
        </div>
        <div className="title -m-2 mt-2 p-2 bg-rose-400">
          {/* <h1 className="mb-4 text-6xl subpixel-antialiased">Kitap Listesi</h1> */}
          <div className="button-list flex pb-2">
            <button className="rounded-full p-2 mx-2 bg-white shadow-xl ">
              İstek Listesi
            </button>

            <button className="rounded-full p-2 mx-2 text-white">
              Paylaşılanlar
            </button>
          </div>
        </div>

        <hr />
        <main className="p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 ">
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
                          <div className="card-title text-base">
                            {book.name}
                          </div>
                          <div className="card-author">{book.author}</div>
                        </div>
                      </div>
                    }
                  </div>
                );
              })
            : ""}
        </main>
        <footer className="p-5">
          &copy; OkurNET made by <span className="text-rose-500">&hearts;</span>
        </footer>
      </div>
      <div className="login hidden xl:flex col-span-1 row-span-1 p-2 bg-slate-100 flex justify-center items-center	rounded-md ">
        <Login />
      </div>
    </div>
  );
}
