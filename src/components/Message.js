import React, {useState} from 'react';

const Message = props => {
    return (
        <li>{props.msg}</li>
    );
};

export default Message;