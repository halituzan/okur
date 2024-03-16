import React, { useState, useEffect } from "react";
import { ApproveBook, DeclineBook } from "../../../helpers/books.helpers";
import { AddTeacherHandler, GetAllUsers } from "../../../helpers/users.helpers";

import { IoIosArrowDown } from "react-icons/io";
import { BsPersonAdd } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { PiPasswordBold } from "react-icons/pi";

import { PiChalkboardTeacherDuotone } from "react-icons/pi";
import Modal from "../../Modal";
import { useDisclosure } from "@mantine/hooks";
import { NativeSelect, Pagination } from "@mantine/core";

import svgData from "../../../svgData";

const Users = () => {
  const { searchIcon } = svgData;
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [teacher, setTeacher] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    schoolNumber: "",
  });
  const [currentTeacherValue, setCurrentTeacherValue] = useState({
    name: "",
    surname: "",
  });
  const [opened, { close, open }] = useDisclosure(false);
  const [pagination, setPagination] = useState({
    totalPage: 0,
    currentPage: 0,
    perPage: 10,
  });

  const [userList, serUserList] = useState([]);
  const [tableHead, setTableHead] = useState([
    { id: 1, name: "Adı" },
    { id: 2, name: "Soyadı" },
    { id: 3, name: "Email" },
    { id: 4, name: "Okul Numarası" },
    { id: 5, name: "Kullanıcı Tipi" },
    { id: 6, name: null },
  ]);

  const handleKeyDown = (e) => {
    if (search.length > 2) {
      if (e.key === "Enter") {
        allUsersSearchHandler(search);
      }
    }
  };
  const allUsers = async () => {
    await GetAllUsers()
      .then((res) => {
        serUserList(res.resultList);
        setPagination({
          ...pagination,
          totalPage: Math.ceil(res?.totalCount / pagination.perPage),
        });
      })
      .catch((err) => console.log(err));
  };
  const allUsersPaginationHandler = async () => {
    await GetAllUsers(
      search ? search : null,
      pagination.currentPage,
      pagination.perPage
    )
      .then((res) => {
        serUserList(res.resultList);
        setPagination({
          ...pagination,
          totalPage: Math.ceil(res?.totalCount / pagination.perPage),
        });
      })
      .catch((err) => console.log(err));
  };
  const allUsersSearchHandler = async (search) => {
    await GetAllUsers(search, 0, pagination.perPage)
      .then((res) => {
        serUserList(res.resultList);
        setPagination({
          ...pagination,
          totalPage: Math.ceil(res?.totalCount / pagination.perPage),
        });
      })
      .catch((err) => console.log(err));
  };

  // const approveBook = async (book, type) => {
  //   if (type === "approve") {
  //     await ApproveBook({ bookId: book.id }).then(async (res) => {
  //       await allUsers().then(async (res) => {
  //         allUsersPaginationHandler();
  //         setPagination({ ...pagination, currentPage: 0 });
  //       });
  //       close();
  //     });
  //   }
  //   if (type === "decline") {
  //     await DeclineBook({ bookId: book.id }).then(async (res) => {
  //       await allUsers().then(async (res) => {
  //         allUsersPaginationHandler();
  //         setPagination({ ...pagination, currentPage: 0 });
  //       });

  //       close();
  //     });
  //   }
  // };

  const addTeacher = async () => {
    await AddTeacherHandler(teacher).then((res) => {
      setShowAddModal(false);
    });
  };

  useEffect(() => {
    allUsers();
  }, []);

  useEffect(() => {
    allUsersPaginationHandler();
  }, [pagination.perPage, pagination.currentPage]);

  return (
    <div>
      <div>
        <div className='p-4 flex items-center dark:border-gray-700 mt-14'>
          <div className='w-2/3'>
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
                placeholder='Kullanıcı Arayın'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value === "") {
                    setPagination({ ...pagination, currentPage: 0 });
                    allUsers();
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
                onClick={() => allUsersSearchHandler(search)}
              >
                Ara
              </button>
            </div>
          </div>
          <div className='flex justify-end items-center px-3 ml-2 lg:col-span-3 col-span-5 w-1/3'>
            <button
              type='button'
              className=' w-full px-3 bg-rose-500 text-white text-l mt-0 p-3 font-bold flex justify-center items-center self-end'
              onClick={() => setShowAddModal(true)}
            >
              <PiChalkboardTeacherDuotone className='text-2xl mr-2' />
              Öğretmen Ekle
            </button>
          </div>
        </div>
        {pagination.totalPage > 0 && (
          <div className='pagination flex flex-row justify-between w-full gap-10 my-5'>
            <NativeSelect
              data={["10", "20", "50", "100"]}
              label='Kişi Sayısı'
              variant='filled'
              styles={{ height: "auto" }}
              rightSection={<IoIosArrowDown />}
              icon={null}
              onChange={(e) =>
                setPagination({ ...pagination, perPage: e.currentTarget.value })
              }
            />
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

      <div className='book-list'>
        {userList && (
          <div className='relative overflow-x-auto flex flex-col'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  {tableHead.map((i) => {
                    return (
                      <th scope='col' className='px-2 py-3' key={i.id}>
                        {i.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {userList?.map((user, index) => (
                  <tr
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                    key={user.id}
                  >
                    <th
                      scope='row'
                      className='px-2  font-medium text-gray-900  dark:text-white'
                    >
                      {user.name}
                    </th>

                    <td className='px-2'>{user.surname}</td>
                    <td className='px-2'>{user.email}</td>
                    <td className='px-2'>{user.schoolNumber}</td>
                    <td className='px-2'>
                      {user.userType === 0 ? "Öğretmen" : "Öğrenci"}
                    </td>
                    <td className='px-2 flex justify-end items-center pr-0'>
                      <button
                        type='button'
                        className='px-3 bg-rose-500 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center mr-2'
                        onClick={() => {
                          setShowEditModal(true);
                          setCurrentTeacherValue({
                            name: user.name,
                            surname: user.surname,
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

      {/* Öğretmen Ekleme Modalı */}

      {
        <Modal
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          footer={
            <div className='flex justify-center'>
              <button
                className='p-2 bg-gray-600 rounded-lg mx-2 w-20 my-2 text-white hover:bg-gray-700'
                onClick={() => setShowAddModal(false)}
              >
                İptal
              </button>
              <button
                className='p-2 bg-rose-600 rounded-lg mx-2 w-20 my-2 text-white hover:bg-rose-700'
                onClick={() => addTeacher()}
              >
                Kaydet
              </button>
            </div>
          }
          setAddBookValue={""}
          title={"Öğretmen Ekleme"}
        >
          <div className='relative p-6 flex flex-col'>
            <div className='flex items-start w-full'>
              <div className='flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-1/2 w-full'>
                <BsPersonAdd
                  className={
                    teacher.name ? "text-2xl fill-green-600" : "text-2xl"
                  }
                />
                <input
                  className='pl-2 outline-none border-none w-full'
                  type='text'
                  name='name'
                  placeholder='Adı'
                  value={teacher.name}
                  onChange={(e) =>
                    setTeacher({
                      ...teacher,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className='flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-1/2 w-full'>
                {/* Yazar İconu */}
                <BsPersonAdd
                  className={
                    teacher.surname ? "text-2xl fill-green-600" : "text-2xl"
                  }
                />
                <input
                  className='pl-2 outline-none border-none w-full'
                  type='text'
                  name='surname'
                  placeholder='Soyadı'
                  value={teacher.surname}
                  onChange={(e) =>
                    setTeacher({
                      ...teacher,
                      surname: e.target.value,
                    })
                  }
                />
              </div>
              <div className='flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-1/2 w-full'>
                {/* Yazar İconu */}
                <MdOutlineEmail
                  className={
                    teacher.email ? "text-2xl fill-green-600" : "text-2xl"
                  }
                />
                <input
                  className='pl-2 outline-none border-none w-full'
                  type='email'
                  name='email'
                  placeholder='Eposta'
                  value={teacher.email}
                  onChange={(e) =>
                    setTeacher({
                      ...teacher,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className='flex items-start'>
              <div className='flex items-center border-2 mx-2 py-4 px-3 rounded-2xl mb-4 sm:w-1/2 w-full'>
                {/* Yazar İconu */}
                <FaRegAddressCard
                  className={
                    teacher.schoolNumber
                      ? "text-2xl fill-green-600"
                      : "text-2xl"
                  }
                />
                <input
                  className='pl-2 outline-none border-none w-full'
                  type='schoolNumber'
                  name='password'
                  placeholder='Okul Numarası'
                  value={teacher.schoolNumber}
                  onChange={(e) =>
                    setTeacher({
                      ...teacher,
                      schoolNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className='flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-1/2 w-full'>
                {/* Yazar İconu */}
                <PiPasswordBold
                  className={
                    teacher.password ? "text-2xl fill-green-600" : "text-2xl"
                  }
                />
                <input
                  className='pl-2 outline-none border-none w-full'
                  type='password'
                  name='password'
                  placeholder='Şifre'
                  value={teacher.password}
                  onChange={(e) =>
                    setTeacher({
                      ...teacher,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </Modal>
      }
      {/* Öğretmen Düzenleme Modalı */}

      {
        <Modal
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          body={
            <div className='relative p-6 flex flex-col sm:flex-row'>
              <div className='flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-1/2 w-full'>
                <BsPersonAdd
                  className={
                    currentTeacherValue.name
                      ? "text-2xl fill-green-600"
                      : "text-2xl"
                  }
                />
                <input
                  className='pl-2 outline-none border-none w-full'
                  type='text'
                  name='name'
                  placeholder='Öğretmen Adı'
                  value={currentTeacherValue.name}
                  onChange={(e) =>
                    setCurrentTeacherValue({
                      ...currentTeacherValue,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className='flex items-center border-2 mx-2 py-2 px-3 rounded-2xl mb-4 sm:w-1/2 w-full'>
                {/* Yazar İconu */}
                <BsPersonAdd
                  className={
                    currentTeacherValue.surname
                      ? "text-2xl fill-green-600"
                      : "text-2xl"
                  }
                />
                <input
                  className='pl-2 outline-none border-none w-full'
                  type='text'
                  name='surname'
                  placeholder='Öğretmen Soyadı'
                  value={currentTeacherValue.surname}
                  onChange={(e) =>
                    setCurrentTeacherValue({
                      ...currentTeacherValue,
                      surname: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          }
          footer={
            <div className='flex justify-center'>
              <button
                className='p-2 bg-gray-600 rounded-lg mx-2 w-20 my-2 text-white hover:bg-gray-700'
                onClick={() => setShowEditModal(false)}
              >
                İptal
              </button>
              <button
                className='p-2 bg-rose-600 rounded-lg mx-2 w-20 my-2 text-white hover:bg-rose-700'
                onClick={() => approveBook(currentBook.book, currentBook.type)}
              >
                Kaydet
              </button>
            </div>
          }
          setAddBookValue={""}
          title={"Öğretmen Düzenleme"}
        />
      }
    </div>
  );
};

export default Users;
