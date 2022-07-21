import React ,{useState,useEffect} from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
import './App.css'

const Chat = ({socket,userName,room}) => {
    const [currentMessage, setcurrentMessage] = useState("");
    const [messageList, setmessageList] = useState([])
    const sendMessage= async ()=>{
        if(currentMessage!=="")
        {
            // create tha data of the message
            const messageData={
                room:room,
                author:userName,
                message:currentMessage,
                time:new Date(Date.now()).getHours()+ ":"+new Date(Date.now()).getMinutes()
            }
            await socket.emit("send-message",messageData);
            setmessageList((prevlist)=>[...prevlist,messageData]); // prevmsg ki ippudu msg add 
            // after sending the msg make it null
            setcurrentMessage("");
        }
    };
    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            // console.log(data);
            setmessageList((prevlist)=>[...prevlist,data]); // prevmsg ki ippudu msg add 
        })
    },[socket])
  return (
    <div className='chat-window'>
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={userName === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
                setcurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
            }}
            />
            <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat;

