import axios from "axios";
import { StatusCodes } from "http-status-codes";
import React, { useState, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import WelcomeComponent from "../components/WelcomeComponent";
import { User } from "../schemas/schemas";
import { validateFieldsUser } from "../utils/validateFields";

export default function Register() {
  const navigate = useNavigate();

  const url = "https://register-and-login-backend.onrender.com/register";

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
      <div className="form-container flex items-center col-span-2 justify-center bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400">
        <div className="wrap-register drop-shadow-custom rounded-lg bg-gray-300">
          <form className="form-register" onSubmit={addUser}>
            <div className="text-center pb-3.5 pt-8">
              {errors && (
                <span className="error-message-register ">
                  {errors.message}
                </span>
              )}
            </div>
            <h1 className="form-title uppercase text-center font-bold pb-3.5 pt-8 text-sky-500">
              Register
            </h1>
            <InputComponent
              type="text"
              id="username"
              label="Username"
              onChange={checkValues}
              inputRef={refUsername}
            />
            <InputComponent
              type="email"
              id="email"
              label="Email"
              onChange={checkValues}
              inputRef={refEmail}
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
              id="register-form-btn"
              value="Register"
              bgcolordisabled="disabled:bg-gray-600"
            />
          </form>
        </div>
      </div>
      <WelcomeComponent
        welcomeText="Welcome!"
        createAccountText="create account to start"
        haveNotAccountText="Do you have an account?"
        hereText="Login HERE"
        bgcolor="bg-gradient-to-r from-gray-500 via-gray-400 to-gray-300"
        link="/login"
      />
    </section>
  );
}
