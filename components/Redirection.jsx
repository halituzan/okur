import React from 'react'
import { ThreeDots } from "react-loading-icons";

export default function Redirection() {
  return (
    <div className="flex w-full h-16  justify-center items-center bg-rose-500 text-white">
      <ThreeDots className='w-16'/> <span className='ml-5'>Yönlendiriliyorsunuz...</span>
    </div>
  )
}
