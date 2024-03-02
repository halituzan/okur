import "flowbite";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAvailableBooks, GetBooksIRead } from "../../helpers/books.helpers";
import {
  bookListReducer,
  myBookListReducer,
} from "../../store/slices/bookSlice";
export default function Home() {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.books.bookList);
  const myBookList = useSelector((state) => state.books.myBookList) || [];

  const mountData = async () => {
    await GetAvailableBooks().then((res) => {
      dispatch(bookListReducer(res?.resultList));
    });
    await GetBooksIRead().then((res) => {
      dispatch(myBookListReducer(res));
    });
  };

  useEffect(() => {
    mountData();
  }, []);

  return (
    <div className='p-4 border-gray-200 border-dashed rounded-lg mt-14'>
      <div className='grid grid-cols-4 gap-4 my-4 '>
        <div className='flex flex-col col-span-4 md:col-span-1 items-center justify-center text-center h-24 md:h-48 rounded bg-gray-50'>
          <span className='mb-2'>Kitabın Teslim Tarihi</span>
          <p className='text-2xl text-black  '>{/* <Countdown /> */}</p>
        </div>
        <div className='flex flex-col col-span-4  md:col-span-1 items-center justify-center text-center h-24 md:h-48 rounded bg-gray-50'>
          <span className='mb-2'>Kitabın Alım Tarihi</span>
          <p className='text-2xl text-gray-400 '>{/* <Countdown /> */}</p>
        </div>
        <div className='flex flex-col items-start py-2 mt-4 md:mt-0 col-span-4 md:col-span-2 justify-start h-48 w-full rounded bg-gray-50 relative'>
          <p className='text-md my-1 font-bold self-center text-gray-400 absolute top-[-20px] bg-gray-50 px-5 rounded-tl-lg rounded-tr-md'>
            Okuduğun Kitaplar
          </p>
          <div className='divide-y w-full'>
            {[...myBookList]?.reverse()?.map((item, index) => {
              return (
                <p key={item.id} className='py-1 px-2 w-full'>
                  {index + 1} - <span className='font-bold'>{item.name}</span>{" "}
                  <span className='italic'>{item.author}</span>
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className='flex flex-col items-start justify-start mb-4 rounded bg-gray-50 divide-y-2'>
        <h3 className='p-4 text-2xl'>Son Listelenen Kitaplar</h3>
        {bookList?.map((book, index) => {
          return (
            <div
              className='w-full p-2 flex justify-between items-center hover:bg-gray-100 '
              key={"book" + index}
            >
              <span className='flex-1'>{book.name}</span>
              <span className='flex-1'>{book.author}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
