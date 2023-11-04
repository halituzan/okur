const network = class NETWORK {
  constructor(axios) {
    this.network = axios.create({
      baseURL: "https://localhost:7052/",
    });

    this.network.interceptors.request.use(async (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.network.interceptors.response.use(null, (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("myInformation");
        location.href = "/login";
        toast.error(error.response?.data.Message);
      } else {
        toast.error(error.response?.data.Message);
      }

      return Promise.reject(error);
    });
  }

  get = async (path) => {
    try {
      const res = await this.network.get(path);
      toast.success(res.message);
      return res.data;
    } catch (error) {}
  };

  post = async (path, body) => {
    try {
      const res = await this.network.post(path, body);
      toast.success(res.message);
      return res.data;
    } catch (error) {}
  };

  put = async (path, body) => {
    try {
      const res = await this.network.put(path, body);
      toast.success(res.message);
      return res.data;
    } catch (error) {}
  };
  delete = async (path, body) => {
    try {
      const res = await this.network({
        method: "DELETE",
        data: body,
        url: path,
      });
      toast.success(res.message);
      return res.data;
    } catch (error) {}
  };
};

import axios from "axios";
import { toast } from "react-toastify";
export default new network(axios);
