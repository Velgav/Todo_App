package io.nology.todo.category;

import jakarta.validation.constraints.NotBlank;

public class UpdateCategoryDTO {
    @NotBlank(message = "Category name is required")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}