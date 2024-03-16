import { toast } from 'react-toastify';
const network = class NETWORK {
  constructor(axios) {

    this.network = axios.create({ baseURL: "https://api.okurapp.com/" });

    this.network.interceptors.request.use(async (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
        // config.headers["Content-Type"] = `application/json`;
        // config.headers["Accept"] = `application/json; charset=utf8`;


      }
      return config;
    });

    this.network.interceptors.response.use(null, (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("myInformation");
        location.href = "/login";
      }

      if (error.response?.status === 500) {
        toast.error(error.response.data.Message)
      }

      return Promise.reject(error);
    });
  }

  get = async (path) => {
    const res = await this.network.get(path);
    return res.data;
  };

  post = async (path, body) => {
    const res = await this.network.post(path, body);
    return res.data;
  };

  put = async (path, body) => {
    const res = await this.network.put(path, body);
    return res.data;
  };
  delete = async (path, body) => {
    const res = await this.network({
      method: "DELETE",
      data: body,
      url: path,
    });
    return res.data;
  };
};

import axios from "axios";
export default new network(axios);
