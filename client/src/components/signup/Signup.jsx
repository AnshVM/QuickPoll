import React from "react";
import TextField from "@material-ui/core/TextField";
import "./signup.scss";
import LockIcon from "@material-ui/icons/Lock";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import InputAdornment from "@material-ui/core/InputAdornment";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
import {useHistory} from 'react-router-dom'

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

export default function SignUp() {

  let history = useHistory();

  const handleSignup = () => {
    const data = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      email: document.getElementById("email").value,
    };
    fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        history.push('/login')
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="signupPage">
      <ThemeProvider theme={theme}>
        <div className="signupCard">
          <h1>QuickPoll</h1>
		  <TextField
            id="username"
            label="Username"
            style={{ marginTop: 40 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineSharpIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="email"
            label="Email"
            style={{ marginTop: 30 }}
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
          <Button
            onClick={handleSignup}
            color="secondary"
            variant="contained"
            style={{
              borderRadius: 50,
              paddingLeft: 80,
              paddingRight: 80,
              marginTop: 15,
            }}
          >
            Sign Up
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
}
