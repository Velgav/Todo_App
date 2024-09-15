import { CategoryFormData } from "../components/AddCategoryBox/schema";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface CategoryResponse {
  id: number;
  title: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  category: string;
}

export const getAllCategories = async () => {
  const response = await fetch(baseURL + "/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return (await response.json()) as CategoryResponse[];
};

export const createCategory = async (data: CategoryFormData) => {
  const response = await fetch(baseURL + "/categories", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to post");
  }
  return (await response.json()) as CategoryResponse;
};

export const deleteCategory = async (id: number) => {
  const response = await fetch(baseURL + "/categories" + `/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete category");
  }
  return true;
};

export const updateCategory = async (id: number, data: Partial<CategoryFormData>) => {
  const response = await fetch(baseURL + `/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update category");
  }

  return (await response.json()) as CategoryResponse;
};