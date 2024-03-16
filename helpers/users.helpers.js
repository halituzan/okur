import { toast } from "react-toastify";
import Network from "./Network";
////// ! Auth Sevices //////
const LoginHandler = async (body) => {

  try {
    const res = await Network.post("api/User/login", body);
    toast.success(res.message);
    return res;
  } catch (error) {
    console.log(error);

  }
};
const RegisterHandler = async (body) => {
  try {
    const res = await Network.post("api/User/register", body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {

  }
};
////// ! Auth Sevices //////

////// ! User Info Sevices //////
const GetMyInformation = async () => {
  try {
    const res = await Network.get("/api/User/GetMyInformation");
    return res.data;
  } catch (error) {

  }
};
////// ! User Info Sevices //////

////// TODO Student Activate/ Deactivate Sevices //////
const GetUsersWaitingForApproval = async (
  search = null,
  page = 0,
  size = 10
) => {
  try {
    const res = await Network.get(
      `api/User/GetUsersWaitingForApproval${search !== null ? `?Search=${search}&` : "?"
      }Pagination.PageNumber=${page}&Pagination.PageSize=${size}`
    );
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.Message);
  }
};
const ActivateStudent = async (body) => {
  try {
    const res = await Network.put("api/User/ActivateStudent", body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.Message);
  }
};
const DeActivateStudent = async (body) => {
  try {
    const res = await Network.put("api/User/DeactivateStudent", body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.Message);
  }
};

////// TODO Student Activate/ Deactivate Sevices //////

////// ? Teacher and Users Services //////
const AddTeacherHandler = async (body) => {
  try {
    const res = await Network.post("api/User/AddTeacher", body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.Message);
  }
};
const GetAllUsers = async (search = null, page = 0, size = 10) => {
  try {
    const res = await Network.get(
      `/api/User/GetAllUsers${search !== null ? `?Search=${search}&` : "?"
      }Pagination.PageNumber=${page}&Pagination.PageSize=${size}`
    );
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.Message);
  }
};

const EditUser = async (body) => {
  const res = await Network.put("/api/User/EditUser", body);
  toast.success(res.data.message);
  return res.data;
};

const ChangePassword = async (body) => {
  try {
    const res = await Network.put("/api/User/ChangePassword", body);

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.Message);
  }
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
