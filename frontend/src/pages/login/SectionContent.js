import React, { useState, useEffect } from "react";
import { LOGIN } from "../../api/apiService";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login"; // Thư viện Facebook chính thức
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const SectionContent = () => {
  const [email, setEmail] = useState(""); // State cho email
  const [password, setPassword] = useState(""); // State cho mật khẩu
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [username, setUsername] = useState(""); // State để lưu tên người dùng
  const [isLoading, setIsLoading] = useState(false); // Trạng thái tải
  const navigate = useNavigate(); // Hook điều hướng của React Router

  // Xử lý khi người dùng gửi form đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Bắt đầu tải khi gửi form

    const body = { email, password };

    try {
      const response = await LOGIN(body); // Gọi API đăng nhập
      console.log("API Response:", response);

      // Kiểm tra token trong phản hồi
      const token = response.data?.["jwt-token"] || response["jwt-token"];
      const rawUsername =
        response.data?.username && response.data.username !== "string"
          ? response.data.username
          : response.data?.first_name ??
            response.data?.user?.first_name ??
            response.data?.email?.split("@")[0] ??
            "Hiep Tin";

      if (token) {
        // Lưu token và username vào localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("username", rawUsername);
        console.log("Đăng nhập thành công. Lưu token và tên người dùng.");
        window.alert("Đăng nhập thành công!");
        navigate("/"); // Điều hướng về trang chủ
      } else {
        console.error("Token không tìm thấy trong phản hồi");
        window.alert("Đăng nhập thất bại: Token không tìm thấy.");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      const errorMsg =
        error?.response?.data?.message ?? error.message ?? "Lỗi không xác định";
      window.alert("Đăng nhập thất bại: " + errorMsg);
    } finally {
      setIsLoading(false); // Dừng tải khi hoàn thành
    }
  };

  // Xử lý phản hồi từ đăng nhập Facebook
  const handleFacebookResponse = (response) => {
    console.log("Phản hồi đăng nhập Facebook:", response);
    if (response.authResponse) {
      const { accessToken, userID } = response.authResponse;
      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("userID", userID);
      console.log("Đăng nhập Facebook thành công.");
      window.alert("Đăng nhập Facebook thành công!");
      navigate("/"); // Điều hướng về trang chủ
    } else {
      console.error("Đăng nhập Facebook thất bại.");
      window.alert("Đăng nhập Facebook thất bại.");
    }
  };

  // Xử lý phản hồi từ đăng nhập Google
  const handleGoogleResponse = (response) => {
    console.log("Phản hồi đăng nhập Google:", response);
    if (response.credential) {
      localStorage.setItem("authToken", response.credential);
      console.log("Đăng nhập Google thành công.");
      window.alert("Đăng nhập Google thành công!");
      navigate("/"); // Điều hướng về trang chủ
    } else {
      console.error("Đăng nhập Google thất bại.");
      window.alert("Đăng nhập Google thất bại.");
    }
  };

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken");
      const storedUsername = localStorage.getItem("username");

      if (token && storedUsername) {
        setIsLoggedIn(true);
        setUsername(storedUsername);
      } else {
        setIsLoggedIn(false);
        setUsername("");
      }
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus); // Lắng nghe thay đổi trong localStorage

    return () => {
      window.removeEventListener("storage", checkLoginStatus); // Dọn dẹp khi component unmount
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId="107522701851-4pbk7o0khug7ke1lrpi19oicng8prb6s.apps.googleusercontent.com">
      <section className="section-content padding-y" style={{ minHeight: "84vh" }}>
        <div className="card mx-auto" style={{ maxWidth: "380px", marginTop: "100px" }}>
          <div className="card-body">
            <h4 className="card-title mb-4">Đăng nhập</h4>
            <form onSubmit={handleSubmit}>
              {/* Các nút đăng nhập mạng xã hội */}
              <div className="mb-3">
                <FacebookLogin
                  appId="YOUR_FACEBOOK_APP_ID"
                  callback={handleFacebookResponse}
                  render={(renderProps) => (
                    <button
                      className="btn btn-info btn-block mb-2"
                      onClick={renderProps.onClick}
                      disabled={renderProps.isDisabled}
                    >
                      Đăng nhập với Facebook
                    </button>
                  )}
                />
              </div>
              <div className="mb-3">
                <GoogleLogin
                  onSuccess={handleGoogleResponse}
                  onError={() => {
                    console.error("Đăng nhập Google thất bại.");
                    window.alert("Đăng nhập Google thất bại.");
                  }}
                  className="btn btn-danger btn-block"
                />
              </div>

              {/* Các trường nhập email và mật khẩu */}
              <div className="form-group">
                <input
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  name="password"
                  className="form-control"
                  placeholder="Mật khẩu"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              {/* Nút quên mật khẩu và ghi nhớ đăng nhập */}
              <div className="form-group">
                <a href="/forgot-password" className="float-right">
                  Quên mật khẩu?
                </a>
                <label className="float-left custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" />
                  <div className="custom-control-label">Ghi nhớ</div>
                </label>
              </div>

              {/* Nút gửi */}
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isLoading} // Vô hiệu hóa nút khi đang tải
                >
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Link đăng ký */}
        <p className="text-center mt-4">
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>
      </section>
    </GoogleOAuthProvider>
  );
};

export default SectionContent;