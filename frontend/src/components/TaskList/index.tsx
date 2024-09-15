import { useEffect, useState } from 'react';
import AddIcon from '../../assets/icons/AddIcon';
import AddTaskBox from '../AddTaskBox';
import IconButton from '../Buttons/IconButton';
import TaskCard from '../TaskCard';
import classes from './style.module.scss';
import EmptyTaskList from '../EmptyTaskList';

const TaskList = ({ tasks, selectedCategory, allCategories, createTask, deleteTask, updateTask, duplicateTask }) => {
    const [showAddBox, setShowAddBox] = useState(false);

    const toggleShowAddBox = () => {
        setShowAddBox(prev => !prev)
    }

    const handleCreateTask = (data) => {
        setShowAddBox(false);
        createTask(data);
    }

    useEffect(() => {
        setShowAddBox(false);
    }, [tasks])

    return (
        <section className={classes.todoContainer}>
            <div className={classes.todoHeader}>
                <div className={classes.headerTitle}>{` ${selectedCategory ? `${`Tasks (${selectedCategory.name})`}` : 'All Tasks'} : ${tasks.length}`}</div>
                <div className={classes.headerActions}>
                    <IconButton onClick={toggleShowAddBox} ><AddIcon /></IconButton>

                </div>
            </div>

            <div className={classes.taskBody}>
                {showAddBox && (<AddTaskBox onSubmit={handleCreateTask} allCategories={allCategories} close={() => setShowAddBox(false)} selectedCategory={selectedCategory} />)}
                {tasks && tasks.length > 0 ? tasks.map(task => (
                    <TaskCard key={task.id} task={task} categories={allCategories} deleteTask={deleteTask} updateTask={updateTask} duplicateTask={duplicateTask} />
                )) : !showAddBox && (<EmptyTaskList addTask={() => setShowAddBox(true)} />)}
            </div>
        </section>
    )
}

export default TaskList;