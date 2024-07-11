import { useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import { io, Socket } from 'socket.io-client';
import MessageInput from './components/MessageInput';
import ChatBody from './components/ChatBody'
import Login from './components/Login';

// Heads up, I worked with Farzin and Spencer to do the bonus for this assignment since we most of this assignment in class

const socket = io("http://127.0.0.1:5000", {
  autoConnect: false,
})


export interface UserProps {
  username: string
  isLoggedIn: boolean
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  socket: Socket
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
}


function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  return (
    <Container className='main-container'>
      {isLoggedIn ? (
      <h1>Welcome {username}!</h1>
    ) : (
      <h1>Welcome</h1>
    )}
      
      <Login setIsConnected={setIsConnected} socket={socket} username={username} isLoggedIn={isLoggedIn} setUsername={setUsername} setIsLoggedIn={setIsLoggedIn}/>
      {isConnected ? (
        <>
        <ChatBody socket={socket} username={username}/>
        <MessageInput socket={socket}/>
        </>
      ) : (
        <p>Please login</p>
      )}
    </Container>
  )
}

export default App
