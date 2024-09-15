package io.nology.todo.task;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.nology.todo.category.Category;
import io.nology.todo.category.CategoryService;
import io.nology.todo.common.ValidationErrors;
import io.nology.todo.common.exceptions.NotFoundException;
import io.nology.todo.common.exceptions.ServiceValidationException;
import jakarta.validation.Valid;

@Service
public class TaskService {
  @Autowired
  private TaskRepository repo;

  @Autowired
  private CategoryService categoryService;

  @Autowired
  private ModelMapper mapper;

  public Task createTask(@Valid CreateTaskDTO data) throws Exception {
    ValidationErrors errors = new ValidationErrors();
    Task newTask = mapper.map(data, Task.class);
    Optional<Category> categoryResult = this.categoryService.findById(data.getCategoryId());

    if (categoryResult.isEmpty()) {
      errors.addError("category", String.format("Category with id %s does not exist", data.getCategoryId()));
    } else {
      newTask.setCategory(categoryResult.get());
    }

    if (errors.hasErrors()) {
      throw new ServiceValidationException(errors);
    }

    return this.repo.save(newTask);

  }

  public List<Task> findAll() {
    return this.repo.findAll();
  }

  // Fetch all tasks that are not archived
  public List<Task> findAllActive() {
    return repo.findByIsArchivedFalse();
  }

  public Optional<Task> findById(Long id) {
    return this.repo.findById(id);
  }

  public List<Task> findTasksByCategoryId(Long categoryId) {
    return this.repo.findAllByCategoryId(categoryId);
  }

  public List<Task> findNonArchivedTasksByCategoryId(Long categoryId) {
    return this.repo.findAllByCategoryIdAndIsArchivedFalse(categoryId);
  }

  public Task duplicateTask(Long id) throws Exception {
    // Find the original task
    Optional<Task> result = this.findById(id);
    Task foundTask = result.orElseThrow(() -> new NotFoundException("Could not find task with id " + id));

    // Create a new task based on the original task
    Task duplicatedTask = new Task();
    duplicatedTask.setTaskName(foundTask.getTaskName() + " (Copy)"); // Optionally append "Copy" to the name
    duplicatedTask.setCategory(foundTask.getCategory());
    // Copy any other fields as needed

    // Save the duplicated task
    return this.repo.save(duplicatedTask);
  }

  public Optional<Task> updateTaskById(Long id, @Valid UpdateTaskDTO data) throws Exception {
    Optional<Task> result = this.findById(id);
    if (result.isEmpty()) {
      return result;
    }
    Task foundTask = result.get();

    foundTask.setTaskName(data.getTaskName());

    ValidationErrors errors = new ValidationErrors();
    if (data.getCategoryId() != null) {
      Optional<Category> categoryResult = this.categoryService.findById(data.getCategoryId());
      if (categoryResult.isEmpty()) {
        errors.addError("category", String.format("Category with id %s does not exist", data.getCategoryId()));
      } else {
        foundTask.setCategory(categoryResult.get());
      }
    }
    if (errors.hasErrors()) {
      throw new ServiceValidationException(errors);
    }
    Task updatedPost = this.repo.save(foundTask);

    return Optional.of(updatedPost);
  }

  public boolean deleteById(Long id) {
    Optional<Task> result = this.findById(id);
    if (result.isEmpty()) {
      return false;
    }

    Task task = result.get();
    task.setIsArchived(true); // Set the isArchived flag to true
    repo.save(task); // Save the updated task entity
    return true;

  }
}
