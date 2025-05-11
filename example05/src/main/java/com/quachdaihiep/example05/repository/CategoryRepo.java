package com.quachdaihiep.example05.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quachdaihiep.example05.entity.Category;

public interface CategoryRepo extends JpaRepository<Category, Long> {

    Category findByCategoryName(String categoryName);

}
