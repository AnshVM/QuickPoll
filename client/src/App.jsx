import React from "react";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Home from "./components/Home/Home";
import "./app.scss";
import CreatePoll from "./components/CreatePoll/CreatePoll";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Poll from './components/Poll/Poll'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './loginSlice'
import Navbar from "./components/navbar/Navbar";
import { io } from 'socket.io-client'

export default function App() {

  let socket = io();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/user/verifyToken') //checking if there is a token stored in browser cookies and verifying it
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (data.name !== "JsonWebTokenError") {
          dispatch(login({ isLoggedIn: true, user: data.user}))
        }
      })
  }, [])


  return (
    <Router>
      <Switch>
        <Route path="/createPoll">
          <Navbar />
          <CreatePoll />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/poll/:id">
          <Poll socket={socket}/>
        </Route>

        <Route path="/">
          <Home />
        </Route>

      </Switch>
    </Router>
  );
}
