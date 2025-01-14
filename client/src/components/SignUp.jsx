import React, {useState} from 'react'
import Axios from "axios";
import Cookies from "universal-cookie";

function SignUp({setIsAuth}) {
    const cookies = new Cookies();
    const [user, setUser] = useState(null);

    const signUp = () => {
      if (!user.firstName || !user.lastName || !user.username || !user.password) {
        alert("All fields are required");
        return;
      }

      Axios.post("http://localhost:3001/signup", user).then((res)=>{
        const {token, userID, firstName, lastName, username, hashedPassword} = res.data;

        cookies.set("token",token);
        cookies.set("userID",userID);
        cookies.set("firstName",firstName);
        cookies.set("lastName",lastName);
        cookies.set("username",username);
        cookies.set("hashedPassword",hashedPassword);
        setIsAuth(true);

      })
      .catch((err) => {
        console.error(err);
        alert("Signup failed");
      });
    };
  return (
    <div className='signUp'>
      <label>Sign Up</label>
      <input 
        placeholder='First Name'
        onChange={(event)=>{
            setUser({...user, firstName : event.target.value });
        }}
      />
      <input 
        placeholder='Last Name'
        onChange={(event)=>{
            setUser({...user, lastName : event.target.value });
        }}
      />
      <input 
        placeholder='Username'
        onChange={(event)=>{
            setUser({...user, username : event.target.value });
        }}
      />
      <input 
        placeholder='Password'
        onChange={(event)=>{
            setUser({...user, password : event.target.value });
        }}
      />

      <button onClick={signUp}>Sign Up</button>
    </div>
  )
}

export default SignUp

