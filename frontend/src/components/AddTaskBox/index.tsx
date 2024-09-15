import CrossIcon from '../../assets/icons/CrossIcon';
import TickIcon from '../../assets/icons/TickIcon';
import classes from './style.module.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, TaskFormData } from './schema';
import { Category } from '../../types/category';
import { TaskPayload } from '../../types/task';

interface AddTaskBoxProps {
    close: () => void;
    type?: 'add' | 'edit';
    allCategories: Category[];
    onSubmit: (data: TaskPayload) => void;
    defaultValues: TaskPayload;
    selectedCategory?: Category;
}

const AddTaskBox = ({
    close,
    type = "add",
    allCategories,
    onSubmit,
    selectedCategory,
    defaultValues = { taskName: '', categoryId: selectedCategory?.id || allCategories[0]?.id }
}: AddTaskBoxProps) => {


    const {
        reset,
        register,
        formState: { isSubmitSuccessful },
        handleSubmit,
    } = useForm<TaskFormData>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    if (isSubmitSuccessful) reset();


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.cardWrapper}>
            <div className={classes.cardHeader}>
                <p className={classes.boxTitle}>{type === "edit" ? "Edit Task" : "Add New Task"}</p>
                <div className={classes.actionsContainer}>
                    <button onClick={handleSubmit(onSubmit)} title='Confirm' type='button' className={classes.actionButton}><TickIcon /></button>
                    <button onClick={close} title='Cancel' type='button' className={classes.actionButton}>< CrossIcon /></button>
                </div>
            </div>
            <div className={classes.cardBody}>
                <select {...register('categoryId', { valueAsNumber: true })}
                    title='select-category'
                    className={classes.selectCategory} >
                    {allCategories && allCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                <textarea {...register('taskName')} placeholder='Enter task description' title="task-description" className={classes.taskInput} />
            </div>
        </form>
    )
}

export default AddTaskBox;