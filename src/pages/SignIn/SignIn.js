import React, { useEffect } from "react";
import "./SignIn.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authentication from "../../api/authentication";
import { postSignInApi } from "../../redux/reducers/signInReducer";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../redux/reducers/signInReducer";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data);
    let response = await authentication.signIn(data);

    if (response.status === 200) {
      alert("Đăng Nhập thành công");
      navigate(`/`);

      console.log("Users", response);
    }
    // dispatch(signIn(response.data.content.user));
    dispatch(signIn(response.data.content));

    const setjson = JSON.stringify(response.data.content.token);
    localStorage.setItem("data", setjson);
    const user = JSON.stringify(response.data.content.user);
    localStorage.setItem('user',user);

  };

  return (
    <div className="sign-in">
      <div className="sign-in-container">
        <div className="sign-in-form">
          <h2 className="title">Đăng Nhập</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  placeholder="Enter your text"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email?.type === "required" && (
                  <p className="errors">Email address is required</p>
                )}
                {errors.email?.type === "pattern" && (
                  <p className="errors">Invalid Email Address</p>
                )}
              </div>
              <div className="input-box">
                <span className="details">Mật khẩu</span>
                <input
                  type="password"
                  placeholder="Enter your text"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                />
                {errors.password?.type === "required" && (
                  <p className="errors">password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="errors">Password must be 6 characters long</p>
                )}
              </div>
            </div>
            <div className="btn-sign-in">
              <span>Quên mật khẩu !</span>
              <button type="submit">Đăng Nhập</button>
            </div>
            <div className="nav-link">
              <span>
                Bạn chưa có tài khoản? <Link to="/signUp">Đăng ký ngay</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
