import Network from "./Network";
////// ! Get Sevices //////
const GetAvailableBooks = async (setterFunc, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  await Network.get("api/Book/GetAvailableBooks", { headers })
    .then((res) => {
      if (res.success) {
        setterFunc(res.data);
      }
    })
    .catch((err) => console.log(err));
};
const GetMyBooks = async (setterFunc, token) => {
  const headers = { Authorization: `Bearer ${token}` };
  await Network.get("api/Book/GetMyBooks", { headers })
    .then((res) => {
      if (res.success) {
        setterFunc(res.data);
      }
    })
    .catch((err) => console.log(err));
};
const GetBookWithId = async (setterFunc, token, id) => {
  const headers = { Authorization: `Bearer ${token}` };
  await Network.get(`api/Book/${id}`, { headers })
    .then((res) => {
      if (res.success) {
        setterFunc(res.data);
      }
    })
    .catch((err) => console.log(err));
};
////// ! Post Sevices //////

////// ? Post Sevices //////
const PostBookWithId = async (setterFunc, token, body) => {
  const { name, author } = body;

  const headers = { Authorization: `Bearer ${token}` };
  await Network.post("api/Book", { name, author }, { headers }).then((res) => {
    if (res.success) {
      setterFunc(res.data);
    }
  });
};
////// ? Post Sevices //////

export { GetAvailableBooks, GetMyBooks, GetBookWithId, PostBookWithId };
