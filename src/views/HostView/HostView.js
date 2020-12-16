import React, { useState, useEffect } from 'react';
import { socket } from '../../services/socket.js';
import { Alert, Button, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const HostView = props => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [roomCode, setRoomCode] = useState('');

    useEffect(() => {
        if (props.location.state) {
            setName(props.location.state.name);
            setRoomCode(props.location.state.roomCode);
        }

        socket.on('chat message', data => {
            setMessages(messages => [...messages, data]);
        }); 
    }, [props]);

    const sendMessage = () => {
        socket.emit('chat message', {
            room: roomCode,
            name: name,
            message: message,
        });
        setMessage('');
    };

    return (
        <div className="centerContents">
            <h1>{roomCode ? `Room ${roomCode}` : 'Not Connected'}</h1>
            <h3>{name ? name : ''}</h3>
            <Row>
                <input placeholder="Message..." value={message}
                    onChange={event => {
                        setMessage(event.target.value);
                    }}>
                </input>
                <Button onClick={() => sendMessage()}>Send</Button>
            </Row>
            <ul>
                { messages.map((msg, i) => <li key={i}>
                    {`${msg.name}: ${msg.message}`}
                </li>) }
            </ul>
        </div>
    );
};

export default HostView;