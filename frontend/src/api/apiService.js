import axiosInstance from "./axiosConfig";

// Gọi API tổng quát (có xử lý token nếu cần)
function callApi(endpoint, method = "GET", body = null, params = {}, withAuth = true) {
    const token = localStorage.getItem("authToken");
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    const config = {
        method,
        url,
        headers: {
            "Content-Type": "application/json",
            ...(withAuth && token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        ...(body && { data: body })
    };

    console.log("callApi url: ", url);
    console.log("callApi token: ", withAuth ? token : "(no auth)");

    return axiosInstance.request(config)
        .then((response) => response.data)
        .catch((error) => {
            console.error("API call error:", error);
            throw error;
        });
}

// ==== CRUD API ==== //
export function GET_ALL(endpoint, params = {}, withAuth = true) {
    return callApi(endpoint, "GET", null, params, withAuth);
}

export function GET_ID(endpoint, id, withAuth = true) {
    return callApi(`${endpoint}/${id}`, "GET", null, {}, withAuth);
}

export function POST_ADD(endpoint, data, withAuth = true) {
    return callApi(endpoint, "POST", data, {}, withAuth);
}

export function PUT_EDIT(endpoint, data, withAuth = true) {
    return callApi(endpoint, "PUT", data, {}, withAuth);
}

export function DELETE_ID(endpoint, data = null, withAuth = true) {
    return callApi(endpoint, "DELETE", data, {}, withAuth);
}

// ==== AUTH ==== //
export function LOGIN(body) {
    return axiosInstance.post("http://localhost:8080/api/login", body, {
        headers: { "Content-Type": "application/json" }
    }).catch((error) => {
        console.error("Login error:", error);
        throw error;
    });
}

export function REGISTER(userData) {
    return POST_ADD("/register", userData, false);
}

// ==== Tìm kiếm sản phẩm gần đúng (public) ==== //
export function searchProducts(keyword) {
    return GET_ALL("/public/products/search", { keyword }, false);
}
