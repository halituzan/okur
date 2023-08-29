import React, { useState } from "react";
import Pagination from "../booktable/Pagination";
import {
  ActivateStudent,
  DeActivateStudent,
  GetUsersWaitingForApproval,
} from "../../../helpers/users.helpers";
import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

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
  });
  const [userList, setUserList] = useState([]);
  const [tableHead, setTableHead] = useState([
    { id: 1, name: "Öğrenci Adı" },
    { id: 2, name: "Öğrenci Numarası" },
    { id: 3, name: null },
  ]);

  const approvalUserHandler = async () => {
    await GetUsersWaitingForApproval()
      .then((res) => {
        console.log(res);
        setUserList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const approveUser = async (student, type) => {
    console.log(student);

    if (type === "approve") {
      await ActivateStudent({ studentId: student.userId }).then(async (res) => {
        await approvalUserHandler();
        close();
      });
    }
    if (type === "decline") {
      await DeActivateStudent({ studentId: student.userId }).then(
        async (res) => {
          await approvalUserHandler();
          close();
        }
      );
    }
  };

  useEffect(() => {
    approvalUserHandler();
  }, []);

  return (
    <div>
      <div>
        <div className="p-4 dark:border-gray-700 mt-14 grid grid-cols-4">
          <div className="flex items-center border-2 px-3 ml-2 lg:col-span-3 col-span-5 mb-2">
            <input
              className="pl-2 outline-none border-none w-full"
              type="text"
              name="bookName"
              placeholder="Kitap adı veya yazar ile ara"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {}}
            />
          </div>
          <div className="flex justify-center items-center ml-2 lg:col-span-1 col-span-5 mb-2">
            <button
              type="button"
              className="flex lg:w-autopx-3 w-full bg-rose-500 text-white text-l py-2 font-bold px-3 justify-center items-center"
            >
              Öğrenci Ara
            </button>
          </div>
        </div>
        {pagination.totalPage > 0 ? (
          <div className="pagination mt-2 flex lg:justify-end justify-center">
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
              userList={userList}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="book-list">
        {userList && (
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
                {userList?.map((user) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={user.id}
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
