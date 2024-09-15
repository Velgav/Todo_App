package io.nology.todo.category;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.todo.common.exceptions.NotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Category> createCategory(@Valid @RequestBody CreateCategoryDTO data) throws Exception {
        // you might want to do extra layer of exception handling in the controller
        // try {
        // Category newCategory = this.categoryService.create(data);
        // return new ResponseEntity<Category>(newCategory, HttpStatus.CREATED);
        // } catch (Exception e) {
        // String exceptionClass = e.getClass().getSimpleName();
        // if (exceptionClass.equals("ServiceValidationException")) {
        // var err = (ServiceValidationException) e;
        // throw new BadRequestException(err.getErrors().toString());
        // } else {
        // throw new Exception("Someting else went wrong");
        // }
        // }

        Category newCategory = this.categoryService.create(data);
        return new ResponseEntity<Category>(newCategory, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> allCategories = this.categoryService.findAll();
        return new ResponseEntity<List<Category>>(allCategories, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
public ResponseEntity<Category> updateCategoryById(@PathVariable Long id,
        @Valid @RequestBody UpdateCategoryDTO data) {
    try {
        Optional<Category> updatedCategory = this.categoryService.updateCategoryById(id, data);
        if (updatedCategory.isEmpty()) {
            throw new NotFoundException("Could not find category with id " + id);
        }
        return new ResponseEntity<>(updatedCategory.get(), HttpStatus.OK);
    } catch (NotFoundException e) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoryById(@PathVariable Long id) throws NotFoundException {
        boolean deleteSuccessful = this.categoryService.deleteById(id);
        if (deleteSuccessful == false) {
            throw new NotFoundException("Could not find category with id " + id);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
