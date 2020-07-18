import axios from "axios";

const instance = axios.create({
  baseURL: "REDACTED_DB_URL",
});

export default instance;
