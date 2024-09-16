import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to the backend server
const socket = io('http://localhost:5000'); 

const Chat = (props) => {
  const [receiverId, setReceiverId] = useState(''); // ID of the user to chat with
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const UID = props.userID
  // Join the user's room on mount
  useEffect(() => {
    socket.emit('join', UID);
    
    // Fetch previous chat history when receiverId changes
    if (receiverId) {
      fetch(`http://localhost:5000/messages/${UID}/${receiverId}`)
        .then(response => response.json())
        .then(data => setMessages(data));
    }

    // Listen for incoming messages
    socket.on('receive-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the socket listener on component unmount
    return () => {
      socket.off('receive-message');
    };
  }, [UID, receiverId]);

  const sendMessage = () => {
    if (message.trim() && receiverId) {
      // Emit the message to the server
      socket.emit('send-message', { sender: UID, receiver: receiverId, content: message });

      // Clear the message input
      setMessage('');
    }
  };

  return (
    <div className='message-box'>
      <div className='cbody'>
      <div className='chats'>
        {props.Userdata.map((u)=>{
          return(
          <button className='member' key={u._id} onClick={() => setReceiverId(u._id)}>{u.name}</button>)
        })}

      </div>
      
      <div className='message-body'>
      <h1 className='text-center text-dark'>Chat</h1>

        <div className='messaging'>
        {messages.map((msg, index) => (
          <div key={index}>
            <span className={msg.sender === UID ? 'send' : 'receive'}>{msg.content}</span>
            
          </div>
        ))}
            <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />  <button onClick={sendMessage}>Send</button>
</div>
      </div>
      
    </div></div>
  );
};

export default Chat;
