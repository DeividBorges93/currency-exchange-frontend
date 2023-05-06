import axios from "axios";
import React, { useState, useRef, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { User } from "../schemas/schemas";
import { StatusCodes } from 'http-status-codes';
import { validateFieldsLoginWithEmail, validateFieldsLoginWithUsername } from "../utils/validateFields";

export default function Login() {
  const navigate = useNavigate();

  const url = 'http://localhost:3001/login';

  const [errors, setErrors] = useState<IError>();

  const refUsername = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const refUsernameOrEmail = useRef<HTMLInputElement>(null);

  return (
    <section className="global-container">
      <div className="form-container">
        <div className="wrap-login">
          <form className="form-login" onSubmit={ getValues } >
            {errors && <span className='error-message-login'>{errors.message}</span>}
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
            <div className='container-login-form-btn'>
              <button
                id='login-form-btn'
                type='submit'
              >
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
  )
}