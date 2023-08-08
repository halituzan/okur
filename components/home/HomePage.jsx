import React from "react";
import Login from "../Login";
import Link from "next/link";
export default function HomePage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <section className="rounded-xl border border-gray-100 p-4 shadow-xl">
        <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 flex flex-col justify-center items-center">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 items-center lg:gap-x-16">
            <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
              <h2 className="text-4xl font-bold sm:text-6xl mb-4">Booky</h2>
              <p>Kitaplarınızı değiştirin, okuyun, teslim edin, teslim alın.</p>
              <p>
                Okuduğunuz kitabı arkadaşlarınızla paylaşın, okumak istediğiniz
                kitapları arkadaşlarınızdan talep edin.
              </p>
              <Link
                href="/register"
                className="mt-8 inline-block rounded bg-rose-500 px-12 py-3 text-sm font-medium text-white transition hover:bg-rose-700 focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Hemen Başlayın
              </Link>
            </div>
            <Login />
          </div>
        </div>
      </section>
    </div>
  );
}
