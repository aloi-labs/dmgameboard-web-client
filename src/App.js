import React, { useState, useEffect } from 'react';
import Message from './components/Message.js';
import { socket } from './services/socket.js';

const App = () => {
    const [msg, setMsg] = useState('');
    const [messages, setMessages] =  useState([]);
    const [room, setRoom] = useState('');
    const [newRoom, setNewRoom] = useState('');

    useEffect(() => {
        socket.on('chat message', msg => {
            setMessages(messages => [...messages, msg]);
        });

        socket.on('room status', status => {
            setRoom(status);
        })
    }, []);

    const sendMessage = msg => {
        socket.emit('chat message', {
            'room': room,
            'message': msg,
        });
    };

    const joinRoom = () => {
        socket.emit('handshake', newRoom);
        setNewRoom('');
    };

    return (
        <>
            <h1>Chat room example</h1>
            <input type="text" value={newRoom} onChange={event => {
                setNewRoom(event.target.value);
            }}></input>
            <button onClick={() => {
                joinRoom();
            }}>Join</button>
            <label>{room === '' ? 'Join a room' : room}</label>
            <br />
            <input type="text" value={msg} onChange={event => {
                setMsg(event.target.value);
            }}></input>
            <button onClick={() => {
                sendMessage(msg);
                setMsg('');
            }}>Send</button>
            <ul>{messages.map((message, i) => <Message key={i} msg={message} />)}</ul>
        </>
    );
};

export default App;
