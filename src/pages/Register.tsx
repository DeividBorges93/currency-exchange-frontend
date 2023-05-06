import axios from "axios";
import React, { useState, useRef, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { User } from "../schemas/schemas";
import { StatusCodes } from 'http-status-codes';
import { validateFieldsUser } from "../utils/validateFields";



export default function Register() {
  const navigate = useNavigate();

  const url = 'http://localhost:3001/register';

  const [errors, setErrors] = useState<IError>();

  const refUsername = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  const createUser = async (data: User) => {
    axios.post(url, data)
    .then((response) => {
      if (response.status === StatusCodes.CREATED) {
        localStorage.setItem('username', JSON.stringify(data.username));
        navigate('/login');
      };
    })
    .catch((err) => setErrors({ code: StatusCodes.UNAUTHORIZED, message: err.response.data }));
  }

  return (
    <section className="global-container">
      <div className="form-container">
        <div className="wrap-register">
          <form className="form-register" onSubmit={ addUser } >
            {errors && <span className='error-message-register'>{errors.message}</span>}
            <h1 className="form-title">Register</h1>
            <div className="wrap-register-input">
              <p className="title-input">Username</p>
              <input
                type="text"
                id="username"
                className="resgiter-input"
                name="name"
                onChange={checkValues}
                ref={refUsername}
              />
            </div>
            <div className="wrap-register-input">
              <p className="title-input">Email</p>
              <input
                type="email"
                id="email"
                className="resgiter-input"
                name="name"
                onChange={checkValues}
                ref={refEmail}
              />
            </div>
            <div className="wrap-register-input">
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
            <div className='container-register-form-btn'>
              <button
                id='register-form-btn'
                type='submit'
              >
                Register
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