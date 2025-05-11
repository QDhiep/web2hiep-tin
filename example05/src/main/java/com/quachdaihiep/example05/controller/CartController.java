// package com.quachdaihiep.example05.controller;

// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.quachdaihiep.example05.payloads.CartDTO;
// import com.quachdaihiep.example05.service.CartService;

// import io.swagger.v3.oas.annotations.security.SecurityRequirement;

// // @RestController
// // @RequestMapping("/api")
// // @SecurityRequirement(name = "E-Commerce Application")
// // @CrossOrigin(origins = "*")
// // public class CartController {

// //     @Autowired
// //     private CartService cartService;

// //     @PostMapping("/public/carts/{cartId}/products/{productId}/quantity/{quantity}")
// //     public ResponseEntity<CartDTO> addProductToCart(@PathVariable Long cartId, @PathVariable Long productId,
// //             @PathVariable Integer quantity) {
// //         CartDTO cartDTO = cartService.addProductToCart(cartId, productId, quantity);

// //         return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.CREATED);
// //     }

// //     @GetMapping("/admin/carts")
// //     public ResponseEntity<Map<String, List<CartDTO>>> getCarts() {
// //         List<CartDTO> cartDTOs = cartService.getAllCarts();

// //         Map<String, List<CartDTO>> response = new HashMap<>();
// //         response.put("content", cartDTOs);

// //         return new ResponseEntity<>(response, HttpStatus.OK);
// //     }

// //     @GetMapping("/public/users/{emailId}/carts/{cartId}")
// //     public ResponseEntity<CartDTO> getCartById(@PathVariable String emailId, @PathVariable Long cartId) {
// //         CartDTO cartDTO = cartService.getCart(cartId);

// //         return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.OK);
// //     }

// //     @PutMapping("/public/carts/{cartId}/products/{productId}/quantity/{quantity}")
// //     public ResponseEntity<CartDTO> updateCartProduct(@PathVariable Long cartId, @PathVariable Long productId,
// //             @PathVariable Integer quantity) {
// //         CartDTO cartDTO = cartService.updateProductQuantityInCart(cartId, productId, quantity);

// //         return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.OK);
// //     }

// //     @DeleteMapping("/public/carts/{cartId}/products/{productId}")
// //     public ResponseEntity<String> deleteProductFromCart(@PathVariable Long cartId, @PathVariable Long productId) {
// //         String status = cartService.deleteProductFromCart(cartId, productId);

// //         return new ResponseEntity<String>(status, HttpStatus.OK);
// //     }

// //     @GetMapping("/public/carts/{cartId}")
// //     public ResponseEntity<CartDTO> getCartById(@PathVariable Long cartId) {
// //         CartDTO cartDTO = cartService.getCart(cartId); // Use the updated method
// //         return new ResponseEntity<>(cartDTO, HttpStatus.OK);
// //     }
// // }
// @RestController
// @RequestMapping("/api")
// @SecurityRequirement(name = "E-Commerce Application")
// @CrossOrigin(origins = "*")
// public class CartController {

//     @Autowired
//     private CartService cartService;

//     @PostMapping("/public/carts/{cartId}/products/{productId}/quantity/{quantity}")
//     public ResponseEntity<CartDTO> addProductToCart(@PathVariable Long cartId, @PathVariable Long productId,
//             @PathVariable Integer quantity) {
//         CartDTO cartDTO = cartService.addProductToCart(cartId, productId, quantity);

//         return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.CREATED);
//     }

//     @GetMapping("/admin/carts")
//     public ResponseEntity<Map<String, List<CartDTO>>> getCarts() {
//         List<CartDTO> cartDTOs = cartService.getAllCarts();

//         Map<String, List<CartDTO>> response = new HashMap<>();
//         response.put("content", cartDTOs);

//         return new ResponseEntity<>(response, HttpStatus.OK);
//     }

//     @GetMapping("/public/users/{emailId}/carts/{cartId}")
//     public ResponseEntity<CartDTO> getCartById(@PathVariable String emailId, @PathVariable Long cartId) {
//         CartDTO cartDTO = cartService.getCart(cartId);

//         return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.OK);
//     }

//     @PutMapping("/public/carts/{cartId}/products/{productId}/quantity/{quantity}")
//     public ResponseEntity<CartDTO> updateCartProduct(@PathVariable Long cartId, @PathVariable Long productId,
//             @PathVariable Integer quantity) {
//         CartDTO cartDTO = cartService.updateProductQuantityInCart(cartId, productId, quantity);

//         return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.OK);
//     }

//     @DeleteMapping("/public/carts/{cartId}/products/{productId}")
//     public ResponseEntity<String> deleteProductFromCart(@PathVariable Long cartId, @PathVariable Long productId) {
//         String status = cartService.deleteProductFromCart(cartId, productId);

//         return new ResponseEntity<String>(status, HttpStatus.OK);
//     }

//     @GetMapping("/public/carts/{cartId}")
//     public ResponseEntity<CartDTO> getCartById(@PathVariable Long cartId) {
//         CartDTO cartDTO = cartService.getCart(cartId); // Use the updated method
//         return new ResponseEntity<>(cartDTO, HttpStatus.OK);
//     }

// }
package com.quachdaihiep.example05.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.quachdaihiep.example05.payloads.CartDTO;
import com.quachdaihiep.example05.service.CartService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "E-Commerce Application")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    // Thêm sản phẩm vào giỏ hàng
    @PostMapping("/public/carts/{cartId}/products/{productId}/quantity/{quantity}")
    public ResponseEntity<CartDTO> addProductToCart(
            @PathVariable Long cartId,
            @PathVariable Long productId,
            @PathVariable Integer quantity) {
        CartDTO cartDTO = cartService.addProductToCart(cartId, productId, quantity);
        return new ResponseEntity<>(cartDTO, HttpStatus.CREATED);
    }

    // Lấy danh sách tất cả các giỏ hàng
    @GetMapping("/admin/carts")
    public ResponseEntity<Map<String, List<CartDTO>>> getAllCarts() {
        List<CartDTO> cartDTOs = cartService.getAllCarts();
        Map<String, List<CartDTO>> response = new HashMap<>();
        response.put("content", cartDTOs);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Lấy chi tiết giỏ hàng theo ID
    @GetMapping("/public/carts/{cartId}")
    public ResponseEntity<CartDTO> getCartById(@PathVariable Long cartId) {
        CartDTO cartDTO = cartService.getCart(cartId);
        return new ResponseEntity<>(cartDTO, HttpStatus.OK);
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    @PutMapping("/public/carts/{cartId}/products/{productId}/quantity/{quantity}")
    public ResponseEntity<CartDTO> updateProductQuantityInCart(
            @PathVariable Long cartId,
            @PathVariable Long productId,
            @PathVariable Integer quantity) {
        CartDTO cartDTO = cartService.updateProductQuantityInCart(cartId, productId, quantity);
        return new ResponseEntity<>(cartDTO, HttpStatus.OK);
    }

    // Xóa sản phẩm khỏi giỏ hàng
    @DeleteMapping("/public/carts/{cartId}/products/{productId}")
    public ResponseEntity<String> deleteProductFromCart(
            @PathVariable Long cartId,
            @PathVariable Long productId) {
        String status = cartService.deleteProductFromCart(cartId, productId);
        return new ResponseEntity<>(status, HttpStatus.OK);
    }
}