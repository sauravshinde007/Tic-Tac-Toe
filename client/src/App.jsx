import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import JoinGame from './components/JoinGame';
import {StreamChat} from "stream-chat";
import {Chat} from "stream-chat-react";
import Cookies from "universal-cookie";

function App() {

  const api_key = import.meta.env.VITE_API_KEY;
  const cookies = new Cookies();
  const token = cookies.get("token");

  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    //Removing all cookies to logOut
    cookies.remove("token");
    cookies.remove("userID");
    cookies.remove("username");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    client.disconnectUser();
    setIsAuth(false);
  };

  if(token){
    client.connectUser(
    {
      id: cookies.get("userID"),
      name : cookies.get("username"),
      firstName : cookies.get("firstName"),
      lastName : cookies.get("lastName"),
      hashedPassword : cookies.get("hashedPassword"),
    },
    token
  )
  .then((user) => {
      console.log("User connected: ",user);
  })
  .catch((error)=>{
    console.error(error); 
  });
  }
  return (
    <div className='App'>
      {isAuth ? (
          <Chat client={client}>
            <JoinGame />
            <button className='logout-button' onClick={logOut}>Log Out</button> 
          </Chat>
      ) :(
      <>
        <h1 className='Supreme-Spike'>Tic Tac Toe</h1>
        <h2 className='Supreme-subheading'>Multiplayer Fun with Friends!</h2>
        <SignUp setIsAuth = {setIsAuth}/>
        <Login setIsAuth = {setIsAuth}/>
      </>
      )
      }
    </div>
  )
}

export default App
