import { toast } from "react-toastify";
import Network from "./Network";
////// ! Get Sevices //////
const GetAvailableBooks = async (
  search = null,
  page = 0,
  size = 10,
  type = false
) => {
  if (!type) {
    return await Network.get(
      `api/Book/GetAvailableBooks${
        search !== null ? `?Search=${search}` : "?"
      }&Pagination.PageNumber=${page}&Pagination.PageSize=${size}`
    );
  } else {
    return await Network.get(
      `api/Book/GetAvailableBooks${
        search !== null ? `?Search=${search}&` : "?"
      }Pagination.PageNumber=${page}&Pagination.PageSize=${size}&isAvailable=true`
    );
  }
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
const GetBookRequests = async () => {
  try {
    const res = await Network.get("api/Book/GetBookRequests");
    return res;
  } catch (error) {}
};
const GetBooksIRead = async () => {
  try {
    const res = await Network.get("api/Book/GetBooksIRead");
    return res;
  } catch (error) {}
};
////// ! Post Sevices //////

////// ? Post Sevices //////
// const PostBookWithId = async (setterFunc, token, body) => {
//   const { name, author } = body;
//   await Network.post("api/Book", { name, author }).then((res) => {
//     if (res.success) {
//       setterFunc(res.data);
//     }
//   });
// };
const PostAddBook = async (body) => {
  const res = await Network.post("api/Book", body);
  toast.success(res.message);
  return res;
};
const RequestBook = async (id) => {
  try {
    const res = await Network.post(`api/Book/RequestBook?bookId=${id}`);
    if (res.success) {
      toast.success(res.message);
      await GetAvailableBooks();
    }
  } catch (error) {
    console.log(error);
  }
};
const AcceptBookRequest = async (id) => {
  const res = await Network.post(`api/Book/AcceptBookRequest?bookId=${id}`);
  toast.success(res.message);
  return res;
};
const DeclineBookRequest = async (id) => {
  const res = await Network.post(`api/Book/DeclineBookRequest?bookId=${id}`);
  toast.success(res.message);
  return res;
};
const BookBorrowed = async (id) => {
  const res = await Network.post(`/api/Book/BookBorrowed?bookId=${id}`);
  toast.success(res.message);
  return res;
};
const BookReturned = async (id) => {
  const res = await Network.post(`/api/Book/BookReturned?bookId=${id}`);
  toast.success(res.message);
  return res;
};

////// ? Post Sevices //////

////// TODO Put Sevices //////

const ApproveBook = async (body) => {
  return await Network.put("api/Book/ApproveBook", body);
};
const DeclineBook = async (body) => {
  return await Network.put("api/Book/ApproveBook", body);
};

const UpdateBook = async (body) => {
  return await Network.put("api/Book/UpdateBook", body);
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
  // PostBookWithId,
  PostAddBook,
  GetBooksWaitingForApproval,
  ApproveBook,
  DeclineBook,
  deleteBook,
  UpdateBook,
  RequestBook,
  GetBookRequests,
  AcceptBookRequest,
  DeclineBookRequest,
  BookBorrowed,
  BookReturned,
  GetBooksIRead,
};
