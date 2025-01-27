import React, { useState } from 'react';
import {useChatContext, Channel} from 'stream-chat-react'
import Game from './Game';
import CustomInput from './CustomInput';

function JoinGame() {
    const [rivalUsername, setRivalUsername] = useState("");
    const {client} = useChatContext();
    const [channel, setChannel] = useState(null);

    const createChannel =  async () => {
      const response = await client.queryUsers({name: {$eq : rivalUsername}});

      if(response.users.length === 0){
        alert("No Users Found")
        return
      }

      const newChannel = await client.channel("messaging", 
        {members: [client.userID, response.users[0].id]}
      );
      
      await newChannel.watch();
      setChannel(newChannel);
    };

  return (
    <>
    { channel ? (
      <Channel channel={channel} Input={CustomInput}>
        <Game channel={channel} setChannel={setChannel}/>
      </Channel>
    ):(
      <div className='joinGame'>
        <h2 className='createGameText'>Create Game</h2>
        <input 
          placeholder='Enter Rival username...' 
          onChange={(event) => {
              setRivalUsername(event.target.value);
          }}
        />
        <button onClick={createChannel}>Join Game</button>
      </div>
      ) 
    }
    </>
  )
}

export default JoinGame
