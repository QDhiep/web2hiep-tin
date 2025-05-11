package com.quachdaihiep.example05.service;

import java.util.List;

import com.quachdaihiep.example05.payloads.OrderDTO;
import com.quachdaihiep.example05.payloads.OrderReponse;

public interface OrderService {
    OrderDTO placeOrder(String emailId, Long cartId, String paymentMethod);

    OrderDTO getOrder(String emailId, Long orderId);

    List<OrderDTO> getOrdersByUser(String emailId);

    OrderReponse getAllOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    OrderDTO updateOrder(String emailId, Long orderId, String orderStatus);
}
