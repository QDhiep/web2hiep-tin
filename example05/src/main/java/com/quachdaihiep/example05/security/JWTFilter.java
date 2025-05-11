// // package com.quachdaihiep.example05.security;

// // import java.io.IOException;
// // import org.springframework.beans.factory.annotation.Autowired;
// // import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// // import org.springframework.security.core.context.SecurityContextHolder;
// // import org.springframework.security.core.userdetails.UserDetails;
// // import org.springframework.stereotype.Service;
// // import org.springframework.web.filter.OncePerRequestFilter;
// // import com.auth0.jwt.exceptions.JWTVerificationException;
// // import com.quachdaihiep.example05.service.impl.UserDetailsServiceImpl;

// // import jakarta.servlet.FilterChain;
// // import jakarta.servlet.ServletException;
// // import jakarta.servlet.http.HttpServletRequest;
// // import jakarta.servlet.http.HttpServletResponse;

// // @Service
// // public class JWTFilter extends OncePerRequestFilter {

// //     @Autowired
// //     private JWTUtil jwtUtil;

// //     @Autowired
// //     private UserDetailsServiceImpl userDetailsServiceImpl;

// //     @Override
// //     protected void doFilterInternal(@SuppressWarnings("null") HttpServletRequest request,
// //             @SuppressWarnings("null") HttpServletResponse response, @SuppressWarnings("null") FilterChain filterChain)
// //             throws ServletException, IOException {
// //         String authHeader = request.getHeader("Authorization");
// //         if (authHeader != null && !authHeader.isBlank() && authHeader.startsWith("Bearer ")) {
// //             String jwt = authHeader.substring(7);
// //             if (jwt == null || jwt.isBlank()) {
// //                 response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invlaid JWT token in Bearer Header");
// //             } else {
// //                 try {
// //                     String email = jwtUtil.validateTokenAndRetrieveSubject(jwt);
// //                     UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(email);
// //                     UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
// //                             email, userDetails.getPassword(),
// //                             userDetails.getAuthorities());
// //                     if (SecurityContextHolder.getContext().getAuthentication() == null) {
// //                         SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
// //                     }
// //                 } catch (JWTVerificationException e) {
// //                     response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JWT Token");
// //                 }
// //             }
// //         }
// //         filterChain.doFilter(request, response);
// //     }
// // }
// package com.quachdaihiep.example05.security;

// import java.io.IOException;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.stereotype.Service;
// import org.springframework.web.filter.OncePerRequestFilter;

// import com.auth0.jwt.exceptions.JWTVerificationException;
// import com.quachdaihiep.example05.service.impl.UserDetailsServiceImpl;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// @Service
// public class JWTFilter extends OncePerRequestFilter {

//     @Autowired
//     private JWTUtil jwtUtil;

//     @Autowired
//     private UserDetailsServiceImpl userDetailsServiceImpl;

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//             throws ServletException, IOException {
        
//         String authHeader = request.getHeader("Authorization");
        
//         // Kiểm tra xem header có chứa Bearer token hay không
//         if (authHeader != null && !authHeader.isBlank() && authHeader.startsWith("Bearer ")) {
//             String jwt = authHeader.substring(7);  // Lấy JWT từ header
//             if (jwt == null || jwt.isBlank()) {
//                 response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JWT token in Bearer Header");
//                 return;  // Dừng lại nếu JWT không hợp lệ
//             } else {
//                 try {
//                     // Xác thực và lấy email từ JWT
//                     String email = jwtUtil.validateTokenAndRetrieveSubject(jwt);
                    
//                     // Tải thông tin người dùng từ email
//                     UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(email);
                    
//                     // Tạo đối tượng xác thực và lưu vào SecurityContext nếu chưa có
//                     UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//                             email, userDetails.getPassword(), userDetails.getAuthorities());
                    
//                     // Nếu SecurityContext chưa có thông tin xác thực, thêm vào
//                     if (SecurityContextHolder.getContext().getAuthentication() == null) {
//                         SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//                     }
//                 } catch (JWTVerificationException e) {
//                     // Nếu có lỗi trong quá trình xác thực JWT, trả về lỗi
//                     response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JWT Token");
//                     return;  // Dừng lại nếu JWT không hợp lệ
//                 }
//             }
//         }

//         // Tiến hành lọc yêu cầu qua filter chain
//         filterChain.doFilter(request, response);
//     }
// }
package com.quachdaihiep.example05.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.quachdaihiep.example05.service.impl.UserDetailsServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // Bỏ qua xác thực JWT cho các endpoint công khai
        if (path.startsWith("/api/public/") || path.startsWith("/api/auth/") || path.startsWith("/v3/api-docs/") || path.startsWith("/swagger-ui/")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        // Kiểm tra xem header có chứa Bearer token hay không
        if (authHeader != null && !authHeader.isBlank() && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7); // Lấy JWT từ header
            if (jwt == null || jwt.isBlank()) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JWT token in Bearer Header");
                return; // Dừng lại nếu JWT không hợp lệ
            } else {
                try {
                    // Xác thực và lấy email từ JWT
                    String email = jwtUtil.validateTokenAndRetrieveSubject(jwt);

                    // Tải thông tin người dùng từ email
                    UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(email);

                    // Tạo đối tượng xác thực và lưu vào SecurityContext nếu chưa có
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            email, userDetails.getPassword(), userDetails.getAuthorities());

                    // Nếu SecurityContext chưa có thông tin xác thực, thêm vào
                    if (SecurityContextHolder.getContext().getAuthentication() == null) {
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }
                } catch (JWTVerificationException e) {
                    // Nếu có lỗi trong quá trình xác thực JWT, trả về lỗi
                    response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JWT Token");
                    return; // Dừng lại nếu JWT không hợp lệ
                }
            }
        }

        // Tiến hành lọc yêu cầu qua filter chain
        filterChain.doFilter(request, response);
    }
}