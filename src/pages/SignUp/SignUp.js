import React from "react";
import "./SignUp.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authentication from "../../api/authentication";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    let response = await authentication.signUp(data);

    if (response.status === 200) {
      alert("Đăng ký thành công");
      navigate("/SignIn");
    }
  };

  return (
    <div className="sign-up">
      <div className="sign-up-container">
        <div className="sign-up-form">
          <h2 className="title">Đăng ký tài khoản</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Tên Người Dùng</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your text"
                  {...register("name", { required: "Name is required" })}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p className="errors" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your text"
                  {...register("email", {
                    required: "Email Address is required",
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="errors" role="alert">
                    {errors.email.message}
                  </p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className="errors">Invalid Email Address</p>
                )}
              </div>
              <div className="input-box">
                <span className="details">Số Điện Thoại</span>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your text"
                  {...register("phone", { required: true, minLength: 9 })}
                  aria-invalid={errors.phone ? "true" : "false"}
                />
                {errors.phone?.type === "required" && (
                  <p className="errors">phone is required</p>
                )}

                {errors.phone?.type === "minLength" && (
                  <p className="errors">phone must be 9 characters long</p>
                )}
              </div>
              <div className="input-box">
                <span className="details">Mật Khẩu</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your text"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password?.type === "required" && (
                  <p className="errors">password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="errors">Password must be 6 characters long</p>
                )}
              </div>

              <div className="input-box">
                <span className="details">Địa Chỉ</span>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your text"
                  {...register("address", { required: "Address is required" })}
                  aria-invalid={errors.address ? "true" : "false"}
                />
                {errors.address && (
                  <p className="errors" role="alert">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="input-box">
                <span className="details">Ngày Sinh</span>
                <input
                  type="date"
                  name="birthday"
                  placeholder="Enter your text"
                  {...register("birthday", {
                    required: true,
                  })}
                />
                {errors.birthday?.type === "required" && (
                  <p className="errors">birthday is required</p>
                )}
              </div>
              <div className="input-box gender">
                <span className="details">Giới Tính</span>

                <select
                  name="gender"
                  {...register("gender", { required: "gender is required" })}
                >
                  <option value="true">nam</option>
                  <option value="false">nữ</option>
                </select>
              </div>
            </div>
            <div className="btn-sign-up">
              <button type="submit">Đăng Ký</button>
            </div>

            <div className="nav-link">
              <NavLink to="/SignIn">Đăng nhập ngay</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
