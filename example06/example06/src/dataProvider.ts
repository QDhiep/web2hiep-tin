
  // import axios from "axios";
  // import {
  //   CreateParams,
  //   CreateResult,
  //   DataProvider,
  //   DeleteManyParams,
  //   DeleteManyResult,
  //   DeleteParams,
  //   DeleteResult,
  //   GetManyResult,
  //   GetManyParams,
  //   GetOneParams,
  //   GetOneResult,
  //   UpdateParams,
  //   UpdateResult,
  // } from "react-admin";

  // const apiUrl = "http://localhost:8080/api";
  // const baseUrl = "http://localhost:8080/api/public/products/image/";

  // const httpClient = {
  //   get: (url: string) => {
  //     return axios
  //       .get(url, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       })
  //       .then((response) => ({ json: response.data }))
  //       .catch((error) => {
  //         console.error("API request failed:", error);
  //         throw error;
  //       });
  //   },

  //   post: (url: string, data: any) => {
  //     return axios
  //       .post(url, data, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       })
  //       .then((response) => ({ json: response.data }))
  //       .catch((error) => {
  //         console.error("API request failed:", error);
  //         throw error;
  //       });
  //   },

  //   put: (url: string, data: any) => {
  //     return axios
  //       .put(url, data, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       })
  //       .then((response) => ({ json: response.data }))
  //       .catch((error) => {
  //         console.error("PUT request failed:", error);
  //         throw error;
  //       });
  //   },

  //   delete: (url: string) => {
  //     return axios
  //       .delete(url, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       })
  //       .then((response) => ({ json: response.data }))
  //       .catch((error) => {
  //         console.error("DELETE request failed:", error);
  //         throw error;
  //       });
  //   },
  // };

  // export const dataProvider: DataProvider = {
  //   getList: (resource, params) => {
  //     const { page = 0, perPage = 10 } = params.pagination;
  //     const { field = "id", order = "ASC" } = params.sort;

  //     const query = {
  //       pageNumber: page.toString(),
  //       pageSize: perPage.toString(),
  //       sortBy: field,
  //       sortOrder: order,
  //     };

  //     let url: string;

  //     if (resource === "products") {
  //       url = `${apiUrl}/public/products?${new URLSearchParams(query).toString()}`;
  //     } else if (resource === "users") {
  //       url = `${apiUrl}/admin/users?${new URLSearchParams(query).toString()}`;
  //     } else if (resource === "categories") {
  //       url = `${apiUrl}/public/categories?${new URLSearchParams(query).toString()}`;
  //     } else if (resource === "carts") {
  //       url = `${apiUrl}/admin/carts?${new URLSearchParams(query).toString()}`;
        
  //     } else {
  //       return Promise.reject(new Error(`Unknown resource: ${resource}`));
  //     }

  //     return httpClient.get(url).then(({ json }) => ({
  //       data: json.content.map((item: any) => ({
  //         id: item.productId || item.id || item.categoryId || item.userId || item.cartId,
  //         ...item,
  //         image: item.image ? `${baseUrl}${item.image}` : null, // Xử lý URL hình ảnh cho bảng products
  //       })),
  //       total: json.totalElements,
  //     }));
  //   },

  //   getOne: (resource, params) => {
  //     let url: string;

  //     if (resource === "products") {
  //       url = `${apiUrl}/public/products/${params.id}`;
  //     } else if (resource === "users") {
  //       url = `${apiUrl}/public/users/${params.id}`;
  //     } else if (resource === "categories") {
  //       url = `${apiUrl}/public/categories/${params.id}`;
  //     } else if (resource === "carts") {
  //       url = `${apiUrl}/public/carts/${params.id}`;
  //     } else {
  //       return Promise.reject(new Error(`Unknown resource: ${resource}`));
  //     }

  //     return httpClient.get(url).then(({ json }) => ({
  //       data: {
  //         id: params.id,
  //         ...json,
  //         image: json.image ? `${baseUrl}${json.image}` : null, // Xử lý URL hình ảnh cho bảng products
  //       },
  //     }));
  //   },

  //   create: (resource, params) => {
  //     let url: string;
  //     let data: any;

  //     if (resource === "products") {
  //       url = `${apiUrl}/admin/categories/${params.data.categoryId}/products`;
  //       data = {
  //         productName: params.data.productName,
  //         price: params.data.price,
  //         description: params.data.description || "",
  //         quantity: params.data.quantity,
  //         discount: params.data.discount || 0,
  //         specialPrice: params.data.specialPrice || params.data.price,
  //         image: params.data.image || "default.png",
  //       };
  //     } else if (resource === "users") {
  //       url = `${apiUrl}/admin/users`;
  //       data = {
  //         firstName: params.data.firstName,
  //         lastName: params.data.lastName,
  //         email: params.data.email,
  //         password: params.data.password,
  //         mobileNumber: params.data.mobileNumber,
  //       };
  //     } else if (resource === "categories") {
  //       url = `${apiUrl}/admin/categories`;
  //       data = { categoryName: params.data.categoryName };
  //     } else if (resource === "carts") {
  //       url = `${apiUrl}/public/carts/${params.data.cartId}/products/${params.data.productId}/quantity/${params.data.quantity}`;
  //     } else {
  //       return Promise.reject(new Error(`Unknown resource: ${resource}`));
  //     }

  //     return httpClient.post(url, data).then(({ json }) => ({
  //       data: { id: json.productId || json.id || json.categoryId || json.userId || json.cartId, ...json },
  //     }));
  //   },

  //   update: (resource, params) => {
  //     let url: string;

  //     if (resource === "products") {
  //       url = `${apiUrl}/admin/products/${params.id}`;
  //     } else if (resource === "users") {
  //       url = `${apiUrl}/public/users/${params.id}`;
  //     } else if (resource === "categories") {
  //       url = `${apiUrl}/admin/categories/${params.id}`;
  //     } else if (resource === "carts") {
  //       url = `${apiUrl}/public/carts/${params.data.cartId}/products/${params.data.productId}/quantity/${params.data.quantity}`;
  //     } else {
  //       return Promise.reject(new Error(`Unknown resource: ${resource}`));
  //     }

  //     return httpClient.put(url, params.data).then(({ json }) => ({
  //       data: { id: params.id, ...json },
  //     }));
  //   },

  //   delete: (resource, params) => {
  //     let url: string;

  //     if (resource === "products") {
  //       url = `${apiUrl}/admin/products/${params.id}`;
  //     } else if (resource === "users") {
  //       url = `${apiUrl}/admin/users/${params.id}`;
  //     } else if (resource === "categories") {
  //       url = `${apiUrl}/admin/categories/${params.id}`;
  //     } else if (resource === "carts") {
  //       url = `${apiUrl}/public/carts/${params.id.cartId}/products/${params.id.productId}`;
  //     } else {
  //       return Promise.reject(new Error(`Unknown resource: ${resource}`));
  //     }

  //     return httpClient.delete(url).then(({ json }) => ({
  //       data: json,
  //     }));
  //   },

  //   deleteMany: (resource, params) => {
  //     let url: string;

  //     if (resource === "products") {
  //       url = `${apiUrl}/admin/products`;
  //     } else if (resource === "users") {
  //       url = `${apiUrl}/admin/users`;
  //     } else if (resource === "categories") {
  //       url = `${apiUrl}/admin/categories`;
  //     } else if (resource === "carts") {
  //       url = `${apiUrl}/admin/carts`;
  //     } else {
  //       return Promise.reject(new Error(`Unknown resource: ${resource}`));
  //     }

  //     return httpClient
  //       .delete(url, { data: { ids: params.ids } })
  //       .then(({ json }) => ({ data: params.ids }));
  //   },

  //   getMany: (resource, params) => {
  //     const query = {
  //         ids: params.ids.join(","),
  //     };

  //     let url: string;

  //     if (resource === "products") {
  //         url = `${apiUrl}/public/products?${new URLSearchParams(query).toString()}`;
  //     } else if (resource === "users") {
  //         url = `${apiUrl}/admin/users?${new URLSearchParams(query).toString()}`;
  //     } else if (resource === "categories") {
  //         url = `${apiUrl}/public/categories?${new URLSearchParams(query).toString()}`;
  //     } else if (resource === "carts") {
  //         url = `${apiUrl}/admin/carts?${new URLSearchParams(query).toString()}`;
  //     } else {
  //         return Promise.reject(new Error(`Unknown resource: ${resource}`));
  //     }

  //     return httpClient.get(url).then(({ json }) => {
  //         // Nếu API trả về đối tượng chứa mảng trong `content`
  //         const data = json.content || json;

  //         if (!Array.isArray(data)) {
  //             throw new Error("API response is not an array");
  //         }

  //         return {
  //             data: data.map((item: any) => ({
  //                 id: item.productId || item.id || item.categoryId || item.userId || item.cartId,
  //                 ...item,
  //             })),
  //         };
  //     });
  // },
  // };
  import axios from "axios";
import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetManyResult,
  GetManyParams,
  GetOneParams,
  GetOneResult,
  UpdateParams,
  UpdateResult,
} from "react-admin";

const apiUrl = "http://localhost:8080/api";
const baseUrl = "http://localhost:8080/api/public/products/image/";

const httpClient = {
  get: (url: string) => {
    return axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => ({ json: response.data }))
      .catch((error) => {
        console.error("API request failed:", error);
        throw error;
      });
  },

  post: (url: string, data: any) => {
    return axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => ({ json: response.data }))
      .catch((error) => {
        console.error("API request failed:", error);
        throw error;
      });
  },

  put: (url: string, data: any) => {
    return axios
      .put(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => ({ json: response.data }))
      .catch((error) => {
        console.error("PUT request failed:", error);
        throw error;
      });
  },

  delete: (url: string) => {
    return axios
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => ({ json: response.data }))
      .catch((error) => {
        console.error("DELETE request failed:", error);
        throw error;
      });
  },
};

export const dataProvider: DataProvider = {
  getList: (resource, params) => {
    const { page = 0, perPage = 10 } = params.pagination;
    const { field = "id", order = "ASC" } = params.sort;

    const query = {
      pageNumber: page.toString(),
      pageSize: perPage.toString(),
      sortBy: field,
      sortOrder: order,
    };

    let url: string;

    if (resource === "products") {
      url = `${apiUrl}/public/products?${new URLSearchParams(query).toString()}`;
    } else if (resource === "users") {
      url = `${apiUrl}/admin/users?${new URLSearchParams(query).toString()}`;
    } else if (resource === "categories") {
      url = `${apiUrl}/public/categories?${new URLSearchParams(query).toString()}`;
    } else if (resource === "carts") {
      url = `${apiUrl}/admin/carts?${new URLSearchParams(query).toString()}`;
    } else {
      return Promise.reject(new Error(`Unknown resource: ${resource}`));
    }

    return httpClient.get(url).then(({ json }) => ({
      data: json.content.map((item: any) => ({
        id: item.cartId || item.productId || item.id || item.categoryId || item.userId,
        ...item,
        image: item.image ? `${baseUrl}${item.image}` : null, // Đảm bảo URL hình ảnh chính xác
      })),
      total: json.totalElements,
    }));
  },

  getOne: (resource, params) => {
    let url: string;

    if (resource === "products") {
      url = `${apiUrl}/public/products/${params.id}`;
    } else if (resource === "users") {
      url = `${apiUrl}/public/users/${params.id}`;
    } else if (resource === "categories") {
      url = `${apiUrl}/public/categories/${params.id}`;
    } else if (resource === "carts") {
      url = `${apiUrl}/public/carts/${params.id}`;
    } else {
      return Promise.reject(new Error(`Unknown resource: ${resource}`));
    }

    return httpClient.get(url).then(({ json }) => ({
      data: {
        id: json.cartId || params.id,
        ...json,
      },
    }));
  },
//   create: (resource, params) => {
//     let url: string;
//     let data: any;

//     if (resource === "products") {
//         url = `${apiUrl}/admin/categories/${params.data.categoryId}/products`;
//         data = {
//             productName: params.data.productName,
//             price: params.data.price,
//             description: params.data.description || "",
//             quantity: params.data.quantity,
//             discount: params.data.discount || 0,
//             specialPrice: params.data.specialPrice || params.data.price,
//             image: params.data.image || "default.png",
//         };

//         // Kiểm tra dữ liệu trước khi gửi
//         if (!data.productName || !data.price || !data.quantity) {
//             throw new Error("Missing required fields for creating a product");
//         }
//     } else if (resource === "carts") {
//         url = `${apiUrl}/public/carts/${params.data.cartId}/products/${params.data.productId}/quantity/${params.data.quantity}`;
//         data = {
//             cartId: params.data.cartId,
//             productId: params.data.productId,
//             quantity: params.data.quantity,
//         };

//         // Kiểm tra dữ liệu trước khi gửi
//         if (!data.cartId || !data.productId || !data.quantity) {
//             throw new Error("Missing required fields for adding a product to cart");
//         }
//     } else {
//         return Promise.reject(new Error(`Unknown resource: ${resource}`));
//     }

//     return httpClient.post(url, data).then(({ json }) => ({
//         data: { id: json.id || json.productId || json.cartId, ...json },
//     }));
// },
create: (resource, params) => {
  let url: string;
  let data: any;

  if (resource === "products") {
      url = `${apiUrl}/admin/categories/${params.data.categoryId}/products`;
      data = {
          productName: params.data.productName,
          price: params.data.price,
          description: params.data.description || "",
          quantity: params.data.quantity,
          discount: params.data.discount || 0,
          specialPrice: params.data.specialPrice || params.data.price,
          image: params.data.image || "default.png",
      };
  } else if (resource === "users") {
      url = `${apiUrl}/admin/users`;
      data = {
          firstName: params.data.firstName,
          lastName: params.data.lastName,
          email: params.data.email,
          password: params.data.password,
          mobileNumber: params.data.mobileNumber,
      };
  } else if (resource === "categories") {
      url = `${apiUrl}/admin/categories`;
      data = {
          categoryName: params.data.categoryName,
      };
  } else if (resource === "carts") {
      url = `${apiUrl}/public/carts/${params.data.cartId}/products/${params.data.productId}/quantity/${params.data.quantity}`;
      data = {
          cartId: params.data.cartId,
          productId: params.data.productId,
          quantity: params.data.quantity,
      };

      // Kiểm tra dữ liệu trước khi gửi
      if (!data.cartId || !data.productId || !data.quantity) {
          throw new Error("Missing required fields for adding a product to cart");
      }
  } else {
      return Promise.reject(new Error(`Unknown resource: ${resource}`));
  }

  return httpClient.post(url, data).then(({ json }) => ({
      data: { id: json.id || json.productId || json.categoryId || json.userId || json.cartId, ...json },
  }));
},
  update: (resource, params) => {
    let url: string;

    if (resource === "products") {
      url = `${apiUrl}/admin/products/${params.id}`;
    } else if (resource === "users") {
      url = `${apiUrl}/public/users/${params.id}`;
    } else if (resource === "categories") {
      url = `${apiUrl}/admin/categories/${params.id}`;
    } else if (resource === "carts") {
      url = `${apiUrl}/public/carts/${params.data.cartId}/products/${params.data.productId}/quantity/${params.data.quantity}`;
    } else {
      return Promise.reject(new Error(`Unknown resource: ${resource}`));
    }

    return httpClient.put(url, params.data).then(({ json }) => ({
      data: { id: json.cartId || params.id, ...json },
    }));
  },

  delete: (resource, params) => {
    let url: string;

    if (resource === "products") {
      url = `${apiUrl}/admin/products/${params.id}`;
    } else if (resource === "users") {
      url = `${apiUrl}/admin/users/${params.id}`;
    } else if (resource === "categories") {
      url = `${apiUrl}/admin/categories/${params.id}`;
    } else if (resource === "carts") {
      url = `${apiUrl}/public/carts/${params.id.cartId}/products/${params.id.productId}`;
    } else {
      return Promise.reject(new Error(`Unknown resource: ${resource}`));
    }

    return httpClient.delete(url).then(({ json }) => ({
      data: json,
    }));
  },

  deleteMany: (resource, params) => {
    let url: string;

    if (resource === "products") {
      url = `${apiUrl}/admin/products`;
    } else if (resource === "users") {
      url = `${apiUrl}/admin/users`;
    } else if (resource === "categories") {
      url = `${apiUrl}/admin/categories`;
    } else if (resource === "carts") {
      url = `${apiUrl}/admin/carts`;
    } else {
      return Promise.reject(new Error(`Unknown resource: ${resource}`));
    }

    return httpClient
      .delete(url, { data: { ids: params.ids } })
      .then(({ json }) => ({ data: params.ids }));
  },

  getMany: (resource, params) => {
    const query = {
      ids: params.ids.join(","),
    };

    let url: string;

    if (resource === "products") {
      url = `${apiUrl}/public/products?${new URLSearchParams(query).toString()}`;
    } else if (resource === "users") {
      url = `${apiUrl}/admin/users?${new URLSearchParams(query).toString()}`;
    } else if (resource === "categories") {
      url = `${apiUrl}/public/categories?${new URLSearchParams(query).toString()}`;
    } else if (resource === "carts") {
      url = `${apiUrl}/admin/carts?${new URLSearchParams(query).toString()}`;
    } else {
      return Promise.reject(new Error(`Unknown resource: ${resource}`));
    }

    return httpClient.get(url).then(({ json }) => {
      const data = json.content || json;

      if (!Array.isArray(data)) {
        throw new Error("API response is not an array");
      }

      return {
        data: data.map((item: any) => ({
          id: item.cartId || item.productId || item.id || item.categoryId || item.userId,
          ...item,
        })),
      };
    });
  },
};