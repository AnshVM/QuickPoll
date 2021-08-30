import React from "react";
import TextField from "@material-ui/core/TextField";
import "./login.scss";
import LockIcon from "@material-ui/icons/Lock";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import InputAdornment from "@material-ui/core/InputAdornment";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { useState } from 'react';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from '../../loginSlice';
import {Link} from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: "#7700A0",
    },
    secondary: {
      main: "#FD0098",
    },
  },
});

export default function Login() {

  const [incorrect, setIncorrect] = useState(false)
  let history = useHistory();
  const dispatch = useDispatch();
  const handleLogin = () => {
    const data = {
      password: document.getElementById("password").value,
      email: document.getElementById("email").value.trim(),
    };

    fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.accessToken) {
          const decoded = jwt_decode(data.accessToken);
          const user = { email: decoded.email, username: decoded.username, id: decoded.userId };
          const dispatchBody = {
            user,
            token: data.accessToken,
            isLoggedIn: true
          }
          dispatch(login({ ...dispatchBody }))
          history.push('/')
        }
        else {
          setIncorrect(true)
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
      

  };

  

  let incorrectStatement = incorrect ? "Email id or password is incorrect" : ""

  return (
    <div className="loginPage">
      <ThemeProvider theme={theme}>
        <div className="loginCard">
          <h1>QuickPoll</h1>
          <TextField
            id="email"
            label="Email"
            style={{ marginTop: 40 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            type="password"
            id="password"
            label="Password"
            style={{ marginTop: 30, marginBottom: 20 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <Link to="/signup">Not registered yet? Signup here</Link>
          <Button
            onClick={handleLogin}
            color="secondary"
            variant="contained"
            style={{
              borderRadius: 50,
              paddingLeft: 80,
              paddingRight: 80,
              marginTop: 15,
            }}
          >
            Login
          </Button>
          <p >{incorrectStatement}</p>
        </div>
      </ThemeProvider>
    </div>
  );
}
