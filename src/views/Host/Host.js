import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { socket } from '../../services/socket.js';


const Host = props => {
    const [roomCode, setRoomCode] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const hostGame = () => {
        setLoading(true);
        socket.emit('host handshake', {
            name: name,
        });
    };

    useEffect(() => {
        socket.on('complete handshake', data => {
            setRoomCode(data.roomCode);
            setLoading(false);
            setRedirect(true);
        });
    }, []);

    return (
        <div className="centerScreen">
            <div className="centerContents">
                <h1>Host a Game!</h1>
                <input placeholder="Name..." value={name} 
                    onChange={event => {
                        setName(event.target.value);
                    }}
                ></input>
                { loading ? 
                    <Spinner animation="border" /> :
                    <Button variant="primary" onClick={() => {
                        hostGame();
                    }}>Host</Button>}
            </div>
            { redirect ? <Redirect to={{
                pathname: '/hostview',
                state: { roomCode: roomCode, name: name }
            }}/> : <></>}
        </div>
    );
};

export default Host;