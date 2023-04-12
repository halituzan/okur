import axios from "axios";
export const loginUser = async (log) => {
  const { data } = await axios.get(
    `https://${process.env.NEXT_PUBLIC_USERS_MOCK_API}.mockapi.io/users?studentId=${log.studentId}`
  );

  localStorage.setItem("bookyId", JSON.stringify(data[0]));
  return data[0];
};
