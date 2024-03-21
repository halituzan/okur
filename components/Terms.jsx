import React from "react";

const Terms = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-4'>
      <div className='flex justify-center items-center text-rose-600 font-bold'>
        <a
          href='/terms-and-conditions'
          alt='terms'
          target='_blank'
          className='mx-4 text-rose-600 font-bold'
        >
          Kullanım Şartları
        </a>
        |
        <a
          href='/privacy'
          alt='terms'
          target='_blank'
          className='mx-4 text-rose-600 font-bold'
        >
          Gizlilik Politikası
        </a>
      </div>
      <p>
        Made by <span className='text-rose-600'>&hearts;</span>
      </p>
    </div>
  );
};

export default Terms;
