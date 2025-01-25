import React, { useState } from 'react';
import Axios from "axios";
import Cookies from "universal-cookie";

function Login({setIsAuth}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const cookies = new Cookies();

    const login = () => {
      if (!username || !password) {
        alert("Username and password are required");
        return;
      }
      Axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/login`,{
        username,
        password,
      }).then((res)=>{
        const {firstName, lastName, username,token, userID} = res.data;

        cookies.set("token",token);
        cookies.set("userID",userID);
        cookies.set("firstName",firstName);
        cookies.set("lastName",lastName);
        cookies.set("username",username);
        setIsAuth(true);
      })
      .catch((err) => {
        console.error(err);
        alert("Login failed");
      });
    };

  return (
    <div className='login'>
    <label>Login</label>

      <input 
        placeholder='Username'
        onChange={(event)=>{
            setUsername(event.target.value);
        }}
      />
      <input 
        placeholder='Password'
        onChange={(event)=>{
            setPassword(event.target.value);
        }}
      />

      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login
