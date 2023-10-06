import axios from "axios";
import { StatusCodes } from "http-status-codes";
import React, { useState, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import WelcomeComponent from "../components/WelcomeComponent";
import {
  validateFieldsLoginWithEmail,
  validateFieldsLoginWithUsername,
} from "../utils/validateFields";

export default function Login() {
  const navigate = useNavigate();

  const url = "https://register-and-login-backend.onrender.com/login";

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
    <section className="grid grid-cols-1 lg:grid-cols-3 h-screen">
      <div className="form-container flex items-center col-span-2 justify-center bg-gradient-to-l from-gray-400 via-gray-500 to-gray-600">
        <div className="wrap-login  drop-shadow-custom rounded-lg bg-gray-300">
          <div className="text-center pb-3.5 pt-8">
            {errors && (
              <span className="error-message-login ">{errors.message}</span>
            )}
          </div>
          <form className="form-login" onSubmit={getValues}>
            <h1 className="form-title uppercase text-center font-bold pb-3.5 pt-8 text-sky-500">
              Login
            </h1>
            <InputComponent
              type="text"
              id="username-email"
              label="Username or email"
              onChange={checkValues}
              inputRef={refUsernameOrEmail}
            />
            <InputComponent
              type="password"
              id="password"
              label="Password"
              onChange={checkValues}
              inputRef={refPassword}
            />
            <ButtonComponent
              type="submit"
              id="login-form-btn"
              value="Login"
              bgcolordisabled="disabled:bg-gray-600"
            />
          </form>
        </div>
      </div>
      <WelcomeComponent
        welcomeText="Welcome back!"
        createAccountText="login to your account to get started"
        haveNotAccountText="Do you have not an account?"
        hereText="Register HERE"
        bgcolor="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500"
        link="/register"
      />
    </section>
  );
}
