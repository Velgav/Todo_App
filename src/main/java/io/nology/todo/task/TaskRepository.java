package io.nology.todo.task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
  List<Task> findByIsArchivedFalse();

  List<Task> findAllByCategoryId(Long categoryId);

  List<Task> findAllByCategoryIdAndIsArchivedFalse(Long categoryId);

}
