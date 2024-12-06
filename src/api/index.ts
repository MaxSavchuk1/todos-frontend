import { Todo } from "../helpers/types";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const axiosOptions = {
  baseURL: "http://localhost:4000/todos",
};

const apiInstance = axios.create(axiosOptions);

apiInstance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (err) => {
    enqueueSnackbar(
      err?.response?.data?.message || "Something went wrong. try again!",
      {
        variant: "error",
      }
    );
    return Promise.reject(err);
  }
);

/********* TODO: split code ********/

export const getTodos = () => apiInstance.get("/");

export const getTodoById = (id: number) => apiInstance.get(`/${id}`);

export const createTodo = (data: Partial<Todo>) =>
  apiInstance.post("/create", data);

export const deleteTodo = (id: number) => apiInstance.delete(`/${id}`);

export const updateTodo = (id: number | string, data: Partial<Todo>) =>
  apiInstance.patch(`/${id}`, data);
