import axios from "axios";
import { StatusCodes } from "http-status-codes";
import React, { useState, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import {
  validateFieldsLoginWithEmail,
  validateFieldsLoginWithUsername,
} from "../utils/validateFields";

export default function Login() {
  const navigate = useNavigate();

  const url = "http://localhost:3001/login";

  const [errors, setErrors] = useState<IError>();

  const refPassword = useRef<HTMLInputElement>(null);
  const refUsernameOrEmail = useRef<HTMLInputElement>(null);

  const login = async (data: IUserWithUsername | IUserWithEmail) => {
    axios
      .post(url, data)
      .then((response) => {
        if (response.status === StatusCodes.OK) {
          localStorage.setItem("token", JSON.stringify(response.data));
          navigate("/home");
        }
      })
      .catch((err) =>
        setErrors({
          code: StatusCodes.UNAUTHORIZED,
          message: err.response.data,
        })
      );
  };

  const checkValues = async () => {
    const submitBtn = document.getElementById(
      "login-form-btn"
    ) as HTMLButtonElement;
    const inputUsername = document.getElementById(
      "username-email"
    ) as HTMLInputElement;
    const inputPassword = document.getElementById(
      "password"
    ) as HTMLInputElement;

    const { value: username } = inputUsername;
    const { value: password } = inputPassword;

    password.length >= 8 &&
    username.length >= 3 &&
    password !== null &&
    username !== null &&
    password !== "" &&
    username !== ""
      ? (submitBtn.disabled = false)
      : (submitBtn.disabled = true);
  };

  const getValues = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (refUsernameOrEmail.current && refPassword.current) {
      if (refUsernameOrEmail.current.value.includes("@")) {
        const email = refUsernameOrEmail.current.value;
        const password = refPassword.current.value;

        const user: IUserWithEmail = {
          email,
          password,
        };

        const hasError = validateFieldsLoginWithEmail(user);

        if (hasError) setErrors(hasError);

        localStorage.setItem("email", JSON.stringify(email));
        login(user);
      } else {
        const username = refUsernameOrEmail.current.value;
        const password = refPassword.current.value;

        const user: IUserWithUsername = {
          username,
          password,
        };

        const hasError = validateFieldsLoginWithUsername(user);

        if (hasError) setErrors(hasError);

        localStorage.setItem("username", JSON.stringify(username));
        login(user);
      }
    }
  };

  return (
    <section className="global-container">
      <div className="form-container">
        <div className="wrap-login">
          <form className="form-login" onSubmit={getValues}>
            {errors && (
              <span className="error-message-login">{errors.message}</span>
            )}
            <h1 className="form-title">Login</h1>
            <div className="wrap-login-input">
              <p className="title-input">Username or Email</p>
              <input
                type="text"
                id="username-email"
                className="resgiter-input"
                name="name"
                onChange={checkValues}
                ref={refUsernameOrEmail}
              />
            </div>
            <div className="wrap-login-input">
              <p className="title-input">Password</p>
              <input
                type="password"
                id="password"
                className="resgiter-input"
                name="name"
                onChange={checkValues}
                ref={refPassword}
              />
            </div>
            <div className="container-login-form-btn">
              <button id="login-form-btn" type="submit">
                login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="welcome-container">
        <div className="welcome-text">
          <p className="welcome">Welcome</p>
          <p className="create-account-text">create account to start</p>
        </div>
        <div className="login-here">
          <p className="have-account-text">Do you have an account?</p>
          <p className="login-here-text">Login HERE</p>
        </div>
      </div>
    </section>
  );
}
