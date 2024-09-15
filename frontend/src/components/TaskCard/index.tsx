import { useState } from 'react';
import DuplicateIcon from '../../assets/icons/DuplicateIcon';
import EditIcon from '../../assets/icons/EditIcon';
import TrashIcon from '../../assets/icons/TrashIcon';
import AddTaskBox from '../AddTaskBox';
import classes from './style.module.scss';
import { Task, TaskPayload } from '../../types/task';
import { Category } from '../../types/category';

interface TaskCardProps {
    task?: Task; // The task object or undefined
    categories: Category[]; // Array of categories for the task
    deleteTask: (id: number | undefined) => void; // Function to delete a task by id
    updateTask: (id: number | undefined, data: TaskPayload) => void; // Function to update a task
    duplicateTask: (id: number | undefined) => void; // Function to duplicate a task by id
}

const TaskCard: React.FC<TaskCardProps> = ({ task, categories, deleteTask, updateTask, duplicateTask }) => {

    const { id, taskName, category } = task || {};
    const { name: categoryName } = category || {};

    const [editMode, setEditMode] = useState(false);

    const enterEditMode = () => {
        setEditMode(true);
    }

    const closeEditMode = () => {
        setEditMode(false);
    }

    const handleUpdateTask = (data: TaskPayload) => {
        updateTask(id, data);
        closeEditMode();
    }

    if (editMode) {
        return <AddTaskBox type="edit" close={closeEditMode} onSubmit={handleUpdateTask} defaultValues={{ taskName, categoryId: category?.id }} allCategories={categories} />
    }

    return (
        <div className={classes.cardWrapper}>
            <div className={classes.cardHeader}>
                <p className={classes.categoryTitle}>{categoryName}</p>
                <div className={classes.actionsContainer}>
                    <button onClick={() => duplicateTask(id)} title='Duplicate' type='button' className={classes.actionButton}><DuplicateIcon /></button>
                    <button onClick={enterEditMode} title='Edit' type='button' className={classes.actionButton}><EditIcon /></button>
                    <button onClick={() => deleteTask(id)} title='Delete' type='button' className={classes.actionButton}><TrashIcon /></button>
                </div>
            </div>
            <div className={classes.cardBody}>
                <p className={classes.taskDescription}>
                    {taskName}
                </p>
            </div>
        </div>
    )
}

export default TaskCard;