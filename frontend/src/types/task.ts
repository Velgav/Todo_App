import { Category } from "./category";

export interface Task {
  id: number;
  createdAt: string;
  updatedAt: string;
  taskName: string;
  isArchived: boolean;
  category: Category;
}

export interface TaskPayload {
  taskName: string | undefined;
  categoryId: number | undefined;
}
