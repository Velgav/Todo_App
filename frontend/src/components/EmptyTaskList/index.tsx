import classes from './style.module.scss';

interface EmptyTaskListProps {
    addTask: () => void
}

const EmptyTaskList: React.FC<EmptyTaskListProps> = ({ addTask }) => {
    return (
        <div className={classes.emptyContainer}>
            <div className={classes.contentWrapper}>
                <div className={classes.title}>No tasks added</div>
                <button onClick={addTask} className={classes.addButton} type='button' title='add-button'>Add Task</button>
            </div>
        </div>
    )
}

export default EmptyTaskList;