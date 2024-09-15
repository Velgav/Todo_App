import AddCategoryBox from '../AddCategoryBox';
import classes from './style.module.scss';

interface CategoryBoxProps {
    title: string;
    buttons?: React.ReactNode;
    isSelected?: boolean;
    editMode?: boolean | undefined;
    closeEdit: () => void | undefined;
    confirmEdit: (data: { name: string }) => void | undefined;
}

const CategoryBox: React.FC<CategoryBoxProps & React.HTMLAttributes<HTMLDivElement>> = ({
    title,
    buttons,
    isSelected,
    editMode,
    closeEdit,
    confirmEdit,
    ...props
}) => {
    if (editMode) {
        return <AddCategoryBox closeAddCat={closeEdit} onSubmit={confirmEdit} defaultValues={{ name: title }} />
    }
    return (
        <div {...props} className={`${classes.boxWrapper} ${isSelected && classes.selected}`}>
            <p className={classes.categoryTitle}>{title}</p>

            <div className={classes.actionButtons}>
                {buttons}
            </div>
        </div>
    )
}

export default CategoryBox;