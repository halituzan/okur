import React, { useState, useEffect } from "react";
import BooksTable from "./booktable/BooksTable";
import { GetAvailableBooks, RequestBook } from "../../helpers/books.helpers";
import svgData from "../../svgData";
import { NativeSelect, Pagination, Select } from "@mantine/core";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { bookListReducer } from "../../store/slices/bookSlice";

const Books = () => {
  const { bookList } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    totalPage: 0,
    currentPage: 0,
    perPage: 10,
  });

  const [search, setSearch] = useState("");

  const [tableHead, setTableHead] = useState([
    { id: 1, name: "Kitap Adı" },
    { id: 2, name: "Yazar" },
    { id: 3, name: null },
  ]);

  const availableBooksHandler = async (type = false) => {
    await GetAvailableBooks(null, 0, 10, type && type)
      .then((res) => {
        dispatch(bookListReducer(res.resultList));
        setPagination({
          ...pagination,
          totalPage: Math.ceil(res?.totalCount / pagination.perPage),
        });
      })
      .catch((err) => console.log(err));
  };
  const availableBooksPaginationHandler = async () => {
    await GetAvailableBooks(
      search ? search : null,
      pagination.currentPage,
      pagination.perPage
    )
      .then((res) => {
        dispatch(bookListReducer(res.resultList));
        setPagination({
          ...pagination,
          totalPage: Math.ceil(res?.totalCount / pagination.perPage),
        });
      })
      .catch((err) => console.log(err));
  };
  const availableBooksSearchHandler = async (search) => {
    await GetAvailableBooks(search, 0, pagination.perPage)
      .then((res) => {
        dispatch(bookListReducer(res.resultList));
        setPagination({
          ...pagination,
          totalPage: Math.ceil(res?.totalCount / pagination.perPage),
        });
      })
      .catch((err) => console.log(err));
  };

  const handleKeyDown = (e) => {
    if (search.length > 2) {
      if (e.key === "Enter") {
        availableBooksSearchHandler(search);
      }
    }
  };

  useEffect(() => {
    availableBooksHandler();
  }, []);
  useEffect(() => {
    availableBooksPaginationHandler();
  }, [pagination.perPage, pagination.currentPage]);

  return (
    <div>
      <div>
        <div className='p-4 dark:border-gray-700 mt-14'>
          <div className='w-full'>
            <label
              htmlFor='default-search'
              className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
            >
              Ara
            </label>
            <div className='relative w-full'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                {searchIcon()}
              </div>
              <input
                type='search'
                id='default-search'
                className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-rose-500 focus:border-rose-500'
                placeholder='Kitap adı veya yazar ile ara'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value === "") {
                    setPagination({ ...pagination, currentPage: 0 });
                    availableBooksHandler();
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <button
                type='submit'
                disabled={search.length < 3}
                className={
                  search.length >= 3
                    ? "text-white absolute right-2.5 bottom-2.5 bg-rose-600 hover:bg-rose-700 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2"
                    : "text-white absolute right-2.5 bottom-2.5 bg-gray-500 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
                }
                onClick={() => availableBooksSearchHandler(search)}
              >
                Ara
              </button>
            </div>
          </div>
        </div>

        {pagination.totalPage > 0 && (
          <div className='pagination flex flex-row justify-between w-full gap-10 my-5 px-4'>
            <div>
              <Select
                data={["10", "20", "50", "100"]}
                label='Kitap Sayısı'
                variant='filled'
                styles={{ height: "auto" }}
                rightSection={<IoIosArrowDown />}
                icon={null}
                onChange={(e) =>
                  setPagination({
                    ...pagination,
                    perPage: e,
                    currentPage: 0,
                  })
                }
              />
              <div className='flex items-center mt-2'>
                <input
                  type='checkbox'
                  id='isRequested'
                  className='rounded-sm focus:outline-none'
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      availableBooksHandler(true);
                    } else {
                      availableBooksHandler();
                    }
                  }}
                />
                <label htmlFor='isRequested' className='ml-2 cursor-pointer'>
                  Sadece talep edilebilirleri göster
                </label>
              </div>
            </div>

            <Pagination
              value={pagination.currentPage + 1}
              color='gray'
              siblings={2}
              onChange={(e) =>
                setPagination({ ...pagination, currentPage: e - 1 })
              }
              total={pagination.totalPage}
            />
          </div>
        )}
      </div>

      <div className='book-list px-4'>
        {bookList && (
          <BooksTable
            tableHead={tableHead}
            bookList={bookList}
            mount={availableBooksHandler}
          />
        )}
      </div>
    </div>
  );
};
export default Books;
const { searchIcon } = svgData;
