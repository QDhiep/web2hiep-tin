package com.quachdaihiep.example05.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.quachdaihiep.example05.entity.Product;

public interface ProductRepo extends JpaRepository<Product, Long> {

    Page<Product> findByProductNameLike(String keyword, Pageable pageDetails);

    // Corrected method name
    Page<Product> findByCategoryCategoryId(Long categoryId, Pageable pageDetails);

    List<Product> findByProductNameContainingIgnoreCase(String keyword);

    Page<Product> findByCategoryCategoryIdAndProductNameLike(Long categoryId, String keyword, Pageable pageDetails);

}
