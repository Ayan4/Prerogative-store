import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));

console.log(user);

export const apiClient = axios.create({
  baseURL: "https://prerogative-store.herokuapp.com",
  headers: {
    Authorization: `Bearer ${user?.token}`
  }
});
