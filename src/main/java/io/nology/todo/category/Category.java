package io.nology.todo.category;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.nology.todo.common.BaseEntity;
import io.nology.todo.task.Task;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "categories")

public class Category extends BaseEntity {
  @Column(unique = true)
  private String name;

  @OneToMany(mappedBy = "category")
  @JsonIgnoreProperties("category")
  private List<Task> tasks;

  public Category() {
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<Task> getTasks() {
    return tasks;
  }

  public void setPosts(List<Task> tasks) {
    this.tasks = tasks;
  }

  @Override
  public String toString() {
    return "Category [name=" + name + ", tasks=" + tasks + "]";
  }

}
