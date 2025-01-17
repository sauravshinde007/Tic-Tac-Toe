import {React, useState} from 'react'
import Board from './Board';
import { Window, MessageList, MessageInput } from 'stream-chat-react';
import "./Chat.css"

function Game({channel, setChannel}) {
  const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
  const [result, setResult] = useState({winner : "none", state : "none"});
  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  if(!playersJoined){
    return <div>Waiting for your rival to join...</div>
  }
  return (
    <div className='gameContainer'>
      {/* Board */}
      <Board result={result} setResult={setResult} />
      {/* Chat */}
      <Window>
        <MessageList 
          disableDateSeparator 
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={["react"]}
        />
        <MessageInput noFiles/>
      </Window>
      {/* Leave Button */}
      <button onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
      }}>Leave Game</button>

      {/* Display Winner */}
      {result.state === "won" && <div className='winnerMessage'>{result.winner} Won The Game</div>}
      {result.state === "tie" && <div className='tieMessage'>Game Tied !!</div>}
    </div>
  )
}

export default Game;
