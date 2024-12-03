import axios from "axios";

const axiosOptions = {
  baseURL: "http://localhost:4000/todos",
};

const apiInstance = axios.create(axiosOptions);

/** */

export const getTodos = () => apiInstance.get("/");

export const getTodoById = (id) => apiInstance.get(`/${id}`);

export const createTodo = (data) => apiInstance.post("/create", data);

export const deleteTodo = (id) => apiInstance.delete(`/${id}`);

export const updateTodo = (id, data) => apiInstance.patch(`/${id}`, data);
