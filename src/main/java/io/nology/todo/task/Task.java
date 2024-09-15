package io.nology.todo.task;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.nology.todo.category.Category;
import io.nology.todo.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task extends BaseEntity {

  public Task() {
  }

    @Column
    private String taskName;

    @Column(name = "is_archived")
    private Boolean isArchived = false;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    @JsonIgnoreProperties("tasks")
    private Category category;

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public void setIsArchived(Boolean isArchived) {
        this.isArchived = isArchived;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getTaskName() {
        return taskName;
    }

    public Boolean getIsArchived() {
        return isArchived;
    }

    public Category getCategory() {
        return category;
    }
}
