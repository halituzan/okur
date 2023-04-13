import React, { useState, useEffect } from "react";
import Login from "../Login";
import HomeTitle from "./HomeTitle";
import HomeMain from "./HomeMain";

export default function HomePage() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 grid-row-1 h-screen">
      <div className="left xl:col-span-2 col-span-3 row-span-4 p-2 bg-slate-100 rounded-md">
        <HomeMain />
      </div>
      <div className="hidden xl:flex col-span-1 row-span-1 rounded-md p-2 bg-slate-100 flex justify-center items-centerrounded-md ">
        <HomeTitle />
      </div>
      <div className="hidden xl:flex col-span-1 row-span-1 rounded-md p-2 bg-slate-100 flex justify-center items-centerrounded-md ">
        <Login className="overflow-auto"/>
      </div>
    </div>
  );
}

