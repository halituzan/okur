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
      }
      location.href = "/login";
      return Promise.reject(error);
    });
  }

  get = async (path) => {
    return await this.network.get(path).then((r) => r.data);
  };

  post = async (path, body) => {
    return await this.network.post(path, body).then((r) => r.data);
  };

  put = async (path, body) => {
    return await this.network.put(path, body).then((r) => r.data);
  };
  delete = async (path, body) => {
    return await this.network({
      method: "DELETE",
      data: body,
      url: path,
    }).then((r) => r.data);
  };
};

import axios from "axios";
export default new network(axios);
