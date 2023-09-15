import axios from "axios";
import { user_role, base_url } from "./const";

const AxiosHeader = (token, role = user_role.customer) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  axios.defaults.baseURL = base_url;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.common['app-role'] = role;
  // set access control allow origin
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
};

export default AxiosHeader;