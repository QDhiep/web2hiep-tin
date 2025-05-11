
package com.quachdaihiep.example05.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.quachdaihiep.example05.config.AppConstants;
import com.quachdaihiep.example05.entity.Role;
import com.quachdaihiep.example05.entity.User;
import com.quachdaihiep.example05.exceptions.APIException;
import com.quachdaihiep.example05.exceptions.ResourceNotFoundException;
import com.quachdaihiep.example05.payloads.UserDTO;
import com.quachdaihiep.example05.payloads.UserReponse;
import com.quachdaihiep.example05.repository.RoleRepo;
import com.quachdaihiep.example05.repository.UserRepo;
import com.quachdaihiep.example05.service.UserService;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        // Chuyển đổi từ DTO sang Entity
        User user = modelMapper.map(userDTO, User.class);

        // Mã hóa mật khẩu
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Gán vai trò mặc định cho user
        Role role = roleRepo.findById(AppConstants.USER_ID)
                .orElseThrow(() -> new ResourceNotFoundException("Role", "id", AppConstants.USER_ID));
        user.getRoles().add(role);

        // Lưu user vào cơ sở dữ liệu
        User savedUser = userRepo.save(user);

        // Chuyển đổi từ Entity sang DTO để trả về
        return modelMapper.map(savedUser, UserDTO.class);
    }

    @Override
    public UserDTO registerUser(UserDTO userDTO) {
        try {
            User user = modelMapper.map(userDTO, User.class);
            Role role = roleRepo.findById(AppConstants.USER_ID).get();
            user.getRoles().add(role);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User registeredUser = userRepo.save(user);
            return modelMapper.map(registeredUser, UserDTO.class);
        } catch (DataIntegrityViolationException e) {
            throw new APIException("User already exists with emailId: " + userDTO.getEmail());
        }
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public UserReponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        if ("id".equals(sortBy)) {
            sortBy = "userId";
        }
        // Xác định sắp xếp tăng/giảm
        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, sort); // pageNumber - 1 vì Pageable bắt đầu từ 0

        // Lấy dữ liệu từ cơ sở dữ liệu
        Page<User> usersPage = userRepo.findAll(pageable);

        // Chuyển đổi từ Entity sang DTO
        List<UserDTO> userDTOs = usersPage.getContent().stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());

        // Tạo đối tượng UserReponse để trả về
        UserReponse userReponse = new UserReponse();
        userReponse.setContent(userDTOs);
        userReponse.setPageNumber(usersPage.getNumber() + 1); // Trả về pageNumber bắt đầu từ 1
        userReponse.setPageSize(usersPage.getSize());
        userReponse.setTotalElements(usersPage.getTotalElements());
        userReponse.setTotalPages(usersPage.getTotalPages());
        userReponse.setLastPage(usersPage.isLast());

        return userReponse;
    }

    @Override
    public UserDTO getUserById(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public UserDTO updateUser(Long userId, UserDTO userDTO) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setMobileNumber(userDTO.getMobileNumber());

        User updatedUser = userRepo.save(user);
        return modelMapper.map(updatedUser, UserDTO.class);
    }

    @Override
    public String deleteUser(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        userRepo.delete(user);
        return "User with ID " + userId + " has been deleted successfully.";
    }
}