import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {useSelector,useDispatch} from 'react-redux';
import {login} from '../../loginSlice'

function LoggedInNavRight() {
  const username = useSelector((state)=>state.loginState.user.username)
  const dispatch = useDispatch();

  const handleLogout = () => {
    fetch('/api/user/logout')
    .then((res)=>{
      if(res.status===200){
        dispatch(login({isLoggedIn:false,token:"",user:""}))
      }
    })
  }

  return (
    <div className="loggedIn">
      <p>{username}</p>
      <AccountCircleIcon id="accountIcon" />
			<button onClick={handleLogout} className="logout">Logout</button>
    </div>
  );
}

function LoggedOutNavRight() {
  return (
    <div>
      <Link to="/login" className="login">
        Login
      </Link>
      <Link to="/signup" className="signup">
        Sign up
      </Link>
    </div>
  );
}

export default function Navbar() {
  const isLoggedIn = useSelector((state)=>state.loginState.isLoggedIn);
  if (!isLoggedIn) {
    return (
      <div className="navbar">
        <div className="left">
          <h1>QuickPoll</h1>
        </div>
        <div className="right">
          <LoggedOutNavRight />
        </div>
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="left">
        <h1>QuickPoll</h1>
      </div>
      <div className="right">
        <LoggedInNavRight/>
      </div>
    </div>
  );
}
