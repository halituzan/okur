import { toast } from "react-toastify";
import Network from "./Network";
////// ! Get Sevices //////
const GetAvailableBooks = async (
  search = null,
  page = 0,
  size = 10,
  type = false
) => {
  try {
    if (!type) {
      const res = await Network.get(
        `api/Book/GetAvailableBooks${
          search !== null ? `?Search=${search}` : "?"
        }&Pagination.PageNumber=${page}&Pagination.PageSize=${size}`
      );
      return res.data;
    } else {
      const res = await Network.get(
        `api/Book/GetAvailableBooks${
          search !== null ? `?Search=${search}&` : "?"
        }Pagination.PageNumber=${page}&Pagination.PageSize=${size}&isAvailable=true`
      );
      return res.data;
    }
  } catch (error) {
    toast.error(error.response.data.Message);
  }
};
const GetMyBooks = async () => {
  try {
    const res = await Network.get("api/Book/GetMyBooks");
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.Message);
  }
};
const GetBookWithId = async (id) => {
  try {
    const res = await Network.get(`api/Book/${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.Message);
  }
};
const GetBooksWaitingForApproval = async (
  search = null,
  page = 0,
  size = 10
) => {
  try {
    const res = await Network.get(
      `/api/Book/GetBooksWaitingForApproval${
        search !== null ? `?Search=${search}&` : "?"
      }Pagination.PageNumber=${page}&Pagination.PageSize=${size}`
    );
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.Message);
  }
};
const GetBookRequests = async () => {
  try {
    const res = await Network.get("api/Book/GetBookRequests");
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.Message);
  }
};
const GetBooksIRead = async () => {
  try {
    const res = await Network.get("api/Book/GetBooksIRead");
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.Message);
  }
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
  try {
    const res = await Network.post("api/Book", body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.Message);
  }
};
const RequestBook = async (id) => {
  try {
    const res = await Network.post(`api/Book/RequestBook?bookId=${id}`);
    console.log(res);

    toast.success(res.message);
    await GetAvailableBooks();
  } catch (error) {
    toast.success(error.response?.data.Message);
  }
};
const AcceptBookRequest = async (id) => {
  try {
    const res = await Network.post(`api/Book/AcceptBookRequest?bookId=${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.success(error.response.data.Message);
  }
};
const DeclineBookRequest = async (id) => {
  try {
    const res = await Network.post(`api/Book/DeclineBookRequest?bookId=${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.success(error.response.data.Message);
  }
};
const BookBorrowed = async (id) => {
  try {
    const res = await Network.post(`/api/Book/BookBorrowed?bookId=${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.success(error.response.data.Message);
  }
};
const BookReturned = async (id) => {
  try {
    const res = await Network.post(`/api/Book/BookReturned?bookId=${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.success(error.response.data.Message);
  }
};

////// ? Post Sevices //////

////// TODO Put Sevices //////

const ApproveBook = async (body) => {
  try {
    const res = await Network.put("api/Book/ApproveBook", body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.success(error.response.data.Message);
  }
};
const DeclineBook = async (body) => {
  try {
    const res = await Network.put("api/Book/ApproveBook", body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.success(error.response.data.Message);
  }
};

const UpdateBook = async (body) => {
  try {
    const res = await Network.put("api/Book/UpdateBook", body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.success(error.response.data.Message);
  }
};

////// TODO Put Sevices //////

////// ? Delete Sevices //////
const deleteBook = async (id) => {
  try {
    const res = await Network.delete(`api/book/${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.success(error.response.data.Message);
  }
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
