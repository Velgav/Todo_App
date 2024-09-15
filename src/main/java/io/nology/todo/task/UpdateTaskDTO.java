package io.nology.todo.task;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;

public class UpdateTaskDTO {

  @Pattern(regexp = ".*\\S.*", message = "Task Name cannot be empty")
  @Length(min = 5)
  private String taskName;

  private Boolean isArchived;

  @Min(1)
  private Long categoryId;

  public String getTaskName() {
    return taskName;
  }

  public Boolean getIsArchived() {
    return isArchived;
  }

  public Long getCategoryId() {
    return categoryId;
  }

}
