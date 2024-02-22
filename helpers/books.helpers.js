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
        `api/Book/GetAvailableBooks${search !== null ? `?Search=${search}` : "?"
        }&Pagination.PageNumber=${page}&Pagination.PageSize=${size}`
      );
      return res.data;
    } else {
      const res = await Network.get(
        `api/Book/GetAvailableBooks${search !== null ? `?Search=${search}&` : "?"
        }Pagination.PageNumber=${page}&Pagination.PageSize=${size}&isAvailable=true`
      );
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
const GetMyBooks = async () => {
  try {
    const res = await Network.get("api/Book/GetMyBooks");

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const GetBookWithId = async (id) => {
  try {
    const res = await Network.get(`api/Book/${id}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const GetBooksWaitingForApproval = async (
  search = null,
  page = 0,
  size = 10
) => {
  try {
    const res = await Network.get(
      `/api/Book/GetBooksWaitingForApproval${search !== null ? `?Search=${search}&` : "?"
      }Pagination.PageNumber=${page}&Pagination.PageSize=${size}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const GetBookRequests = async () => {
  try {
    const res = await Network.get("api/Book/GetBookRequests");

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const GetBooksIRead = async () => {
  try {
    const res = await Network.get("api/Book/GetBooksIRead");

    return res.data;
  } catch (error) {
    console.log(error);
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
    toast.success(res.message);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const RequestBook = async (id) => {
  try {
    const res = await Network.post(`api/Book/RequestBook?bookId=${id}`);
    console.log(res);

    toast.success(res.message);
    await GetAvailableBooks();
  } catch (error) {
    console.log(error);

  }
};
const AcceptBookRequest = async (id) => {
  try {
    const res = await Network.post(`api/Book/AcceptBookRequest?bookId=${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const DeclineBookRequest = async (id) => {
  try {
    const res = await Network.post(`api/Book/DeclineBookRequest?bookId=${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const BookBorrowed = async (id) => {
  try {
    const res = await Network.post(`/api/Book/BookBorrowed?bookId=${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const BookReturned = async (id) => {
  try {
    const res = await Network.post(`/api/Book/BookReturned?bookId=${id}`);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};
const DeclineBook = async (body) => {
  try {
    const res = await Network.put("api/Book/ApproveBook", body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const UpdateBook = async (body) => {
  try {
    const res = await Network.put("api/Book/UpdateBook", body);
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
