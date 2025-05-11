// // // import { AuthProvider } from "react-admin";
// // // import axios from "axios";

// // // interface LoginParams {
// // //   username: string;
// // //   password: string;
// // // }

// // // interface CheckParamsErr {
// // //   status: number;
// // // }

// // // export const authProvider = {
// // //   // called when the user attempts to log in
// // //   login: async ({ username, password }: LoginParams) => {
// // //     try {
// // //       const response = await axios.post(
// // //         "http://localhost:8080/api/login",
// // //         {
// // //           email: username,
// // //           password: password,
// // //         },
// // //         {
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //           },
// // //           withCredentials: true,
// // //         },
// // //       );

// // //       // Store the JWT token in local storage
// // //       const token = response.data["jwt-token"];
// // //       localStorage.setItem("jwt-token", token);
// // //       localStorage.setItem("username", username);

// // //       // Fetch user data to get cartId
// // //       const userResponse = await axios.get(
// // //         `http://localhost:8080/api/public/users/email/${username}`,
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         },
// // //       );

// // //       const cartId = userResponse.data.cart.cartId;
// // //       localStorage.setItem("cartId", cartId);

// // //       return Promise.resolve();
// // //     } catch (error) {
// // //       return Promise.reject(
// // //         new Error("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại."),
// // //       );
// // //     }
// // //   },

// // //   // called when the user clicks on the logout button
// // //   logout: () => {
// // //     localStorage.removeItem("jwt-token");
// // //     localStorage.removeItem("username");
// // //     return Promise.resolve();
// // //   },

// // //   // called when the API returns an error
// // //   checkError: ({ status }: CheckParamsErr) => {
// // //     if (status === 401 || status === 403) {
// // //       localStorage.removeItem("jwt-token");
// // //       localStorage.removeItem("username");
// // //       return Promise.reject();
// // //     }
// // //     return Promise.resolve();
// // //   },

// // //   // called when the user navigates to a new location, to check for authentication
// // //   checkAuth: () => {
// // //     return localStorage.getItem("jwt-token")
// // //       ? Promise.resolve()
// // //       : Promise.reject();
// // //   },

// // //   // called when the user navigates to a new location, to check for permissions / roles
// // //   getPermissions: () => Promise.resolve(),
// // // };
// // import { AuthProvider } from "react-admin";
// // import axios from "axios";

// // // Define the shape of login parameters
// // interface LoginParams {
// //   username: string;
// //   password: string;
// // }

// // // Define the shape of error parameters
// // interface CheckParamsErr {
// //   status: number;
// // }

// // export const authProvider: AuthProvider = {
// //   // Called when the user attempts to log in
// //   login: async ({ username, password }: LoginParams) => {
// //     try {
// //       const response = await axios.post(
// //         "http://localhost:8080/api/login",
// //         {
// //           email: username,
// //           password: password,
// //         },
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           withCredentials: true,
// //         },
// //       );

// //       console.log("Login response:", response.data);

// //       // Store the JWT token in local storage
// //       const token = response.data["jwt-token"];
// //       localStorage.setItem("jwt-token", token);
// //       localStorage.setItem("username", username);

// //       // Fetch userData to get cartId
// //       const userResponse = await axios.get(
// //         `http://localhost:8080/api/public/users/email/${username}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         },
// //       );

// //       console.log("User data response:", userResponse.data);

// //       // Check if cartDTO exists and has cartId
// //       const cartId = userResponse.data.cartDTO?.cartId;
// //       if (cartId) {
// //         localStorage.setItem("cartId", cartId);
// //       } else {
// //         console.warn("No cartId found in the user data response.");
// //         // Handle the case where cartId is not present
// //         // For example, you might want to set a default value or handle this scenario differently
// //       }

// //       return Promise.resolve();
// //     } catch (error) {
// //       console.error("Login error:", error.response || error.message);
// //       return Promise.reject(
// //         new Error("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại."),
// //       );
// //     }
// //   },

// //   // Called when the user clicks on the logout button
// //   logout: () => {
// //     localStorage.removeItem("jwt-token");
// //     localStorage.removeItem("username");
// //     localStorage.removeItem("cartId");
// //     return Promise.resolve();
// //   },

// //   // Called when the API returns an error
// //   checkError: ({ status }: CheckParamsErr) => {
// //     if (status === 401 || status === 403) {
// //       localStorage.removeItem("jwt-token");
// //       localStorage.removeItem("username");
// //       return Promise.reject();
// //     }
// //     return Promise.resolve();
// //   },

// //   // Called when the user navigates to a new location, to check for authentication
// //   checkAuth: () => {
// //     return localStorage.getItem("jwt-token")
// //       ? Promise.resolve()
// //       : Promise.reject();
// //   },

// //   // Called when the user navigates to a new location, to check for permissions / roles
// //   getPermissions: () => Promise.resolve(),
// // };
// import { AuthProvider } from "react-admin";
// import axios from "axios";

// // Định nghĩa kiểu của tham số đăng nhập
// interface LoginParams {
//   username: string;
//   password: string;
// }

// // Định nghĩa kiểu của tham số lỗi
// interface CheckParamsErr {
//   status: number;
// }

// export const authProvider: AuthProvider = {
//   // Được gọi khi người dùng cố gắng đăng nhập
//   login: async ({ username, password }: LoginParams) => {
//     try {
//       // Gửi yêu cầu đăng nhập tới API
//       const response = await axios.post(
//         "http://localhost:8080/api/login",
//         {
//           email: username,
//           password: password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true, // Đảm bảo gửi thông tin xác thực (cookies, token) với các yêu cầu
//         },
//       );

//       console.log("Phản hồi đăng nhập:", response.data);

//       // Lưu trữ JWT token vào local storage
//       const token = response.data["jwt-token"];
//       if (token) {
//         localStorage.setItem("jwt-token", token);
//         localStorage.setItem("username", username);

//         // Lấy thông tin người dùng để lấy cartId
//         const userResponse = await axios.get(
//           `http://localhost:8080/api/public/users/email/${username}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
//             },
//           },
//         );

//         console.log("Phản hồi thông tin người dùng:", userResponse.data);

//         // Kiểm tra xem cartDTO có tồn tại và có cartId không
//         const cartId = userResponse.data.cartDTO?.cartId;
//         if (cartId) {
//           localStorage.setItem("cartId", cartId);
//         } else {
//           console.warn("Không tìm thấy cartId trong phản hồi thông tin người dùng.");
//         }
//       } else {
//         throw new Error("Đăng nhập thất bại: Không nhận được token.");
//       }

//       return Promise.resolve();
//     } catch (error) {
//       console.error("Lỗi đăng nhập:", error.response || error.message);
//       return Promise.reject(
//         new Error("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại."),
//       );
//     }
//   },

//   // Được gọi khi người dùng nhấp vào nút đăng xuất
//   logout: () => {
//     localStorage.removeItem("jwt-token");
//     localStorage.removeItem("username");
//     localStorage.removeItem("cartId");
//     return Promise.resolve();
//   },

//   // Được gọi khi API trả về lỗi
//   checkError: ({ status }: CheckParamsErr) => {
//     if (status === 401 || status === 403) {
//       localStorage.removeItem("jwt-token");
//       localStorage.removeItem("username");
//       localStorage.removeItem("cartId");
//       return Promise.reject();
//     }
//     return Promise.resolve();
//   },

//   // Được gọi khi người dùng điều hướng đến một vị trí mới, để kiểm tra xác thực
//   checkAuth: () => {
//     return localStorage.getItem("jwt-token")
//       ? Promise.resolve()
//       : Promise.reject(new Error("Bạn phải đăng nhập"));
//   },

//   // Được gọi khi người dùng điều hướng đến một vị trí mới, để kiểm tra quyền truy cập
//   getPermissions: () => Promise.resolve(),
// };
import { AuthProvider } from "react-admin";
import axios from "axios";

// Định nghĩa kiểu của tham số đăng nhập
interface LoginParams {
  username: string;
  password: string;
}

// Định nghĩa kiểu của tham số lỗi
interface CheckParamsErr {
  status: number;
}

export const authProvider: AuthProvider = {
  // Được gọi khi người dùng cố gắng đăng nhập
  login: async ({ username, password }: LoginParams) => {
    try {
      // Gửi yêu cầu đăng nhập tới API
      const response = await axios.post(
        "http://localhost:8080/api/login",
        {
          email: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Đảm bảo gửi thông tin xác thực (cookies, token) với các yêu cầu
        },
      );

      console.log("Phản hồi đăng nhập:", response.data);

      // Lưu trữ JWT token vào local storage
      const token = response.data["jwt-token"];
      if (token) {
        localStorage.setItem("jwt-token", token);
        localStorage.setItem("username", username);

        // Lấy thông tin người dùng để lấy cartId
        const userResponse = await axios.get(
          `http://localhost:8080/api/public/users/email/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
            },
          },
        );

        console.log("Phản hồi thông tin người dùng:", userResponse.data);

        // Kiểm tra xem cartDTO có tồn tại và có cartId không
        const cartId = userResponse.data.cartDTO?.cartId;
        if (cartId) {
          localStorage.setItem("cartId", cartId);
        } else {
          console.warn("Không tìm thấy cartId trong phản hồi thông tin người dùng.");
        }
      } else {
        throw new Error("Đăng nhập thất bại: Không nhận được token.");
      }

      return Promise.resolve();
    } catch (error) {
      // Kiểm tra kiểu của lỗi và xử lý đúng cách
      if (error instanceof Error) {
        console.error("Lỗi đăng nhập:", error.message);
      } else {
        console.error("Lỗi không xác định:", error);
      }
      return Promise.reject(
        new Error("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại."),
      );
    }
  },

  // Được gọi khi người dùng nhấp vào nút đăng xuất
  logout: () => {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("username");
    localStorage.removeItem("cartId");
    return Promise.resolve();
  },

  // Được gọi khi API trả về lỗi
  checkError: ({ status }: CheckParamsErr) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("jwt-token");
      localStorage.removeItem("username");
      localStorage.removeItem("cartId");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Được gọi khi người dùng điều hướng đến một vị trí mới, để kiểm tra xác thực
  checkAuth: () => {
    return localStorage.getItem("jwt-token")
      ? Promise.resolve()
      : Promise.reject(new Error("Bạn phải đăng nhập"));
  },

  // Được gọi khi người dùng điều hướng đến một vị trí mới, để kiểm tra quyền truy cập
  getPermissions: () => Promise.resolve(),
};
