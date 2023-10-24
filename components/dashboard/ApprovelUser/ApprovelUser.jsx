import React, { useState } from "react";
import {
  ActivateStudent,
  DeActivateStudent,
  GetUsersWaitingForApproval,
} from "../../../helpers/users.helpers";
import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, NativeSelect, Pagination } from "@mantine/core";
import { IoIosArrowDown } from "react-icons/io";
import svgData from "../../../svgData";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const ApprovelUser = () => {
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState({
    user: null,
    type: "",
  });
  const [opened, { close, open }] = useDisclosure(false);
  const [pagination, setPagination] = useState({
    totalPage: 0,
    currentPage: 0,
    perPage: 10,
  });

  const [userList, setUserList] = useState([]);
  const [tableHead, setTableHead] = useState([
    { id: 1, name: "Öğrenci Adı" },
    { id: 2, name: "Öğrenci Numarası" },
    { id: 3, name: null },
  ]);

  const { searchIcon } = svgData;

  const handleKeyDown = (e) => {
    if (search.length > 2) {
      if (e.key === "Enter") {
        approvalUsersSearchHandler(search);
      }
    }
  };
  const approvalUsersSearchHandler = async (search) => {
    await GetUsersWaitingForApproval(search, 0, pagination.perPage)
      .then((res) => {
        setUserList(res.data.resultList);
        setPagination({
          ...pagination,
          totalPage: Math.ceil(res?.data?.totalCount / pagination.perPage),
        });
      })
      .catch((err) => console.log(err));
  };
  const approvalUsersPaginationHandler = async () => {
    await GetUsersWaitingForApproval(
      search ? search : null,
      pagination.currentPage,
      pagination.perPage
    )
      .then((res) => {
        setUserList(res.data.resultList);
        setPagination({
          ...pagination,
          totalPage: Math.ceil(res?.data?.totalCount / pagination.perPage),
        });
      })
      .catch((err) => console.log(err));
  };

  const approvalUserHandler = async () => {
    await GetUsersWaitingForApproval()
      .then((res) => {
        setUserList(res.data.resultList);
        setPagination({
          ...pagination,
          totalPage: Math.ceil(res?.data?.totalCount / pagination.perPage),
        });
      })
      .catch((err) => console.log(err));
  };

  const approveUser = async (student, type) => {
    if (type === "approve") {
      await ActivateStudent({ studentId: student.userId }).then(async () => {
        await approvalUserHandler().then(async () => {
          approvalUsersPaginationHandler();
          setPagination({ ...pagination, currentPage: 0 });
        });
        close();
      });
    }
    if (type === "decline") {
      await DeActivateStudent({ studentId: student.userId }).then(async () => {
        await approvalUserHandler().then(async () => {
          approvalUsersPaginationHandler();
          setPagination({ ...pagination, currentPage: 0 });
        });
        close();
      });
    }
  };

  useEffect(() => {
    approvalUsersPaginationHandler();
  }, []);
  useEffect(() => {
    approvalUsersPaginationHandler();
  }, [pagination.perPage, pagination.currentPage]);
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
                    approvalUserHandler();
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
                onClick={() => approvalUsersSearchHandler(search)}
              >
                Ara
              </button>
            </div>
          </div>
        </div>
        {pagination.totalPage > 0 ? (
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
        ) : (
          ""
        )}
      </div>

      <div className="book-list m-4">
        {userList.length > 0 ? (
          <div className="relative overflow-x-auto flex flex-col">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {tableHead.map((i, index) => {
                    return (
                      <th scope="col" className="px-2 py-3" key={index}>
                        {i.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {userList?.map((user, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="px-2  font-medium text-gray-900  dark:text-white"
                    >
                      {user.name + " " + user.surname}
                    </th>
                    <td className="px-2">{user.schoolNumber}</td>
                    <td className="px-2 flex justify-end items-center pr-0">
                      <button
                        type="button"
                        className="px-3 bg-gray-500 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center mr-2"
                        onClick={() => {
                          open();
                          setCurrentUser({
                            ...currentUser,
                            user: user,
                            type: "decline",
                          });
                        }}
                      >
                        Reddet
                      </button>
                      <button
                        type="button"
                        className="px-3 bg-rose-500 text-white text-l mt-4 py-2  font-bold mb-2 flex justify-center items-center "
                        onClick={() => {
                          open();
                          setCurrentUser({
                            ...currentUser,
                            user: user,
                            type: "approve",
                          });
                        }}
                      >
                        Onayla
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col col-span-1 items-center justify-center text-center h-24 rounded font-bold text-gray-400 bg-gray-50">
            <span className="mb-2 flex items-center text-rose-500/80 ">
              <AiOutlineExclamationCircle size={20} className="text-xl mr-2" />{" "}
              Onaylanacak herhangi bir kullanıcı bulunmuyor
            </span>
          </div>
        )}
      </div>

      {currentUser.user && (
        <Modal opened={opened} onClose={close} title="Kitap Onayı">
          <div className="text-center">
            <span className="font-bold">
              {" "}
              {currentUser?.user?.name + " " + currentUser?.user?.surname}
            </span>{" "}
            {currentUser?.type === "approve"
              ? "adlı öğrenciyi onaylamak istediğinize emin misiniz?"
              : "adlı öğrenciyi reddetmek istediğinize emin misiniz?"}
          </div>
          <div className="flex justify-center">
            <button
              className="p-2 bg-gray-600 rounded-lg mx-2 w-20 my-2 text-white hover:bg-gray-700"
              onClick={close}
            >
              Hayır
            </button>
            <button
              className="p-2 bg-rose-600 rounded-lg mx-2 w-20 my-2 text-white hover:bg-rose-700"
              onClick={() => approveUser(currentUser?.user, currentUser?.type)}
            >
              Evet
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ApprovelUser;
