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

export { LoginHandler, RegisterHandler, AddTeacherHandler };
