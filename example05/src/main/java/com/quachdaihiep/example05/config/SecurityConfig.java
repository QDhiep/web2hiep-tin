
// package com.quachdaihiep.example05.config;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import com.quachdaihiep.example05.security.JWTFilter;
// import com.quachdaihiep.example05.service.impl.UserDetailsServiceImpl;

// import jakarta.servlet.http.HttpServletResponse;

// @Configuration
// @EnableWebSecurity
// @EnableMethodSecurity
// public class SecurityConfig {

//     @Autowired
//     private JWTFilter jwtFilter;

//     @Autowired
//     private UserDetailsServiceImpl userDetailsServiceImpl;

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//                 .csrf(csrf -> csrf.disable())
//                 .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Cấu hình CORS
//                 .authorizeHttpRequests(requests -> requests
//                         .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll() // Cho phép
//                                                                                                                // truy cập
//                                                                                                                // tài liệu
//                                                                                                                // Swagger
//                         .requestMatchers("/api/auth/login", "/api/auth/register","/api/admin/users").permitAll() // Cho phép truy cập  
//                                                                                           // công khai tới các
//                                                                                           // URL đăng nhập và
//                                                                                           // đăng ký    
//                         .requestMatchers("/api/public/products/image/**").permitAll() // Cho phép truy cập công khai tới
//                                                                                       // hình ảnh
//                         .requestMatchers(AppConstants.PUBLIC_URLS).permitAll() // Cho phép truy cập các URL công khai
//                         .requestMatchers(AppConstants.USER_URLS).hasAnyAuthority("USER", "ADMIN") // Bảo vệ các URL cho
//                                                                                                   // USER và ADMIN
//                         .requestMatchers(AppConstants.ADMIN_URLS).hasAuthority("ADMIN") // Bảo vệ các URL chỉ dành cho
//                                                                                         // ADMIN
//                         .anyRequest().authenticated()) // Yêu cầu xác thực cho các yêu cầu còn lại
//                 .exceptionHandling(handling -> handling.authenticationEntryPoint(
//                         (request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
//                                 "Unauthorized"))) // Xử lý lỗi 401 Unauthorized
//                 .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // Sử
//                                                                                                                      // dụng
//                                                                                                                      // session
//                                                                                                                      // stateless
//         http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); // Thêm JWT filter trước
//                                                                                      // UsernamePasswordAuthenticationFilter
//         http.authenticationProvider(daoAuthenticationProvider()); // Sử dụng DaoAuthenticationProvider

//         return http.build();
//     }

//     @Bean
//     public DaoAuthenticationProvider daoAuthenticationProvider() {
//         DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//         provider.setUserDetailsService(userDetailsServiceImpl);
//         provider.setPasswordEncoder(passwordEncoder()); // Sử dụng PasswordEncoder
//         return provider;
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder(); // Sử dụng BCryptPasswordEncoder để mã hóa mật khẩu
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
//         return configuration.getAuthenticationManager(); // Lấy AuthenticationManager từ cấu hình
//     }

//     // @Bean
//     // public CorsConfigurationSource corsConfigurationSource() {
//     //     CorsConfiguration configuration = new CorsConfiguration();
//     //     configuration.setAllowedOriginPatterns(List.of("*")); // Cho phép tất cả các nguồn gốc
//     //     configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Các phương thức HTTP
//     //                                                                                          // được phép
//     //     configuration.setAllowedHeaders(List.of("Authorization", "Content-Type")); // Các header được phép
//     //     configuration.setAllowCredentials(true); // Cho phép gửi thông tin đăng nhập (cookies, authorization headers)

//     //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//     //     source.registerCorsConfiguration("/**", configuration); // Áp dụng cấu hình CORS cho tất cả các đường dẫn
//     //     return source;
//     // }
//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//     CorsConfiguration configuration = new CorsConfiguration();
//     configuration.setAllowedOriginPatterns(List.of("*"));
//     configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//     configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
//     configuration.setAllowCredentials(true);  // Quan trọng để cho phép thông tin xác thực (như cookies hoặc headers)
    
//     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//     source.registerCorsConfiguration("/**", configuration);
//     return source;
// }

// }
package com.quachdaihiep.example05.config;

import java.util.List;

import org.springframework.http.HttpMethod;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Tắt CSRF
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Cấu hình CORS
                .authorizeHttpRequests(requests -> requests
                .requestMatchers(HttpMethod.POST, "/api/admin/users").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/admin/carts").permitAll()

                        .anyRequest().permitAll()) // Cho phép tất cả các yêu cầu mà không cần xác thực
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // Sử dụng session stateless

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Sử dụng BCryptPasswordEncoder để mã hóa mật khẩu
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager(); // Lấy AuthenticationManager từ cấu hình
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*")); // Cho phép tất cả các nguồn gốc
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Các phương thức HTTP được phép
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type")); // Các header được phép
        configuration.setAllowCredentials(true); // Cho phép gửi thông tin xác thực (cookies, authorization headers)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Áp dụng cấu hình CORS cho tất cả các đường dẫn
        return source;
    }
}