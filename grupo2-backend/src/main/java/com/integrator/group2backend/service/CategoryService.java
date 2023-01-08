package com.integrator.group2backend.service;

import com.integrator.group2backend.entities.Category;
import com.integrator.group2backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Optional<Category> searchCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId);
    }

    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> listAllCategories() {
        return categoryRepository.findAll();
    }

    public Category updateCategory(Category category, Category oldCategory) {

        if (category.getCategoryIllustration() == null) {
            category.setCategoryIllustration(oldCategory.getCategoryIllustration());
        }

        if (category.getCategoryImage() == null) {
            category.setCategoryImage(oldCategory.getCategoryImage());
        }
        return this.categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
