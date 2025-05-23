package com.quachdaihiep.example05.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quachdaihiep.example05.config.AppConstants;
import com.quachdaihiep.example05.payloads.OrderDTO;
import com.quachdaihiep.example05.payloads.OrderReponse;
import com.quachdaihiep.example05.service.OrderService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "E-Commerce Application")
public class OrderController {
    @Autowired
    public OrderService orderService;

    @PostMapping("/public/users/{email}/carts/{cartId}/payments/{paymentMethod}/order")
    public ResponseEntity<OrderDTO> orderProducts(@PathVariable String email, @PathVariable Long cartId,
            @PathVariable String paymentMethod) {
        OrderDTO order = orderService.placeOrder(email, cartId, paymentMethod);
        return new ResponseEntity<OrderDTO>(order, HttpStatus.CREATED);
    }

    @GetMapping("/admin/orders")
    public ResponseEntity<OrderReponse> getAllOrders(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,

            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_ORDERS_BY, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {
        OrderReponse orderResponse = orderService.getAllOrders(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<OrderReponse>(orderResponse, HttpStatus.FOUND);
    }

    @GetMapping("public/users/{email}/orders")
    public ResponseEntity<List<OrderDTO>> getOrdersByUser(@PathVariable String email) {
        List<OrderDTO> orders = orderService.getOrdersByUser(email);
        return new ResponseEntity<List<OrderDTO>>(orders, HttpStatus.FOUND);
    }

    @GetMapping("public/users/{email}/orders/{orderId}")
    public ResponseEntity<OrderDTO> getOrderByUser(@PathVariable String email, @PathVariable Long orderId) {
        OrderDTO order = orderService.getOrder(email, orderId);
        return new ResponseEntity<OrderDTO>(order, HttpStatus.FOUND);
    }

    @PutMapping("admin/users/{email}/orders/{orderId}/orderStatus/{orderStatus}")

    public ResponseEntity<OrderDTO> updateOrderByUser(@PathVariable String email, @PathVariable Long orderId,
            @PathVariable String orderStatus) {
        OrderDTO order = orderService.updateOrder(email, orderId, orderStatus);
        return new ResponseEntity<OrderDTO>(order, HttpStatus.OK);
    }
}