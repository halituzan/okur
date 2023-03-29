import React from "react";

export default function HomeTitle() {
  return (
    <div className="pt-5 pl-2 flex flex-col justify-start items-between">
      <div className="title-header border-b border-rose-500">
        <h2 className="mb-4 text-3xl subpixel-antialiased">OkurNET</h2>
      </div>
      <div className="title-body">
        <h3 className="mb-4 text-2xl subpixel-antialiased">
          Yeni nesil dijital kütüphane.{" "}
        </h3>
        <p>Kitaplarınızı değiştirin, okuyun, teslim edin, teslim alın. </p>
        <p>
          Okuduğunuz kitabı arkadaşlarınızla paylaşın, okumak istediğiniz
          kitapları arkadaşlarınızdan talep edin.{" "}
        </p>
      </div>
      <div className="title-footer">
        <div className="mt-5 flex">
          &copy; OkurNET made by{" "}
          <span className="heart-wrap">
            <span className="heart"></span>
          </span>
        </div>
      </div>
    </div>
  );
}
