import './App.css';
import Chat from './Chat'
import io from 'socket.io-client';
import {useState} from 'react';
const socket=io.connect("http://localhost:3001")
function App() {
  const [userName,setUserName]=useState("");
  const [room, setroom] = useState("");
  const [showChat, setshowChat] = useState(0);

  const joinRoom=()=>{
    if(userName!=="" && room!=="")
    {
        setshowChat(true);
        socket.emit("join_room",room); // idi manam backend ki sending using socket
    }
  }
  return (
    <div className="App">
       {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Name..."
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setroom(event.target.value);
            }}
          />
          <button onClick={joinRoom} >Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
}

export default App;
