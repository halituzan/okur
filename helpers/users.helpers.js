import { toast } from "react-toastify";
import Network from "./Network";

////// ! Auth Sevices //////
const LoginHandler = async (body) => {
  const res = await Network.post("api/User/login", body);
  return res;
};
const RegisterHandler = async (body) => {
  await Network.post("api/User/register", body)
    .then((res) => {
      toast.success("Kayıt Başarılı");
    })
    .catch((err) => console.log(err));
};
////// ! Auth Sevices //////

const AddTeacherHandler = async (body, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  await Network.post("api/User/register", body, { headers });
};

const GetMyInformation = async () => {
  return await Network.get("/api/User/GetMyInformation");
};

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

export {
  LoginHandler,
  RegisterHandler,
  AddTeacherHandler,
  GetMyInformation,
  ActivateStudent,
  DeActivateStudent,
  GetUsersWaitingForApproval
};
