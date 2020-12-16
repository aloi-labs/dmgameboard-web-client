import React, { useState, useEffect } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import JoinModal from './JoinModal.js';
import { socket } from '../../services/socket.js';

const Join = props => {
    const [roomCode, setRoomCode] = useState('');
    const [joinModal, showJoinModal] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [joining, setJoining] = useState(false);
    const [name, setName] = useState('');
    const [invalid, setInvalid] = useState('');

    const toggleModal = () => showJoinModal(!joinModal);

    const joinRoom = () => {
        console.log(name);
        setJoining(true);
        socket.emit('handshake', { room: roomCode, name: name });
    };

    useEffect(() => {
        socket.on('complete handshake', data => {
            if (data.type === 'fail') {
                setInvalid(data.msg);
                setJoining(false);
            } else {
                setJoining(false);
                setRedirect(true);
            }
        });
    }, []);

    return (
        <div className="centerScreen">
            <div className="centerContents">
                <h1>Enter Room Code</h1>
                { invalid === '' ? <></> : <Alert variant='primary'>{invalid}</Alert>}
                <input type="text" value={roomCode} maxLength='4' 
                    placeholder="Room Code" onChange={
                    event => {
                        setRoomCode(event.target.value);
                    }
                }></input>
                <input type="text" value={name} maxLength='20' 
                    placeholder="Name..." onChange={
                    event => {
                        setName(event.target.value);
                    }
                }></input>
                <br />
                {
                    joining ?
                        <Spinner animation="border" /> :
                        <Button variant="primary" onClick={() => joinRoom()}>Join</Button>
                }
            </div>
            <JoinModal 
                key={roomCode}
                toggleModal={toggleModal} 
                show={joinModal} 
                roomCode={roomCode}
            />
            { redirect ? <Redirect to={{
                pathname: '/playerview',
                state: { roomCode: roomCode, name: name }
            }} /> : <></> }
        </div>
    );
};

export default Join;