import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import view from "../../assets/icon/view.png";
import "./Login.css";
import { login, register } from "../../api/auth";
function Login() {
  const [isSignin, setisSignin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPass, setCheckPass] = useState("");
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(false);
  const [passV, setPassV] = useState(false);

  const navigate = useNavigate();

  const handleSwitch = () => {
    setisSignin(!isSignin);
    setEmail(" ");
    setPassword("");
    setName('')
  };

  useEffect(() => {
    if (password !== checkPass) {
      setPassV(true);
    } else {
      setPassV(false);
    }
  }, [checkPass]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignin) {
      if (!passV) {
        const responce = await register({ name, email, password }, navigate);
      }
    } else {
      const responce = await login({ email, password }, navigate);
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">{isSignin ? <>Login</> : <>Register</>}</h1>
      <form onSubmit={handleSubmit}>
        {!isSignin && (
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </label>
        )}
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error ? <p>Please Enter a Valid Email</p> : <></>}
        </label>
        <label htmlFor="password">
          <div className="pass">
            <input
              type={show ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="view-btn"
              onClick={(e) => {
                e.preventDefault();
                setShow(!show);
              }}
            >
              <img src={view} alt="view" />
            </button>
          </div>
          {error ? <p>Please enter a valid password</p> : <></>}
        </label>
        {!isSignin && (
          <label htmlFor="Confirmpassword">
            <div className="Confirm-pass">
              <input
                type={showConfirm ? "text" : "password"}
                id="Confirmpassword"
                placeholder="Confirm Password"
                onChange={(e) => setCheckPass(e.target.value)}
                required
              />
              <button
                className="confirm-view-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirm(!showConfirm);
                }}
              >
                <img src={view} alt="view" />
              </button>
            </div>
            {passV ? <p>password mismatch</p> : <></>}
          </label>
        )}
        <button type="submit" className="login-btn">
          {isSignin ? <>Log In</> : <>Register</>}
        </button>
      </form>
      <div className="reg-container">
        <p>{isSignin ? <>Have no account yet?</> : <>Have an account ?</>}</p>
        <button type="button" className="reg-btn" onClick={handleSwitch}>
          {isSignin ? <>Register</> : <>Log In</>}
        </button>
      </div>
    </div>
  );
}

export default Login;
