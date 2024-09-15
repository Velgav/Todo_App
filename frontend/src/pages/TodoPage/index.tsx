import { useEffect, useState } from "react";
import CategoriesList from "../../components/CategoriesList";
import TaskList from "../../components/TaskList";
import classes from './style.module.scss';
import { CategoryResponse, createCategory, deleteCategory, getAllCategories, updateCategory } from "../../services/category-services";
import { createTask, deleteTask, duplicateTask, getAllTasks, getTasksByCategoryId, TaskResponse, updateTask } from "../../services/task-services";
import { CategoryFormData } from "../../components/AddCategoryBox/schema";
import { TaskFormData } from "../../components/AddTaskBox/schema";

const TodoPage = () => {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [tasks, setTasks] = useState<TaskResponse[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(undefined);

    useEffect(() => {
        handleGetAllCategories();
        handleGetAllTasks();
    }, []);

    //  GET ALL TASKS
    const handleGetAllTasks = () => {
        getAllTasks()
            .then(data => {
                const sortedTasks = data.sort((a, b) => {const dateA = new Date(a.updatedAt);
                    const dateB = new Date(b.updatedAt);

                    // Handle invalid dates
                    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                        throw new Error('Invalid date format');
                    }

                    return dateB.getTime() - dateA.getTime(); // Sort in descending order
                });
                    //new Date(b.updatedAt) - new Date(a.updatedAt)
                
                setTasks(sortedTasks);
            })
            .catch(e => console.log(e));
    }

    //  GET ALL CATEGORIES
    const handleGetAllCategories = () => {
        getAllCategories()
            .then((data) => setCategories(data))
            .catch(e => console.log(e));
    }

    //  GET TASKS BY CATEGORY ID
    const handleGetTasksByCategoryId = (catId: number) => {
        getTasksByCategoryId(catId)
            .then(data => {
                const sortedTasks = data.sort((a, b) => {
                    const dateA = new Date(a.updatedAt);
                    const dateB = new Date(b.updatedAt);

                    // Handle invalid dates
                    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                        throw new Error('Invalid date format');
                    }

                    return dateB.getTime() - dateA.getTime(); // Sort in descending order
                });
                    //new Date(b.updatedAt) - new Date(a.updatedAt));
                setTasks(sortedTasks);
            })
            .catch(e => console.log(e));
    }

    //  CREATE CATEGORY
    const handleCreateCategory = (data: CategoryFormData) => {
        createCategory(data)
            .then((data) => {
                setCategories(prev => ([...prev, data]));
            })
            .catch(e => console.log('error creating category', e));
    }

    //  DUPLICATE TASK
    const handleDuplicateTask = (id: number) => {
        duplicateTask(id)
            .then(data => {
                setTasks(prev => ([data, ...prev]));
            })
            .catch(e => console.log('error duplicating ', e));
    }

    //  DELETE CATEGORY
    const handleDeleteCategory = (id:number) => {
        deleteCategory(id)
            .then(() => {
                const allCategories = [...categories];
                const remainingCategories = allCategories.filter(cat => cat.id !== id);
                setCategories(remainingCategories);
            })
            .catch(e => console.log('error deleting categories', e));
    }

    //  UPDATE CATEGORY
    const handleUpdateCategory = (id: number, data: CategoryFormData) => {
        updateCategory(id, data)
            .then((data) => {
                const allCategories = [...categories];
                const updatedCatId = allCategories.findIndex(cat => cat.id === id);
                allCategories[updatedCatId] = data;
                setCategories(allCategories);
            })
            .catch(e => console.log('error creating category', e));
    }

    const handleSelectCategory = (category: any) => {
        setSelectedCategory(category);
        if (category === undefined) {
            handleGetAllTasks();
            return;
        };
        handleGetTasksByCategoryId(category?.id);
    }

    //  CREATE TASK
    const handleCreateTask = (data: TaskFormData) => {
        console.log('creating task', data);
        createTask(data)
            .then((data) => {
                setTasks(prev => ([data, ...prev]));
            })
            .catch(e => console.log('error creating category', e));
    }

    const handleDeleteTask = (id: number) => {
        deleteTask(id)
            .then(() => {
                const allTasks = [...tasks];
                const filteredTasks = allTasks.filter(task => task.id !== id);
                setTasks(filteredTasks);
            })
            .catch(e => console.log('error deleting task', e));
    }

    const handleUpdateTask = (id: number, data: any) => {
        updateTask(id, data)
            .then(data => {
                const allTasks = [...tasks];
                const updatedTaskId = allTasks.findIndex(task => task.id === id);
                allTasks[updatedTaskId] = data;
                setTasks(allTasks);
            })
            .catch(e => console.log('error updating task', e))
    }

    return (
        <main className={classes.todoPageContainer}>
            <section className={classes.pageHeader}>
                <p className={classes.pageTitle}>Todo App</p>
            </section>
            <section className={classes.pageBody}>
                <CategoriesList categories={categories}
                    createCategory={handleCreateCategory}
                    selectedCategory={selectedCategory}
                    selectCategory={handleSelectCategory}
                    deleteCategory={handleDeleteCategory}
                    updateCategory={handleUpdateCategory}
                />
                <TaskList
                    tasks={tasks}
                    selectedCategory={selectedCategory}
                    allCategories={categories}
                    createTask={handleCreateTask}
                    deleteTask={handleDeleteTask}
                    updateTask={handleUpdateTask}
                    duplicateTask={handleDuplicateTask}
                />
            </section>
        </main>

    )
}

export default TodoPage;