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
    return <div><h3>Waiting for your rival to join...</h3></div>
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
      <button className='leaveGameButton' onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
      }}>Leave Game</button>

      {/* Display Winner or Tie Message */}
      {result.state !== "none" && (
        <div className={`resultMessage ${result.state === "tie" ? "tieMessage" : ""}`}>
          {result.state === "won" ? `${result.winner} Won The Game! 🎉` : "Game Tied! 🤝"}
        </div>
      )}
    </div>
  )
}

export default Game;
