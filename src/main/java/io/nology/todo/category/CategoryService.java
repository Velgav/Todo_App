package io.nology.todo.category;

import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.nology.todo.common.ValidationErrors;
import io.nology.todo.common.exceptions.ServiceValidationException;
import jakarta.validation.Valid;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository repo;
    @Autowired
    private ModelMapper mapper;

    public Category create(@Valid CreateCategoryDTO data) throws Exception {
        ValidationErrors errors = new ValidationErrors();
        String formattedName = data.getName().trim().toLowerCase();
        if (repo.existsByName(formattedName)) {
            errors.addError("name", String.format("category with name '%s' already exists", formattedName));
        }
        Category newCategory = mapper.map(data, Category.class);
        if (errors.hasErrors()) {
            throw new ServiceValidationException(errors);
        }
        return this.repo.save(newCategory);

    }

    public List<Category> findAll() {
        return this.repo.findAll();

    }

    public Optional<Category> findById(Long categoryId) {
        return this.repo.findById(categoryId);
    }

    public Optional<Category> updateCategoryById(Long id, @Valid UpdateCategoryDTO data) throws Exception {
        Optional<Category> result = this.findById(id);
        if (result.isEmpty()) {
            return result;
        }
        Category foundCategory = result.get();
        mapper.map(data, foundCategory);
        ValidationErrors errors = new ValidationErrors();
        // Any additional validation logic
        if (errors.hasErrors()) {
            throw new ServiceValidationException(errors);
        }
        Category updatedCategory = this.repo.save(foundCategory);
        return Optional.of(updatedCategory);
    }

    public boolean deleteById(Long id) {
        Optional<Category> result = this.findById(id);
        if (result.isEmpty()) {
            return false;
        }

        repo.deleteById(id); // Delete the category from the database
        return true;

    }
}
