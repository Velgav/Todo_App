package io.nology.todo.task;

//import org.hibernate.mapping.List;

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
@RequestMapping("tasks")
public class TaskController {

  @Autowired
  private TaskService taskService;

  @PostMapping
  public ResponseEntity<Task> createNewTask(@Valid @RequestBody CreateTaskDTO data) throws Exception {
    Task createdTask = this.taskService.createTask(data);
    return new ResponseEntity<Task>(createdTask, HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<List<Task>> findAllTasks() {
    List<Task> tasks = this.taskService.findAll();
    return new ResponseEntity<List<Task>>(tasks, HttpStatus.OK);
  }

  @GetMapping("/active")
  public List<Task> getAllActiveTasks() {
    return taskService.findAllActive();
  }

  @GetMapping("/category/{categoryId}")
  public ResponseEntity<List<Task>> findTasksByCategoryId(@PathVariable Long categoryId) {
    List<Task> tasks = this.taskService.findNonArchivedTasksByCategoryId(categoryId);
    return new ResponseEntity<>(tasks, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Task> findTaskById(@PathVariable Long id) throws NotFoundException {
    Optional<Task> result = this.taskService.findById(id);
    Task foundTask = result.orElseThrow(() -> new NotFoundException("Could not find task with id " + id));
    return new ResponseEntity<>(foundTask, HttpStatus.OK);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Task> updateTaskById(@PathVariable Long id,
      @Valid @RequestBody UpdateTaskDTO data) throws Exception {
    Optional<Task> result = this.taskService.updateTaskById(id, data);
    Task foundTask = result.orElseThrow(() -> new NotFoundException("Could not find task with id " + id));
    return new ResponseEntity<>(foundTask, HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTaskById(@PathVariable Long id) throws NotFoundException {
    boolean deleteSuccessful = this.taskService.deleteById(id);
    if (deleteSuccessful == false) {
      throw new NotFoundException("Could not find task with id " + id);
    }
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);

  }

  @PostMapping("/{id}/duplicate")
  public ResponseEntity<Task> duplicateTask(@PathVariable Long id) throws Exception {
    Task duplicatedTask = this.taskService.duplicateTask(id);
    return new ResponseEntity<>(duplicatedTask, HttpStatus.CREATED);
  }

}
