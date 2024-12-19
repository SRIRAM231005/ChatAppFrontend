import React, { useState , useEffect } from 'react';
import './message.css'
import messageimg from './message.png'
import { io } from 'socket.io-client';

const socket = io('https://trialbackend.onrender.com');


function Message(){
    const [msgValue, setMsgValue] = useState('');

    /*useEffect(() => {
        console.log('hi');
        socket.on('connect', () => {
            console.log('connected');
            console.log('Connected to server with id: ' + socket.id);
        });
    
        socket.on('chat message', (msg) => {
            console.log('her');
            console.log('Message received: ' + msg);
        });
        return () => {
            socket.off('chat message');
        };
    }, []);*/
    
    function messagesend(){
        //msgValue = document.querySelector('.input').value;
        if (msgValue.trim()) {
            socket.emit('chat message', msgValue); 
            setMsgValue(''); 
        } else {
            console.error('Message is empty!'); 
        }
    /*const msgvalue = document.querySelector('.input').value;
    if(msgvalue){
        socket.emit('chat message', msgvalue);
    }*/
}
    return (
        <div className="message">
            <div className="inputMessage"><input type="text" className="input" placeholder="Message" value={msgValue} onChange={(e) => setMsgValue(e.target.value)}/></div>
            <div className="sendButton"><img src={messageimg} onClick={messagesend} className="imgsend"/></div>
        </div>
    );
}

export default Message;