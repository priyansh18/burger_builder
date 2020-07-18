import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-5a5c5.firebaseio.com/",
});

export default instance;
