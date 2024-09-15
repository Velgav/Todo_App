package io.nology.todo.task;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateTaskDTO {
    @NotBlank
    @Length(min = 5)
    private String taskName;
    
    @NotNull
    @Min(1)
    private Long categoryId;

    
    private Boolean isArchived;

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
