// package com.minhhoai.example05.entity;

// import java.util.ArrayList;
// import java.util.List;

// import jakarta.persistence.CascadeType;
// import jakarta.persistence.Entity;
// import jakarta.persistence.FetchType;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.OneToMany;
// import jakarta.persistence.Table;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.Size;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Entity
// @Table(name = "products")
// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// public class Product {
//     @Id
//     @GeneratedValue(strategy = GenerationType.AUTO)
//     private Long productId;
//     @NotBlank
//     @Size(min = 3, message = "product name must contain only letters 3 characters")
//     private String productName;
//     private String image;
//     @NotBlank
//     @Size(min = 6, message = "product name must contain only letters 6 characters")
//     private String description;
//     private double price;
//     private double discount;
//     private double specialPrice;

//     @ManyToOne
//     @JoinColumn(name = "category_id")
//     private Category category;

//     @OneToMany(mappedBy = "product", cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.EAGER)
//     private List<CartItem> products = new ArrayList<>();

//     @OneToMany(mappedBy = "product", cascade = { CascadeType.ALL, CascadeType.MERGE })
//     private List<OrderItem> orderItems = new ArrayList<>();

//     public int getQuantity() {
//         // TODO Auto-generated method stub
//         throw new UnsupportedOperationException("Unimplemented method 'getQuantity'");
//     }

//     public void setQuantity(int i) {
//         // TODO Auto-generated method stub
//         throw new UnsupportedOperationException("Unimplemented method 'setQuantity'");
//     }

// }
package com.quachdaihiep.example05.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long productId;

    @NotBlank
    @Size(min = 3, message = "product name must contain only letters 3 characters")
    private String productName;

    private String image;

    @NotBlank
    @Size(min = 6, message = "product name must contain only letters 6 characters")
    private String description;

    private double price;
    private double discount;
    private double specialPrice;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product", cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.EAGER)
    private List<CartItem> products = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = { CascadeType.ALL, CascadeType.MERGE })
    private List<OrderItem> orderItems = new ArrayList<>();

    // New field for quantity
    private int quantity;

    // Implement the getter method for quantity
    public int getQuantity() {
        return this.quantity;
    }

    // Implement the setter method for quantity
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
