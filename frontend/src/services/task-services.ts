import { TaskFormData } from "../components/AddTaskBox/schema";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface TaskResponse {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  taskName: string;
  isArchived: boolean;
  category: {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
  };
}

export const getAllTasks = async () => {
  const response = await fetch(baseURL + "/tasks/active");
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as TaskResponse[];
};

export const getTasksByCategoryId = async (categoryId) => {
  const response = await fetch(baseURL + "/tasks/category" + `/${categoryId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as TaskResponse[];
};

export const createTask = async (data: TaskFormData) => {
  const response = await fetch(baseURL + "/tasks", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to post");
  }
  return (await response.json()) as TaskResponse;
};

export const deleteTask = async (id) => {
  const response = await fetch(baseURL + "/tasks" + `/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete");
  }
  return true;
};

export const updateTask = async (id: number, data: Partial<TaskFormData>) => {
  const response = await fetch(baseURL + `/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update category");
  }

  return (await response.json()) as TaskResponse;
};

export const duplicateTask = async (id) => {
  const response = await fetch(baseURL + "/tasks" + `/${id}/duplicate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to post");
  }
  return (await response.json()) as TaskResponse;
};
