import { promises } from "fs";
import { iTask } from "./types/task";

const baseURL = "https://todo-api-93i6.onrender.com";
export const getAllTodos = async (): Promise<iTask[]> => {
  const res = await fetch(`${baseURL}/task`, { cache: "no-store" });
  const todos = await res.json();
  return todos;
};

export const addTodo = async (todo: iTask): Promise<iTask> => {
  const res = await fetch(`${baseURL}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await res.json();
  return newTodo;
};

export const editTodo = async (todo: iTask): Promise<iTask> => {
  const res = await fetch(`${baseURL}/task/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newEditTodo = await res.json();
  return newEditTodo;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${baseURL}/task/${id}`, {
    method: "DELETE",
  });
};
