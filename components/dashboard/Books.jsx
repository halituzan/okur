import React, { useState, useEffect } from "react";
import BooksTable from "./booktable/BooksTable";
import { GetAvailableBooks } from "../../helpers/books.helpers";
import svgData from "../../svgData";
import { NativeSelect, Pagination } from "@mantine/core";
import { IoIosArrowDown } from "react-icons/io";

export default function Books() {
  const [pagination, setPagination] = useState({
    totalPage: 0,
    currentPage: 0,
    perPage: 10,
  });
  const [search, setSearch] = useState("");
  const [bookList, setBookList] = useState([]);
  const [tableHead, setTableHead] = useState([
    { id: 1, name: "Kitap Adı" },
    { id: 2, name: "Yazar" },
    { id: 3, name: null },
  ]);

  const { searchIcon } = svgData;

  /* Functions */

  const availableBooksHandler = async () => {
    await GetAvailableBooks()
      .then((res) => {
        setBookList(res.data.resultList);
        setPagination({
          ...pagination,
          totalPage: Math.ceil(res?.data?.totalCount / pagination.perPage),
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
        setBookList(res.data.resultList);
        setPagination({
          ...pagination,
          totalPage: Math.ceil(res?.data?.totalCount / pagination.perPage),
        });
      })
      .catch((err) => console.log(err));
  };
  const availableBooksSearchHandler = async (search) => {
    await GetAvailableBooks(search, 0, pagination.perPage)
      .then((res) => {
        setBookList(res.data.resultList);
        setPagination({
          ...pagination,
          totalPage: Math.ceil(res?.data?.totalCount / pagination.perPage),
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

  /* Hooks */
  useEffect(() => {
    availableBooksHandler();
  }, []);
  useEffect(() => {
    availableBooksPaginationHandler();
  }, [pagination.perPage, pagination.currentPage]);

  const kitapIste = () => {};
  return (
    <div>
      <div>
        <div className="p-4 dark:border-gray-700 mt-14">
          <div className="w-full">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Ara
            </label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {searchIcon()}
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-rose-500 focus:border-rose-500"
                placeholder="Kitap adı veya yazar ile ara"
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
                type="submit"
                disabled={search.length < 3}
                class={
                  search.length >= 3
                    ? "text-white absolute right-2.5 bottom-2.5 bg-rose-600 hover:bg-rose-700 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2"
                    : "text-white absolute right-2.5 bottom-2.5 bg-gray-500 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
                }
                onClick={() => availableBooksSearchHandler(search)}
              >
                Kitap Ara
              </button>
            </div>
          </div>
        </div>
        {pagination.totalPage > 0 && (
          <div className="pagination flex flex-row justify-between w-full gap-10 my-5">
            <NativeSelect
              data={["10", "20", "50", "100"]}
              label="Kişi Sayısı"
              variant="filled"
              styles={{ height: "auto" }}
              rightSection={<IoIosArrowDown />}
              icon={null}
              onChange={(e) =>
                setPagination({ ...pagination, perPage: e.currentTarget.value })
              }
            />
            <Pagination
              value={pagination.currentPage + 1}
              color="gray"
              siblings={2}
              onChange={(e) =>
                setPagination({ ...pagination, currentPage: e - 1 })
              }
              total={pagination.totalPage}
            />
          </div>
        )}
      </div>

      <div className="book-list">
        {!bookList ? (
          ""
        ) : (
          <BooksTable
            tableHead={tableHead}
            bookList={bookList}
            listBookFunc={kitapIste}
          />
        )}
      </div>
    </div>
  );
}
