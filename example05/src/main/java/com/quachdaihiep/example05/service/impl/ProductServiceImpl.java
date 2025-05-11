// // // package com.quachdaihiep.example05.service.impl;

// // // import java.io.FileNotFoundException;
// // // import java.io.IOException;
// // // import java.io.InputStream;
// // // import java.util.List;
// // // import java.util.stream.Collectors;

// // // import org.modelmapper.ModelMapper;
// // // import org.springframework.beans.factory.annotation.Autowired;
// // // import org.springframework.beans.factory.annotation.Value;
// // // import org.springframework.data.domain.Page;
// // // import org.springframework.data.domain.PageRequest;
// // // import org.springframework.data.domain.Pageable;
// // // import org.springframework.data.domain.Sort;
// // // import org.springframework.stereotype.Service;
// // // import org.springframework.web.multipart.MultipartFile;

// // // import com.quachdaihiep.example05.entity.Cart;
// // // import com.quachdaihiep.example05.entity.Category;
// // // import com.quachdaihiep.example05.entity.Product;
// // // import com.quachdaihiep.example05.exceptions.APIException;
// // // import com.quachdaihiep.example05.exceptions.ResourceNotFoundException;
// // // import com.quachdaihiep.example05.payloads.ProductDTO;
// // // import com.quachdaihiep.example05.payloads.ProductResponse;
// // // import com.quachdaihiep.example05.repository.CartRepo;
// // // import com.quachdaihiep.example05.repository.CategoryRepo;
// // // import com.quachdaihiep.example05.repository.ProductRepo;
// // // import com.quachdaihiep.example05.service.CartService;
// // // import com.quachdaihiep.example05.service.FileService;
// // // import com.quachdaihiep.example05.service.ProductService;

// // // import jakarta.transaction.Transactional;

// // // @Transactional
// // // @Service
// // // public class ProductServiceImpl implements ProductService {

// // //         @Autowired
// // //         private ProductRepo productRepo;

// // //         @Autowired
// // //         private CategoryRepo categoryRepo;

// // //         @Autowired
// // //         private CartRepo cartRepo;

// // //         @Autowired
// // //         private CartService cartService;

// // //         @Autowired
// // //         private FileService fileService;

// // //         @Autowired
// // //         private ModelMapper modelMapper;

// // //         @Value("${project.image}")
// // //         private String path;

// // //         @Override
// // //         public ProductDTO addProduct(Long categoryId, Product product) {
// // //                 Category category = categoryRepo.findById(categoryId)
// // //                                 .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

// // //                 boolean isProductNotPresent = category.getProducts().stream()
// // //                                 .noneMatch(p -> p.getProductName().equals(product.getProductName())
// // //                                                 && p.getDescription().equals(product.getDescription()));

// // //                 if (isProductNotPresent) {
// // //                         product.setImage("default.png");
// // //                         product.setCategory(category);

// // //                         Double specialPrice = product.getPrice()
// // //                                         - ((product.getDiscount() * 0.01) * product.getPrice());
// // //                         product.setSpecialPrice(specialPrice);

// // //                         Product savedProduct = productRepo.save(product);
// // //                         return modelMapper.map(savedProduct, ProductDTO.class);
// // //                 } else {
// // //                         throw new APIException("Product already exists!");
// // //                 }
// // //         }

// // //         @Override
// // //         public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
// // //                 Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
// // //                                 : Sort.by(sortBy).descending();

// // //                 Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);

// // //                 Page<Product> pageProducts = productRepo.findAll(pageDetails);
// // //                 List<ProductDTO> productDTOs = pageProducts.getContent().stream()
// // //                                 .map(product -> modelMapper.map(product, ProductDTO.class))
// // //                                 .collect(Collectors.toList());

// // //                 return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
// // //                                 pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
// // //         }

// // //         @Override
// // //         public ProductResponse searchByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy,
// // //                         String sortOrder) {
// // //                 Category category = categoryRepo.findById(categoryId)
// // //                                 .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

// // //                 Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
// // //                                 : Sort.by(sortBy).descending();

// // //                 Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);

// // //                 Page<Product> pageProducts = productRepo.findByCategoryCategoryId(categoryId, pageDetails);
// // //                 List<Product> products = pageProducts.getContent();

// // //                 if (products.isEmpty()) {
// // //                         throw new APIException(category.getCategoryName() + " category doesn't contain any products!");
// // //                 }

// // //                 List<ProductDTO> productDTOs = products.stream()
// // //                                 .map(product -> modelMapper.map(product, ProductDTO.class))
// // //                                 .collect(Collectors.toList());

// // //                 return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
// // //                                 pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
// // //         }

// // //         @Override
// // //         public ProductResponse searchProductByKeyword(String keyword, Long categoryId, int pageNumber, Integer pageSize,
// // //                         String sortBy,
// // //                         String sortOrder) {
// // //                 Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
// // //                                 : Sort.by(sortBy).descending();

// // //                 Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);

// // //                 Page<Product> pageProducts;
// // //                 if (categoryId != null && categoryId > 0) {
// // //                         pageProducts = productRepo.findByCategoryCategoryIdAndProductNameLike(categoryId, keyword,
// // //                                         pageDetails);
// // //                 } else {
// // //                         pageProducts = productRepo.findByProductNameLike(keyword, pageDetails);
// // //                 }

// // //                 List<ProductDTO> productDTOs = pageProducts.getContent().stream()
// // //                                 .map(product -> modelMapper.map(product, ProductDTO.class))
// // //                                 .collect(Collectors.toList());

// // //                 return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
// // //                                 pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
// // //         }

// // //         @Override
// // //         public ProductDTO updateProduct(Long productId, Product product) {
// // //                 Product existingProduct = productRepo.findById(productId)
// // //                                 .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

// // //                 product.setImage(existingProduct.getImage());
// // //                 product.setProductId(productId);
// // //                 product.setCategory(existingProduct.getCategory());

// // //                 double specialPrice = product.getPrice() - ((product.getDiscount() * 0.01) * product.getPrice());
// // //                 product.setSpecialPrice(specialPrice);

// // //                 Product updatedProduct = productRepo.save(product);

// // //                 List<Cart> carts = cartRepo.findCartsByProductId(productId);
// // //                 carts.forEach(cart -> cartService.updateProductInCarts(cart.getCartId(), productId));

// // //                 return modelMapper.map(updatedProduct, ProductDTO.class);
// // //         }

// // //         @Override
// // //         public ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException {
// // //                 Product product = productRepo.findById(productId)
// // //                                 .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

// // //                 String fileName = fileService.uploadImage(path, image);
// // //                 product.setImage(fileName);

// // //                 Product updatedProduct = productRepo.save(product);
// // //                 return modelMapper.map(updatedProduct, ProductDTO.class);
// // //         }

// // //         @Override
// // //         public String deleteProduct(Long productId) {
// // //                 Product product = productRepo.findById(productId)
// // //                                 .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

// // //                 List<Cart> carts = cartRepo.findCartsByProductId(productId);
// // //                 carts.forEach(cart -> cartService.deleteProductFromCart(cart.getCartId(), productId));

// // //                 productRepo.delete(product);
// // //                 return "Product with ID " + productId + " deleted successfully!";
// // //         }

// // //         @Override
// // //         public InputStream getProductImage(String fileName) throws FileNotFoundException {
// // //                 return fileService.getResource(path, fileName);
// // //         }

// // //         @Override
// // //         public ProductDTO getProductById(Long productId) {
// // //                 Product product = productRepo.findById(productId)
// // //                                 .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
// // //                 return modelMapper.map(product, ProductDTO.class);
// // //         }

// // //         @Override
// // //         public ProductResponse searchProductByKeyword(String keyword, Integer pageNumber, Integer pageSize,
// // //                         String sortBy, String sortOrder) {
// // //                 Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
// // //                                 : Sort.by(sortBy).descending();
// // //                 Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

// // //                 Page<Product> pageProducts = productRepo.findByProductNameLike(keyword, pageable);

// // //                 List<ProductDTO> productDTOs = pageProducts.getContent().stream()
// // //                                 .map(product -> modelMapper.map(product, ProductDTO.class))
// // //                                 .collect(Collectors.toList());

// // //                 return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
// // //                                 pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
// // //         }

// // //         @Override
// // //         public List<ProductDTO> searchProductByKeyword(String keyword) {
// // //                 List<Product> products = productRepo.findByProductNameContainingIgnoreCase(keyword);
// // //                 if (products.isEmpty()) {
// // //                         throw new APIException("No products found with keyword: " + keyword);
// // //                 }
// // //                 return products.stream()
// // //                                 .map(product -> modelMapper.map(product, ProductDTO.class))
// // //                                 .collect(Collectors.toList());
// // //         }



// // // }
// // package com.quachdaihiep.example05.service.impl;

// // import java.io.FileNotFoundException;
// // import java.io.IOException;
// // import java.io.InputStream;
// // import java.util.List;
// // import java.util.stream.Collectors;

// // import org.modelmapper.ModelMapper;
// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.data.domain.Page;
// // import org.springframework.data.domain.PageRequest;
// // import org.springframework.data.domain.Pageable;
// // import org.springframework.data.domain.Sort;
// // import org.springframework.stereotype.Service;
// // import org.springframework.web.multipart.MultipartFile;

// // import com.quachdaihiep.example05.entity.Category;
// // import com.quachdaihiep.example05.entity.Product;
// // import com.quachdaihiep.example05.exceptions.ResourceNotFoundException;
// // import com.quachdaihiep.example05.payloads.ProductDTO;
// // import com.quachdaihiep.example05.payloads.ProductResponse;
// // import com.quachdaihiep.example05.repository.CategoryRepo;
// // import com.quachdaihiep.example05.repository.ProductRepo;
// // import com.quachdaihiep.example05.service.ProductService;

// // import jakarta.transaction.Transactional;

// // @Service
// // @Transactional
// // public class ProductServiceImpl implements ProductService {

// //     @Autowired
// //     private ProductRepo productRepo;

// //     @Autowired
// //     private CategoryRepo categoryRepo;

// //     @Autowired
// //     private ModelMapper modelMapper;

// //     @Override
// //     public ProductDTO addProduct(Long categoryId, ProductDTO productDTO) {
// //         Category category = categoryRepo.findById(categoryId)
// //                 .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

// //         Product product = modelMapper.map(productDTO, Product.class);
// //         product.setCategory(category);

// //         Product savedProduct = productRepo.save(product);
// //         return modelMapper.map(savedProduct, ProductDTO.class);
// //     }

// //     @Override
// //     public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
// //         Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
// //         Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

// //         Page<Product> pageProducts = productRepo.findAll(pageable);
// //         List<ProductDTO> productDTOs = pageProducts.getContent().stream()
// //                 .map(product -> modelMapper.map(product, ProductDTO.class))
// //                 .collect(Collectors.toList());

// //         return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
// //                 pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
// //     }

// //     @Override
// //     public ProductDTO updateProduct(Long productId, ProductDTO productDTO) {
// //         Product existingProduct = productRepo.findById(productId)
// //                 .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

// //         existingProduct.setProductName(productDTO.getProductName());
// //         existingProduct.setPrice(productDTO.getPrice());
// //         existingProduct.setDescription(productDTO.getDescription());
// //         existingProduct.setQuantity(productDTO.getQuantity());
// //         existingProduct.setDiscount(productDTO.getDiscount());
// //         existingProduct.setSpecialPrice(productDTO.getSpecialPrice());
// //         existingProduct.setImage(productDTO.getImage());

// //         Product updatedProduct = productRepo.save(existingProduct);
// //         return modelMapper.map(updatedProduct, ProductDTO.class);
// //     }

// //     @Override
// //     public String deleteProduct(Long productId) {
// //         Product product = productRepo.findById(productId)
// //                 .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
// //         productRepo.delete(product);
// //         return "Product deleted successfully!";
// //     }

// //     @Override
// //     public ProductDTO getProductById(Long productId) {
// //         Product product = productRepo.findById(productId)
// //                 .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
// //         return modelMapper.map(product, ProductDTO.class);
// //     }

// //     @Override
// //     public InputStream getProductImage(String fileName) throws FileNotFoundException {
// //         // Implement logic to retrieve product image as InputStream
// //         throw new UnsupportedOperationException("Not implemented yet");
// //     }

// //     @Override
// //     public ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException {
// //         // Implement logic to update product image
// //         throw new UnsupportedOperationException("Not implemented yet");
// //     }

// //     @Override
// //     public ProductResponse searchByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
// //         Category category = categoryRepo.findById(categoryId)
// //                 .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

// //         Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
// //         Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

// //         Page<Product> pageProducts = productRepo.findByCategoryCategoryId(categoryId, pageable);
// //         List<ProductDTO> productDTOs = pageProducts.getContent().stream()
// //                 .map(product -> modelMapper.map(product, ProductDTO.class))
// //                 .collect(Collectors.toList());

// //         return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
// //                 pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
// //     }

// //     @Override
// //     public ProductResponse searchProductByKeyword(String keyword, Long categoryId, int pageNumber, Integer pageSize, String sortBy, String sortOrder) {
// //         Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
// //         Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

// //         Page<Product> pageProducts;
// //         if (categoryId != null && categoryId > 0) {
// //             pageProducts = productRepo.findByCategoryCategoryIdAndProductNameLike(categoryId, keyword, pageable);
// //         } else {
// //             pageProducts = productRepo.findByProductNameLike(keyword, pageable);
// //         }

// //         List<ProductDTO> productDTOs = pageProducts.getContent().stream()
// //                 .map(product -> modelMapper.map(product, ProductDTO.class))
// //                 .collect(Collectors.toList());

// //         return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
// //                 pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
// //     }

// //     @Override
// //     public ProductResponse searchProductByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
// //         Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
// //         Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

// //         Page<Product> pageProducts = productRepo.findByProductNameLike(keyword, pageable);
// //         List<ProductDTO> productDTOs = pageProducts.getContent().stream()
// //                 .map(product -> modelMapper.map(product, ProductDTO.class))
// //                 .collect(Collectors.toList());

// //         return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
// //                 pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
// //     }

// //     @Override
// //     public List<ProductDTO> searchProductByKeyword(String keyword) {
// //         List<Product> products = productRepo.findByProductNameContainingIgnoreCase(keyword);
// //         return products.stream()
// //                 .map(product -> modelMapper.map(product, ProductDTO.class))
// //                 .collect(Collectors.toList());
// //     }
// // }
// package com.quachdaihiep.example05.service.impl;

// import java.io.FileNotFoundException;
// import java.io.IOException;
// import java.io.InputStream;
// import java.util.List;
// import java.util.stream.Collectors;

// import org.modelmapper.ModelMapper;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.PageRequest;
// import org.springframework.data.domain.Pageable;
// import org.springframework.data.domain.Sort;
// import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;

// import com.quachdaihiep.example05.entity.Category;
// import com.quachdaihiep.example05.entity.Product;
// import com.quachdaihiep.example05.exceptions.APIException;
// import com.quachdaihiep.example05.exceptions.ResourceNotFoundException;
// import com.quachdaihiep.example05.payloads.ProductDTO;
// import com.quachdaihiep.example05.payloads.ProductResponse;
// import com.quachdaihiep.example05.repository.CategoryRepo;
// import com.quachdaihiep.example05.repository.ProductRepo;
// import com.quachdaihiep.example05.service.FileService;
// import com.quachdaihiep.example05.service.ProductService;

// import jakarta.transaction.Transactional;

// @Service
// @Transactional
// public class ProductServiceImpl implements ProductService {

//     @Autowired
//     private ProductRepo productRepo;

//     @Autowired
//     private CategoryRepo categoryRepo;

//     @Autowired
//     private ModelMapper modelMapper;

//     @Autowired
//     private FileService fileService;

//     @Value("${project.image}")
//     private String path;

//     @Override
//     public ProductDTO addProduct(Long categoryId, ProductDTO productDTO) {
//         Category category = categoryRepo.findById(categoryId)
//                 .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

//         Product product = modelMapper.map(productDTO, Product.class);
//         product.setCategory(category);

//         // Xử lý giá đặc biệt
//         Double specialPrice = product.getPrice() - ((product.getDiscount() * 0.01) * product.getPrice());
//         product.setSpecialPrice(specialPrice);

//         // Đặt ảnh mặc định nếu không có ảnh
//         if (product.getImage() == null || product.getImage().isEmpty()) {
//             product.setImage("default.png");
//         }

//         Product savedProduct = productRepo.save(product);
//         return modelMapper.map(savedProduct, ProductDTO.class);
//     }

//     @Override
//     public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
//         Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
//         Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

//         Page<Product> pageProducts = productRepo.findAll(pageable);
//         List<ProductDTO> productDTOs = pageProducts.getContent().stream()
//                 .map(product -> {
//                     ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);

//                     // Xử lý URL ảnh
//                     if (product.getImage() != null) {
//                         productDTO.setImage("http://localhost:8080/api/public/products/image/" + product.getImage());
//                     }

//                     // Lấy tên danh mục
//                     if (product.getCategory() != null) {
//                         productDTO.setCategoryName(product.getCategory().getCategoryName());
//                     }

//                     return productDTO;
//                 })
//                 .collect(Collectors.toList());

//         return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
//                 pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
//     }

//     @Override
//     public ProductDTO updateProduct(Long productId, ProductDTO productDTO) {
//         Product existingProduct = productRepo.findById(productId)
//                 .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

//         existingProduct.setProductName(productDTO.getProductName());
//         existingProduct.setPrice(productDTO.getPrice());
//         existingProduct.setDescription(productDTO.getDescription());
//         existingProduct.setQuantity(productDTO.getQuantity());
//         existingProduct.setDiscount(productDTO.getDiscount());
//         existingProduct.setSpecialPrice(productDTO.getSpecialPrice());
//         existingProduct.setImage(productDTO.getImage());

//         Product updatedProduct = productRepo.save(existingProduct);
//         return modelMapper.map(updatedProduct, ProductDTO.class);
//     }

//     @Override
//     public String deleteProduct(Long productId) {
//         Product product = productRepo.findById(productId)
//                 .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
//         productRepo.delete(product);
//         return "Product deleted successfully!";
//     }

//     @Override
//     public ProductDTO getProductById(Long productId) {
//         Product product = productRepo.findById(productId)
//                 .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

//         ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);

//         // Xử lý URL ảnh
//         if (product.getImage() != null) {
//             productDTO.setImage("http://localhost:8080/api/public/products/image/" + product.getImage());
//         }

//         // Lấy tên danh mục
//         if (product.getCategory() != null) {
//             productDTO.setCategoryName(product.getCategory().getCategoryName());
//         }

//         return productDTO;
//     }

//     @Override
//     public InputStream getProductImage(String fileName) throws FileNotFoundException {
//         return fileService.getResource(path, fileName);
//     }

//     @Override
//     public ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException {
//         Product product = productRepo.findById(productId)
//                 .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

//         String fileName = fileService.uploadImage(path, image);
//         product.setImage(fileName);

//         Product updatedProduct = productRepo.save(product);
//         return modelMapper.map(updatedProduct, ProductDTO.class);
//     }

//     @Override
//     public ProductResponse searchByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
//         Category category = categoryRepo.findById(categoryId)
//                 .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

//         Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
//         Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

//         Page<Product> pageProducts = productRepo.findByCategoryCategoryId(categoryId, pageable);
//         List<ProductDTO> productDTOs = pageProducts.getContent().stream()
//                 .map(product -> modelMapper.map(product, ProductDTO.class))
//                 .collect(Collectors.toList());

//         return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
//                 pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
//     }

//     @Override
//     public ProductResponse searchProductByKeyword(String keyword, Long categoryId, int pageNumber, Integer pageSize, String sortBy, String sortOrder) {
//         Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
//         Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

//         Page<Product> pageProducts;
//         if (categoryId != null && categoryId > 0) {
//             pageProducts = productRepo.findByCategoryCategoryIdAndProductNameLike(categoryId, keyword, pageable);
//         } else {
//             pageProducts = productRepo.findByProductNameLike(keyword, pageable);
//         }

//         List<ProductDTO> productDTOs = pageProducts.getContent().stream()
//                 .map(product -> modelMapper.map(product, ProductDTO.class))
//                 .collect(Collectors.toList());

//         return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
//                 pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
//     }

//     @Override
//     public ProductResponse searchProductByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
//         Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
//         Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

//         Page<Product> pageProducts = productRepo.findByProductNameLike(keyword, pageable);
//         List<ProductDTO> productDTOs = pageProducts.getContent().stream()
//                 .map(product -> modelMapper.map(product, ProductDTO.class))
//                 .collect(Collectors.toList());

//         return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
//                 pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
//     }

//     @Override
//     public List<ProductDTO> searchProductByKeyword(String keyword) {
//         List<Product> products = productRepo.findByProductNameContainingIgnoreCase(keyword);
//         return products.stream()
//                 .map(product -> modelMapper.map(product, ProductDTO.class))
//                 .collect(Collectors.toList());
//     }
// }
package com.quachdaihiep.example05.service.impl;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.quachdaihiep.example05.entity.Cart;
import com.quachdaihiep.example05.entity.Category;
import com.quachdaihiep.example05.entity.Product;
import com.quachdaihiep.example05.exceptions.APIException;
import com.quachdaihiep.example05.exceptions.ResourceNotFoundException;
import com.quachdaihiep.example05.payloads.ProductDTO;
import com.quachdaihiep.example05.payloads.ProductResponse;
import com.quachdaihiep.example05.repository.CartRepo;
import com.quachdaihiep.example05.repository.CategoryRepo;
import com.quachdaihiep.example05.repository.ProductRepo;
import com.quachdaihiep.example05.service.CartService;
import com.quachdaihiep.example05.service.FileService;
import com.quachdaihiep.example05.service.ProductService;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class ProductServiceImpl implements ProductService {

        @Autowired
        private ProductRepo productRepo;

        @Autowired
        private CategoryRepo categoryRepo;

        @Autowired
        private CartRepo cartRepo;

        @Autowired
        private CartService cartService;

        @Autowired
        private FileService fileService;

        @Autowired
        private ModelMapper modelMapper;

        @Value("${project.image}")
        private String path;

        @Override
        public ProductDTO addProduct(Long categoryId, Product product) {
                Category category = categoryRepo.findById(categoryId)
                                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

                boolean isProductNotPresent = category.getProducts().stream()
                                .noneMatch(p -> p.getProductName().equals(product.getProductName())
                                                && p.getDescription().equals(product.getDescription()));

                if (isProductNotPresent) {
                        product.setImage("default.png");
                        product.setCategory(category);

                        Double specialPrice = product.getPrice()
                                        - ((product.getDiscount() * 0.01) * product.getPrice());
                        product.setSpecialPrice(specialPrice);

                        Product savedProduct = productRepo.save(product);
                        return modelMapper.map(savedProduct, ProductDTO.class);
                } else {
                        throw new APIException("Product already exists!");
                }
        }

        @Override
        public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
                Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                                : Sort.by(sortBy).descending();

                Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);

                Page<Product> pageProducts = productRepo.findAll(pageDetails);
                List<ProductDTO> productDTOs = pageProducts.getContent().stream()
                                .map(product -> modelMapper.map(product, ProductDTO.class))
                                .collect(Collectors.toList());

                return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
                                pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
        }

        @Override
        public ProductResponse searchByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy,
                        String sortOrder) {
                Category category = categoryRepo.findById(categoryId)
                                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

                Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                                : Sort.by(sortBy).descending();

                Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);

                Page<Product> pageProducts = productRepo.findByCategoryCategoryId(categoryId, pageDetails);
                List<Product> products = pageProducts.getContent();

                if (products.isEmpty()) {
                        throw new APIException(category.getCategoryName() + " category doesn't contain any products!");
                }

                List<ProductDTO> productDTOs = products.stream()
                                .map(product -> modelMapper.map(product, ProductDTO.class))
                                .collect(Collectors.toList());

                return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
                                pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
        }

        @Override
        public ProductResponse searchProductByKeyword(String keyword, Long categoryId, int pageNumber, Integer pageSize,
                        String sortBy,
                        String sortOrder) {
                Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                                : Sort.by(sortBy).descending();

                Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sort);

                Page<Product> pageProducts;
                if (categoryId != null && categoryId > 0) {
                        pageProducts = productRepo.findByCategoryCategoryIdAndProductNameLike(categoryId, keyword,
                                        pageDetails);
                } else {
                        pageProducts = productRepo.findByProductNameLike(keyword, pageDetails);
                }

                List<ProductDTO> productDTOs = pageProducts.getContent().stream()
                                .map(product -> modelMapper.map(product, ProductDTO.class))
                                .collect(Collectors.toList());

                return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
                                pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
        }

        @Override
        public ProductDTO updateProduct(Long productId, Product product) {
                Product existingProduct = productRepo.findById(productId)
                                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

                product.setImage(existingProduct.getImage());
                product.setProductId(productId);
                product.setCategory(existingProduct.getCategory());

                double specialPrice = product.getPrice() - ((product.getDiscount() * 0.01) * product.getPrice());
                product.setSpecialPrice(specialPrice);

                Product updatedProduct = productRepo.save(product);

                List<Cart> carts = cartRepo.findCartsByProductId(productId);
                carts.forEach(cart -> cartService.updateProductInCarts(cart.getCartId(), productId));

                return modelMapper.map(updatedProduct, ProductDTO.class);
        }

        @Override
        public ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException {
                Product product = productRepo.findById(productId)
                                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

                String fileName = fileService.uploadImage(path, image);
                product.setImage(fileName);

                Product updatedProduct = productRepo.save(product);
                return modelMapper.map(updatedProduct, ProductDTO.class);
        }

        @Override
        public String deleteProduct(Long productId) {
                Product product = productRepo.findById(productId)
                                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

                List<Cart> carts = cartRepo.findCartsByProductId(productId);
                carts.forEach(cart -> cartService.deleteProductFromCart(cart.getCartId(), productId));

                productRepo.delete(product);
                return "Product with ID " + productId + " deleted successfully!";
        }

        @Override
        public InputStream getProductImage(String fileName) throws FileNotFoundException {
                return fileService.getResource(path, fileName);
        }

        @Override
        public ProductDTO getProductById(Long productId) {
                // Product product = productRepo.findById(productId)
                Product product = productRepo.findById(productId)
                                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
                return modelMapper.map(product, ProductDTO.class);
        }

        @Override
        public ProductResponse searchProductByKeyword(String keyword, Integer pageNumber, Integer pageSize,
                        String sortBy, String sortOrder) {
                Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                                : Sort.by(sortBy).descending();
                Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

                Page<Product> pageProducts = productRepo.findByProductNameLike(keyword, pageable);

                List<ProductDTO> productDTOs = pageProducts.getContent().stream()
                                .map(product -> modelMapper.map(product, ProductDTO.class))
                                .collect(Collectors.toList());

                return new ProductResponse(productDTOs, pageProducts.getNumber(), pageProducts.getSize(),
                                pageProducts.getTotalElements(), pageProducts.getTotalPages(), pageProducts.isLast());
        }

        @Override
        public List<ProductDTO> searchProductByKeyword(String keyword) {
                List<Product> products = productRepo.findByProductNameContainingIgnoreCase(keyword);
                if (products.isEmpty()) {
                        throw new APIException("No products found with keyword: " + keyword);
                }
                return products.stream()
                                .map(product -> modelMapper.map(product, ProductDTO.class))
                                .collect(Collectors.toList());
        }



}
