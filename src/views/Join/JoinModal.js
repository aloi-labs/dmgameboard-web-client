import React, { useState, useEffect } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { socket } from '../../services/socket.js';
import { Redirect } from 'react-router-dom';

const JoinModal = props => {
    const [name, setName] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [joining, setJoining] = useState(false);
    const [full, setFull] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const joinRoom = () => {
        console.log(name);
        setJoining(true);
        socket.emit('handshake', { room: props.roomCode, name: name });
    };

    useEffect(() => {
        socket.on('complete handshake', data => {
            console.log('Handshake received');
            console.log(`DATA: ${data} ROOM: ${props.roomCode}`);
            if (data === 'taken') {
                setJoining(false);
                setInvalid(true);
            } else if (data === 'full') {
                setJoining(false);
                setFull(true);
            } else if (data === props.roomCode) {
                setJoining(false);
                setRedirect(true);
            } else {
                setName('');
                setJoining(false);
                setFull(true);
            }
        });
    }, [props.roomCode]);

    return (
        <Modal show={props.show} onHide={props.toggleModal}>
            <Modal.Header closeButton>
                <Modal.Title>{`Joining Room: ${props.roomCode}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="centerContents">
                    <input placeholder="Enter Name" value={name}
                    onChange={event => {
                        setName(event.target.value);
                    }}></input>
                    { invalid ? <p>Name is taken</p> : <></>}
                    { full ? <p>This room is full.</p> : <></>}
                </div>
            </Modal.Body>
            <Modal.Footer>
                {
                    joining ?
                        <Spinner animation="border" /> :
                        <Button variant="primary" onClick={() => joinRoom()}>Join</Button>
                }
                <Button variant="danger" onClick={() => {
                    setJoining(false);
                    props.toggleModal();
                }}>Cancel</Button>
            </Modal.Footer>
            { redirect ? <Redirect to={{
                pathname: '/playerview',
                state: { roomCode: props.roomCode, name: name }
            }} /> : <></> }
        </Modal>
    );
};

export default JoinModal;