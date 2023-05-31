import axios from "axios";
import { StatusCodes } from "http-status-codes";
import React, { useState, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { User } from "../schemas/schemas";
import { validateFieldsUser } from "../utils/validateFields";

export default function Register() {
  const navigate = useNavigate();

  const url = "http://localhost:3001/register";

  const [errors, setErrors] = useState<IError>();

  const refUsername = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  const createUser = async (data: User) => {
    axios
      .post(url, data)
      .then((response) => {
        if (response.status === StatusCodes.CREATED) {
          localStorage.setItem("username", JSON.stringify(data.username));
          navigate("/login");
        }
      })
      .catch((err) =>
        setErrors({
          code: StatusCodes.UNAUTHORIZED,
          message: err.response.data,
        })
      );
  };

  const addUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (refUsername.current && refEmail.current && refPassword.current) {
      const data: User = {
        username: refUsername.current.value,
        email: refEmail.current.value,
        password: refPassword.current.value,
      };

      const hasError = validateFieldsUser(data);

      if (hasError) setErrors(hasError);

      createUser(data);
    }
  };

  const checkValues = async () => {
    const submitBtn = document.getElementById(
      "register-form-btn"
    ) as HTMLButtonElement;
    const inputUsername = document.getElementById(
      "username"
    ) as HTMLInputElement;
    const inputEmail = document.getElementById("email") as HTMLInputElement;
    const inputPassword = document.getElementById(
      "password"
    ) as HTMLInputElement;

    const { value: username } = inputUsername;
    const { value: email } = inputEmail;
    const { value: password } = inputPassword;

    email.includes("@") &&
    password.length >= 8 &&
    username.length >= 3 &&
    password !== null &&
    username !== null &&
    password !== "" &&
    username !== ""
      ? (submitBtn.disabled = false)
      : (submitBtn.disabled = true);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 h-screen">
      <div className="form-container flex items-center col-span-2 justify-center bg-gray-500">
        <div className="wrap-register drop-shadow-custom rounded-lg bg-gray-300">
          <form className="form-register" onSubmit={addUser}>
            {errors && (
              <span className="error-message-register">{errors.message}</span>
            )}
            <h1 className="form-title uppercase text-center font-bold pb-3.5 pt-8 text-sky-800">
              Register
            </h1>
            <div className="wrap-register-input px-8 py-2.5">
              <p className="title-input text-xs pb-2">Username</p>
              <input
                type="text"
                id="username"
                className="resgiter-input rounded-md focus:outline-none focus:ring-0 focus:border-solid focus:border-2 border-sky-800 drop-shadow-lg shadow-black px-1"
                name="name"
                onChange={checkValues}
                ref={refUsername}
              />
            </div>
            <div className="wrap-register-input px-8 py-2.5">
              <p className="title-input text-xs pb-2">Email</p>
              <input
                type="email"
                id="email"
                className="resgiter-input rounded-md focus:outline-none focus:ring-0 focus:border-solid focus:border-2 border-sky-800 drop-shadow-lg shadow-black px-1"
                name="name"
                onChange={checkValues}
                ref={refEmail}
              />
            </div>
            <div className="wrap-register-input px-8 py-2.5">
              <p className="title-input text-xs pb-2">Password</p>
              <input
                type="password"
                id="password"
                className="resgiter-input rounded-md focus:outline-none focus:ring-0 focus:border-solid focus:border-2 border-sky-800 drop-shadow-lg shadow-black px-1"
                name="name"
                onChange={checkValues}
                ref={refPassword}
              />
            </div>
            <div className="container-register-form-btn text-center py-3.5">
              <button
                id="register-form-btn"
                type="submit"
                className="bg-sky-800 text-white py-2 px-8 rounded-md disabled:bg-gray-500 disabled:text-gray-400"
                disabled
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="welcome-container flex flex-col items-center col-span-1 justify-evenly bg-gray-300">
        <div className="welcome-text text-center">
          <p className="welcome uppercase  text-sky-800">Welcome!</p>
          <p className="create-account-text text-xs">create account to start</p>
        </div>
        <div className="login-here text-center">
          <p className="have-account-text">Do you have an account?</p>
          <a href="/login" className="login-here-text text-sky-800">
            Login HERE
          </a>
        </div>
      </div>
    </section>
  );
}
