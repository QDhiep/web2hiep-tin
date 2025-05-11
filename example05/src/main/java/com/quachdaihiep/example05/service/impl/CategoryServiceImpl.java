package com.quachdaihiep.example05.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.quachdaihiep.example05.entity.Category;
import com.quachdaihiep.example05.entity.Product;
import com.quachdaihiep.example05.exceptions.APIException;
import com.quachdaihiep.example05.exceptions.ResourceNotFoundException;
import com.quachdaihiep.example05.payloads.CategoryDTO;
import com.quachdaihiep.example05.payloads.CategoryResponse;
import com.quachdaihiep.example05.repository.CategoryRepo;
import com.quachdaihiep.example05.service.CategoryService;
import com.quachdaihiep.example05.service.ProductService;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private ProductService productService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoryDTO createCategory(Category category) {
        if (category == null || category.getCategoryName() == null || category.getCategoryName().isEmpty()) {
            throw new APIException("Invalid category data.");
        }

        Category existingCategory = categoryRepo.findByCategoryName(category.getCategoryName());

        if (existingCategory != null) {
            throw new APIException("Category with the name '" + category.getCategoryName() + "' already exists!");
        }

        Category savedCategory = categoryRepo.save(category);
        log.info("Category created with ID: {}", savedCategory.getCategoryId());
        return modelMapper.map(savedCategory, CategoryDTO.class);
    }

    @Override
    public CategoryResponse getCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sort = Sort.by(sortBy);
        sort = sortOrder.equalsIgnoreCase("asc") ? sort.ascending() : sort.descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);
        Page<Category> pageCategories = categoryRepo.findAll(pageDetails);

        List<Category> categories = pageCategories.getContent();

        if (categories.isEmpty()) {
            throw new APIException("No categories found!");
        }

        List<CategoryDTO> categoryDTOs = categories.stream()
                .map(category -> modelMapper.map(category, CategoryDTO.class))
                .collect(Collectors.toList());

        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setContent(categoryDTOs);
        categoryResponse.setPageNumber(pageCategories.getNumber());
        categoryResponse.setPageSize(pageCategories.getSize());
        categoryResponse.setTotalElements(pageCategories.getTotalElements());
        categoryResponse.setTotalPages(pageCategories.getTotalPages());
        categoryResponse.setLastPage(pageCategories.isLast());

        return categoryResponse;
    }

    @Override
    public CategoryDTO updateCategory(Category category, Long categoryId) {
        Category savedCategory = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));
        category.setCategoryId(categoryId);
        savedCategory = categoryRepo.save(category);

        return modelMapper.map(savedCategory, CategoryDTO.class);
    }

    @Override
    public String deleteCategory(Long categoryId) {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        List<Product> products = category.getProducts();
        products.forEach(product -> productService.deleteProduct(product.getProductId()));

        categoryRepo.delete(category);

        log.info("Category deleted with ID: {}", categoryId);
        return "Category with ID " + categoryId + " deleted successfully!";
    }

    @Override
    public CategoryDTO getCategoryById(Long categoryId) {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        return modelMapper.map(category, CategoryDTO.class);
    }
}
