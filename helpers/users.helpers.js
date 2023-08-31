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
const GetUsersWaitingForApproval = async () => {
  return Network.get("api/User/GetUsersWaitingForApproval");
};
const ActivateStudent = async (body) => {
  return await Network.put("api/User/ActivateStudent", body);
};
const DeActivateStudent = async (body) => {
  return await Network.put("api/User/DeactivateStudent", body);
};
////// TODO Student Activate/ Deactivate Sevices //////

////// ? Teacher Services //////
const AddTeacherHandler = async (body) => {
  return await Network.post("api/User/AddTeacher", body);
};
const GetTeacherList = async () => {
  return "Servis Bekleniyor";
};
const UpdateTeacher = async () => {
  return "Servis Bekleniyor";
};
////// ? Teacher Services //////

export {
  LoginHandler,
  RegisterHandler,
  AddTeacherHandler,
  GetMyInformation,
  ActivateStudent,
  DeActivateStudent,
  GetUsersWaitingForApproval,
  GetTeacherList,
  UpdateTeacher,
};
