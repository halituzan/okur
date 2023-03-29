import Image from "next/image";
import React from "react";

export default function HomeTitle() {
  return (
    <div className="pl-2 flex flex-col justify-center items-center">
      <div className="title-header flex flex-col justify-center items-center">
        <Image src="/images/logo.svg" alt="logo" width={110} height={30} />
        <h4 className="text-xl self-end subpixel-antialiased flex justify-center text-center">
          Yeni Nesil Kütüphane
        </h4>
      </div>
      <div className="title-body  text-center">
        <p>Kitaplarınızı değiştirin, okuyun, teslim edin, teslim alın. </p>
        <p>
          Okuduğunuz kitabı arkadaşlarınızla paylaşın, okumak istediğiniz
          kitapları arkadaşlarınızdan talep edin.
        </p>
      </div>
      <div className="title-footer">
        <div className="mt-5 flex">
          &copy; OkurNET made by
          <span className="heart-wrap">
            <span className="heart"></span>
          </span>
        </div>
      </div>
    </div>
  );
}
