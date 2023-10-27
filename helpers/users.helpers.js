import { toast } from "react-toastify";
import Network from "./Network";
////// ! Auth Sevices //////
const LoginHandler = async (body) => {
  return await Network.post("api/User/login", body);
};
const RegisterHandler = async (body) => {
  return await Network.post("api/User/register", body);
};
////// ! Auth Sevices //////

////// ! User Info Sevices //////
const GetMyInformation = async () => {
  return await Network.get("/api/User/GetMyInformation");
};
////// ! User Info Sevices //////

////// TODO Student Activate/ Deactivate Sevices //////
const GetUsersWaitingForApproval = async (
  search = null,
  page = 0,
  size = 10
) => {
  return Network.get(
    `api/User/GetUsersWaitingForApproval${
      search !== null ? `?Search=${search}&` : "?"
    }Pagination.PageNumber=${page}&Pagination.PageSize=${size}`
  );
};
const ActivateStudent = async (body) => {
  return await Network.put("api/User/ActivateStudent", body);
};
const DeActivateStudent = async (body) => {
  return await Network.put("api/User/DeactivateStudent", body);
};

////// TODO Student Activate/ Deactivate Sevices //////

////// ? Teacher and Users Services //////
const AddTeacherHandler = async (body) => {
  return await Network.post("api/User/AddTeacher", body);
};
const GetAllUsers = async (search = null, page = 0, size = 10) => {
  return Network.get(
    `/api/User/GetAllUsers${
      search !== null ? `?Search=${search}&` : "?"
    }Pagination.PageNumber=${page}&Pagination.PageSize=${size}`
  );
};

const EditUser = async (body) => {
  const res = await Network.put("/api/User/EditUser", body);
  toast.success(res.message);
  return res;
};

const ChangePassword = async (body) => {
  const res = await Network.put("/api/User/ChangePassword", body);
  console.log(res);

  if (res.status) {
    toast.success(res.message);
  } else {
    toast.error(res.Message);
  }

  return res;
};

////// ? Teacher and Users Services //////

export {
  LoginHandler,
  RegisterHandler,
  AddTeacherHandler,
  GetMyInformation,
  ActivateStudent,
  DeActivateStudent,
  GetUsersWaitingForApproval,
  GetAllUsers,
  EditUser,
  ChangePassword,
};
