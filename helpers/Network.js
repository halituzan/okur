import axios from "axios";

const Network = class NETWORK {
  constructor(axios) {
    this.network = axios.create({
      baseURL: "https://localhost:7052/",
    });
  }

  get = async (path, body, headers) => {
    return await this.network.get(path, body, { headers }).then((r) => r.data);
  };

  post = async (path, body, headers) => {
    return await this.network.post(path, body, { headers }).then((r) => r.data);
  };
};

export default new Network(axios);
