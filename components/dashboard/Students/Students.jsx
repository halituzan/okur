import React, { useState } from "react";

import {
  GetBooksWaitingForApproval,
  ApproveBook,
  DeclineBook,
} from "../../../helpers/books.helpers";
import { IoIosArrowDown } from "react-icons/io";

import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { NativeSelect, Pagination } from "@mantine/core";
import svgData from "../../../svgData";
import { PiChalkboardTeacherDuotone, PiStudentDuotone } from "react-icons/pi";
import Modal from "../../Modal";
import { BsPersonAdd, BsPostcard } from "react-icons/bs";

const Students = () => {
  const { searchIcon } = svgData;
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [student, setStudent] = useState({
    name: "",
    surname: "",
    studentNumber: "",
  });
  const [currentStudentValue, setCurrentStudentValue] = useState({
    name: "",
    surname: "",
    studentNumber: "",
  });
  const [pagination, setPagination] = useState({
    totalPage: 0,
    currentPage: 0,
    perPage: 10,
  });

  const [teacherList, setBookList] = useState([]);
  const [tableHead, setTableHead] = useState([
    { id: 1, name: "Adı" },
    { id: 2, name: "Soyadı" },
    { id: 3, name: "Numarası" },
    { id: 4, name: null },
  ]);

  const handleKeyDown = (e) => {
    if (search.length > 2) {
      if (e.key === "Enter") {
        approvalBooksSearchHandler(search);
      }
    }
  };
  const approvalBooksHandler = async () => {
    await GetBooksWaitingForApproval()
      .then((res) => {
        setBookList(res.data.resultList);
        setPagination({
          ...pagination,
          totalPage: Math.ceil(res?.data?.totalCount / pagination.perPage),
        });
      })
      .catch((err) => console.log(err));
  };
  const approvalBooksPaginationHandler = async () => {
    await GetBooksWaitingForApproval(
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
  const approvalBooksSearchHandler = async (search) => {
    await GetBooksWaitingForApproval(search, 0, pagination.perPage)
      .then((res) => {
        setBookList(res.data.resultList);
        setPagination({
          ...pagination,
          totalPage: Math.ceil(res?.data?.totalCount / pagination.perPage),
        });
      })
      .catch((err) => console.log(err));
  };

  const approveBook = async (book, type) => {
    if (type === "approve") {
      await ApproveBook({ bookId: book.id }).then(async (res) => {
        await approvalBooksHandler().then(async (res) => {
          approvalBooksPaginationHandler();
          setPagination({ ...pagination, currentPage: 0 });
        });
      });
    }
    if (type === "decline") {
      await DeclineBook({ bookId: book.id }).then(async (res) => {
        await approvalBooksHandler().then(async (res) => {
          approvalBooksPaginationHandler();
          setPagination({ ...pagination, currentPage: 0 });
        });
      });
    }
  };

  useEffect(() => {
    approvalBooksHandler();
  }, []);

  useEffect(() => {
    approvalBooksPaginationHandler();
  }, [pagination.perPage, pagination.currentPage]);

  return (
    <div>
      <div>
        <div className="p-4 flex items-center dark:border-gray-700 mt-14">
          <div className="w-2/3">
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
                placeholder="Öğrenci Arayın"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value === "") {
                    setPagination({ ...pagination, currentPage: 0 });
                    approvalBooksHandler();
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
                onClick={() => approvalBooksSearchHandler(search)}
              >
                Ara
              </button>
            </div>
          </div>
          <div className="flex justify-end items-center px-3 ml-2 lg:col-span-3 col-span-5 w-1/3">
            <button
              type="button"
              className=" w-full px-3 bg-rose-500 text-white text-l mt-0 p-3 font-bold flex justify-center items-center self-end"
              onClick={() => setShowAddModal(true)}
            >
              <PiChalkboardTeacherDuotone className="text-2xl mr-2" />
              Öğrenci Ekle
            </button>
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
        {teacherList && (
          <div className="relative overflow-x-auto flex flex-col">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {tableHead.map((i) => {
                    return (
                      <th scope="col" className="px-2 py-3" key={i.id}>
                        {i.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {teacherList?.map((student, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={student.id}
                  >
                    <td
                      scope="row"
                      className="px-2  font-medium text-gray-900  dark:text-white"
                    >
                      {student.name}
                    </td>

                    <td className="px-2">{student.author}</td>
                    <td className="px-2">{student.schoolNumber}</td>
                    <td className="px-2 flex justify-end items-center pr-0">
                      <button
                        type="button"
                        className="px-3 bg-rose-500 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center mr-2"
                        onClick={() => {
                          setShowEditModal(true);
                          setCurrentStudentValue({
                            name: student.name,
                            surname: student.surname,
                            schoolNumber: student.schoolNumber,
                          });
                        }}
                      >
                        Düzenle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Öğrenci Ekleme Modalı */}

      {
        <Modal
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          body={
            <div className="relative p-6 flex flex-col sm:flex-row">
              <div className="flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-1/3 w-full">
                <PiStudentDuotone
                  className={
                    student.name ? "text-2xl fill-green-600" : "text-2xl"
                  }
                />
                <input
                  className="pl-2 outline-none border-none w-full"
                  type="text"
                  name="name"
                  placeholder="Öğrenci Adı"
                  value={student.name}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-1/3 w-full">
                {/* Yazar İconu */}
                <PiStudentDuotone
                  className={
                    student.surname ? "text-2xl fill-green-600" : "text-2xl"
                  }
                />
                <input
                  className="pl-2 outline-none border-none w-full"
                  type="text"
                  name="surname"
                  placeholder="Öğrenci Soyadı"
                  value={student.surname}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      surname: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-1/3 w-full">
                {/* Yazar İconu */}
                <BsPostcard
                  className={
                    student.schoolNumber
                      ? "text-2xl fill-green-600"
                      : "text-2xl"
                  }
                />
                <input
                  className="pl-2 outline-none border-none w-full"
                  type="text"
                  name="surname"
                  placeholder="Öğrenci Numarası"
                  value={student.schoolNumber}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      schoolNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          }
          footer={
            <div className="flex justify-center">
              <button
                className="p-2 bg-gray-600 rounded-lg mx-2 w-20 my-2 text-white hover:bg-gray-700"
                onClick={() => setShowAddModal(false)}
              >
                İptal
              </button>
              <button
                className="p-2 bg-rose-600 rounded-lg mx-2 w-20 my-2 text-white hover:bg-rose-700"
                onClick={() => approveBook(currentBook.book, currentBook.type)}
              >
                Kaydet
              </button>
            </div>
          }
          setAddBookValue={""}
          title={"Öğrenci Ekleme"}
        />
      }
      {/* Öğrenci Düzenleme Modalı */}

      {
        <Modal
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          body={
            <div className="relative p-6 flex flex-col sm:flex-row">
              <div className="flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-1/3 w-full">
                <PiStudentDuotone
                  className={
                    currentStudentValue.name
                      ? "text-2xl fill-green-600"
                      : "text-2xl"
                  }
                />
                <input
                  className="pl-2 outline-none border-none w-full"
                  type="text"
                  name="name"
                  placeholder="Öğrenci Adı"
                  value={currentStudentValue.name}
                  onChange={(e) =>
                    setCurrentTeacherValue({
                      ...currentStudentValue,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-1/3 w-full">
                {/* Yazar İconu */}
                <PiStudentDuotone
                  className={
                    currentStudentValue.surname
                      ? "text-2xl fill-green-600"
                      : "text-2xl"
                  }
                />
                <input
                  className="pl-2 outline-none border-none w-full"
                  type="text"
                  name="surname"
                  placeholder="Öğrenci Soyadı"
                  value={currentStudentValue.surname}
                  onChange={(e) =>
                    setCurrentTeacherValue({
                      ...currentStudentValue,
                      surname: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-1/3 w-full">
                {/* Yazar İconu */}
                <BsPostcard
                  className={
                    currentStudentValue.schoolNumber
                      ? "text-2xl fill-green-600"
                      : "text-2xl"
                  }
                />
                <input
                  className="pl-2 outline-none border-none w-full"
                  type="text"
                  name="surname"
                  placeholder="Öğrenci Numarası"
                  value={currentStudentValue.schoolNumber}
                  onChange={(e) =>
                    setCurrentTeacherValue({
                      ...currentStudentValue,
                      schoolNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          }
          footer={
            <div className="flex justify-center">
              <button
                className="p-2 bg-gray-600 rounded-lg mx-2 w-20 my-2 text-white hover:bg-gray-700"
                onClick={() => setShowEditModal(false)}
              >
                İptal
              </button>
              <button
                className="p-2 bg-rose-600 rounded-lg mx-2 w-20 my-2 text-white hover:bg-rose-700"
                onClick={() => approveBook(currentBook.book, currentBook.type)}
              >
                Kaydet
              </button>
            </div>
          }
          setAddBookValue={""}
          title={"Öğrenci Düzenleme"}
        />
      }
    </div>
  );
};

export default Students;
