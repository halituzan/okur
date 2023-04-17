import React from "react";

export default function Pagination({ pagination, setPagination }) {
  const { currentPage, totalPage } = pagination;

  const pageNumbers = Array.from(Array(pagination.totalPage)).map(
    (_, index) => index + 1
  );

  const current = pagination.currentPage;
  const left = current - 2 >= 0 ? current - 2 : 0;
  const right =
    current + 2 < pageNumbers.length ? current + 2 : pageNumbers.length - 1;
  const visiblePageNumbers = pageNumbers.slice(left, right + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <a
            href="#"
            className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => {
              if (currentPage > 0) {
                setPagination({ ...pagination, currentPage: currentPage - 1 });
              }
            }}
          >
            <span className="sr-only">Öncesi</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
        {visiblePageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <a
              href
              className={
                pagination.currentPage === pageNumber - 1
                  ? "px-3 py-2 leading-tight text-white bg-rose-500 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  : "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              onClick={() =>
                setPagination({ ...pagination, currentPage: pageNumber - 1 })
              }
            >
              {pageNumber}
            </a>
          </li>
        ))}

        {/* {Array.from(Array(pagination.totalPage)).map((i, index) => {
          return (
            <li key={index}>
              <a
                href="#"
                className={
                  pagination.currentPage === index
                    ? "px-3 py-2 leading-tight text-white bg-rose-500 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    : "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
                onClick={() =>
                  setPagination({ ...pagination, currentPage: index })
                }
              >
                {index + 1}
              </a>
            </li>
          );
        })} */}
        <li>
          <a
            href="#"
            className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => {
              if (currentPage < totalPage - 1) {
                setPagination({ ...pagination, currentPage: currentPage + 1 });
              }
            }}
          >
            <span className="sr-only">Sonrası</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}
