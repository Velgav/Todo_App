import { useState } from 'react';
import AddIcon from '../../assets/icons/AddIcon';
import EditIcon from '../../assets/icons/EditIcon';
import RightArrowIcon from '../../assets/icons/RightArrowIcon';
import TrashIcon from '../../assets/icons/TrashIcon';
import AddCategoryBox from '../AddCategoryBox';
import IconButton from '../Buttons/IconButton';
import CategoryBox from '../CategoryBox';
import classes from './style.module.scss';
import { Category } from '../../types/category';
import { CategoryFormData } from '../AddCategoryBox/schema';

interface CategoriesListProps {
    categories: Category[]; // Array of Category objects
    createCategory: (data: { name: string }) => void; // Function to create a category
    selectedCategory?: Category; // Optional selected category
    selectCategory: (category?: Category) => void; // Function to select a category (or deselect)
    deleteCategory: (id: number) => void; // Function to delete a category by id
    updateCategory: (id: number, data: { name: string }) => void; // Function to update a category by id
}

const CategoriesList: React.FC<CategoriesListProps> = ({
    categories,
    createCategory,
    selectedCategory,
    selectCategory,
    deleteCategory,
    updateCategory,
}) => {

    const [showAddNewCat, setShowAddNewCat] = useState(false);
    const [editCategory, setEditCategory] = useState<number | false>(false);

    const toggleAddNewCat = () => {
        setShowAddNewCat(prev => !prev);
    }

    const handleAddCategory = (data: CategoryFormData) => {
        createCategory(data);
        setShowAddNewCat(false);
    }

    const handleUpdateCategory = (id: number, data: CategoryFormData) => {
        updateCategory(id, data);
        setEditCategory(false);
    }

    return (
        <div className={classes.listContainer}>
            <div className={classes.listHeader}>
                <p className={classes.listTitle}>{`Categories ${categories ? `: ${categories.length}` : ''}`}</p>
                <div className={classes.actionsWrapper}>
                    <IconButton onClick={toggleAddNewCat} ><AddIcon /></IconButton>
                </div>
            </div>

            <div className={classes.listBody}>
                {showAddNewCat && (
                    <AddCategoryBox onSubmit={handleAddCategory} closeAddCat={() => setShowAddNewCat(false)} />
                )}
                <CategoryBox
                    title="All"
                    isSelected={selectedCategory === undefined}
                    buttons={
                        <button title='Show all tasks' type='button' className={classes.actionButton}>
                            <RightArrowIcon />
                        </button>}
                    onClick={() => selectCategory(undefined)}
                    editMode={false}
                    closeEdit={() => { }}
                    confirmEdit={() => { }}
                />
                {categories && categories.map(cat => (
                    <CategoryBox
                        key={cat.id}
                        title={cat?.name}
                        onClick={() => selectCategory(cat)}
                        isSelected={selectedCategory?.id === cat.id}
                        editMode={editCategory === cat.id}
                        closeEdit={() => {
                            setEditCategory(false)
                        }}
                        confirmEdit={(data: CategoryFormData) => handleUpdateCategory(cat.id, data)}
                        buttons={
                            <><button onClick={(e) => {
                                e.stopPropagation();
                                setEditCategory(cat.id)
                            }}
                                title='Edit Category'
                                type='button'
                                className={classes.actionButton}>
                                <EditIcon />
                            </button>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    deleteCategory(cat.id)
                                }} title='Delete Category' type='button' className={classes.actionButton}>
                                    <TrashIcon />
                                </button></>} />

                ))}

            </div>
        </div>
    )
}

export default CategoriesList;