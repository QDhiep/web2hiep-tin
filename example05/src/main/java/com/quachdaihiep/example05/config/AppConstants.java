// package com.quachdaihiep.example05.config;

// public class AppConstants {

//     public static final String PAGE_NUMBER = "0";
//     public static final String PAGE_SIZE = "2";
//     public static final String SORT_CATEGORIES_BY = "categoryId";
//     public static final String SORT_PRODUCTS_BY = "productId";
//     public static final String SORT_USERS_BY = "userId";
//     public static final String SORT_ORDERS_BY = "totalAmount";
//     public static final String SORT_DIR = "asc";
//     public static final Long ADMIN_ID = 101L;
//     public static final Long USER_ID = 102L;
//     public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
//     public static final String[] PUBLIC_URLS = { "/v3/api-docs/**", "/swagger-ui/**", "/api/register/**",
//             "/api/login", "/api/public/users/**" };
//     public static final String[] USER_URLS = { "/api/public/**" };
//     public static final String[] ADMIN_URLS = { "/api/admin/**" };
// }
package com.quachdaihiep.example05.config;

public class AppConstants {

    // Default pagination and sorting configurations
    public static final String PAGE_NUMBER = "0"; // Default page number
    public static final String PAGE_SIZE = "10"; // Default page size (increased for better usability)
    public static final String SORT_CATEGORIES_BY = "categoryId"; // Default sorting field for categories
    public static final String SORT_PRODUCTS_BY = "productId"; // Default sorting field for products
    public static final String SORT_USERS_BY = "userId"; // Default sorting field for users
    public static final String SORT_ORDERS_BY = "totalAmount"; // Default sorting field for orders
    public static final String SORT_DIR = "asc"; // Default sorting direction (ascending)

    // User and Admin IDs
    public static final Long ADMIN_ID = 101L; // Admin user ID
    public static final Long USER_ID = 102L; // Regular user ID

    // JWT Token validity (in seconds)
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60; // 5 hours

    // Public URLs (accessible without authentication)
    public static final String[] PUBLIC_URLS = {
        "/v3/api-docs/**", 
        "/swagger-ui/**", 
        "/api/register/**", 
        "/api/login", 
        "/api/public/products/**", // Public access to products
        "/api/public/categories/**", // Public access to categories
        "/api/public/users/**" // Public access to users (if required)
    };

    // User URLs (accessible by authenticated users)
    public static final String[] USER_URLS = {
        "/api/public/**", // General public API access
        "/api/public/users/**", // User-specific access
        "/api/public/orders/**" // User-specific orders
    };

    // Admin URLs (accessible by admin users only)
    public static final String[] ADMIN_URLS = {
        "/api/admin/**", // General admin API access
        "/api/admin/users/**", // Admin-specific user management
        "/api/admin/products/**", // Admin-specific product management
        "/api/admin/categories/**", // Admin-specific category management
        "/api/admin/orders/**" // Admin-specific order management
    };
}