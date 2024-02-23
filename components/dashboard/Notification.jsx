import React from "react";
import UseAnimations from "react-useanimations";
import alertTriangle from "react-useanimations/lib/alertTriangle";
export default function Notification({ notifications = [] }) {
  return (
    <div className='p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14'>
      <div className=' py-2 px-4 text-white flex flex-col items-center'>
        {notifications
          .filter((i) => i.typeStatus === true && i.type === "delivery")
          .map((i, index) => {
            return (
              <div
                className='flex justify-between items-center p-4 mb-4 w-full text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 notification-animate relative'
                role='alert'
                key={index}
              >
                <div className='flex items-center mr-4'>
                  <p className='text-black font-bold'>
                    {i.bookName}
                    <span className='ml-1 font-light'>
                      adlı kitabınız teslim edilmek için hazır.
                    </span>
                  </p>
                </div>
                <div className='flex'>
                  <button className='flex items-center p-2 text-white bg-rose-500 rounded-lg ml-2 min-w-min'>
                    Teslim Et
                  </button>
                  <UseAnimations
                    animation={alertTriangle}
                    size={40}
                    strokeColor={"rgb(0 0 0)"}
                  />
                </div>
              </div>
            );
          })}
        {notifications
          .filter((i) => i.typeStatus === true && i.type === "pickUp")
          .map((i, index) => {
            return (
              <div
                className='flex justify-between items-center p-4 mb-4 w-full text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 notification-animate relative'
                role='alert'
                key={index}
              >
                <div className='flex items-center mr-4'>
                  <p className='text-black font-bold	'>
                    {i.bookName}
                    <span className='ml-1 font-light'>
                      adlı kitabınız teslim almak için hazır.
                    </span>
                  </p>
                </div>
                <div className='flex'>
                  <button className='flex items-center p-2 text-white bg-rose-500 rounded-lg ml-2'>
                    Teslim Al
                  </button>
                  <UseAnimations
                    animation={alertTriangle}
                    size={40}
                    strokeColor={"rgb(0 0 0)"}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
