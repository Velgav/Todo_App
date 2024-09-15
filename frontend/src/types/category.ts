import { Task } from "./task";

export interface Category {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  tasks: Task[]; // Array of Task objects
}

export interface CategoryPayload {
  name: string | undefined;
}
