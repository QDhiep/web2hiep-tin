package com.quachdaihiep.example05.service;

import com.quachdaihiep.example05.payloads.UserDTO;
import com.quachdaihiep.example05.payloads.UserReponse;

public interface UserService {
    UserDTO registerUser(UserDTO userDTO);

    UserDTO getUserByEmail(String email);

    UserReponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    UserDTO getUserById(Long userId);

    UserDTO updateUser(Long userId, UserDTO userDTO);

    String deleteUser(Long userId);
    // UserReponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    // UserDTO getUserById(Long userId);

    UserDTO createUser(UserDTO userDTO);

    // UserDTO updateUser(Long userId, UserDTO userDTO);

    // String deleteUser(Long userId);
}
