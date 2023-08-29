import Network from "./Network";
////// ! Get Sevices //////
const GetAvailableBooks = async (search = null, page = 0, size = 10) => {
  return await Network.get(
    `api/Book/GetAvailableBooks${
      search !== null ? `?Search=${search}` : "?"
    }&Pagination.PageNumber=${page}&Pagination.PageSize=${size}`
  );
};
const GetMyBooks = async () => {
  return await Network.get("api/Book/GetMyBooks");
};
const GetBookWithId = async (id) => {
  return await Network.get(`api/Book/${id}`);
};
const GetBooksWaitingForApproval = async (
  search = null,
  page = 0,
  size = 10
) => {
  return await Network.get(
    `/api/Book/GetBooksWaitingForApproval${
      search !== null ? `?Search=${search}&` : "?"
    }Pagination.PageNumber=${page}&Pagination.PageSize=${size}`
  );
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
const PostAddBook = async (body) => {
  return await Network.post("api/Book", body);
};
////// ? Post Sevices //////

////// TODO Put Sevices //////

const ApproveBook = async (body) => {
  return await Network.put("api/Book/ApproveBook", body);
};
const DeclineBook = async (body) => {
  return await Network.put("api/Book/ApproveBook", body);
};

////// TODO Put Sevices //////

////// ? Delete Sevices //////
const deleteBook = async (id) => {
  return await Network.delete(`api/book/${id}`);
};
////// ? Delete Sevices //////

export {
  GetAvailableBooks,
  GetMyBooks,
  GetBookWithId,
  PostBookWithId,
  PostAddBook,
  GetBooksWaitingForApproval,
  ApproveBook,
  DeclineBook,
  deleteBook
};
