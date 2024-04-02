

import axios from "axios";
import CryptoJS from "crypto-js";

const BASE_URL = "https://no23.lavina.tech";

axios.interceptors.request.use((config) => {
  try {
    config.baseURL = BASE_URL;
    const method = config.method?.toUpperCase();

    const url = config.url;
    let requestBody;
    if(config.data?.secret) {
      requestBody = "";
    } else {
      requestBody = config.data || "";
    }

    let signstr = "";
    let key = localStorage.getItem("key");
    if (!key && config.headers.key) {
      key = config.headers.key;
    }

    let secret = localStorage.getItem("secret");
    if(!secret && config.data.secret) {
      secret = config.data.secret;
    }

    if (method && url && url !== "/signup") {
      signstr = method + url + requestBody + secret;

      config.headers.key = key;
      config.headers.sign = CryptoJS.MD5(signstr).toString();
    } else {
      localStorage.setItem("secret", config.data?.secret);
      localStorage.setItem("key", config.data?.key);
    }

    return config;
  } catch (e) {
    return Promise.reject(e);
  }
});

export default axios;
