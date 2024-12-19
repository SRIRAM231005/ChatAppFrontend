import { useState, useEffect } from 'react';
import './message.css'
import { io } from 'socket.io-client';

const socket = io('https://trialbackend.onrender.com');

let msgdisp;


function Displaybox(){
    const [divs, setDivs] = useState([]);
    const [tasksArray, setTasksArray] = useState([]);

    useEffect(() => {
        async function getMessages(){
            const response = await fetch('https://trialbackend.onrender.com/api/tasks');
            const tasks = await response.json();
            console.log(tasks);
            setTasksArray(tasks);
            //tasks.forEach((task) => array.push(task.task));
        }
    
        getMessages();
    }, []); 

    useEffect(() => {
        socket.on('chat message', (msg) => {
            console.log('Message received: ' + msg);
            msgdisp = msg;
            const newDiv = `${msg}`; 
            setDivs([...divs, newDiv]); 
        });
        onMessageReceived("Hello! You have a new message.");
    }, [divs]); 

    function onMessageReceived(message) {
        if (document.hidden) {
          sendNotification("New Message", message);
        } else {
          console.log("User is on the webpage, no notification sent");
        }
    }

    function sendNotification(title, body) {
        if (Notification.permission === "granted") {
          const notification = new Notification(title, {
            body: body,
            icon: "https://example.com/icon.png", // Optional icon for the notification
          });
    
          // Optional: Add click event to the notification
          notification.onclick = () => {
            window.focus(); // Bring the tab into focus
          };
        }
      }


    return(
        <div className="displaybox">
            <div className='displaybox1'>
                {tasksArray.map((div, index) => (
                    <div key={index} className="child-div">
                        <div>{div.task}</div>
                        <div className="date">{new Date(div.createdAt).toLocaleString()}</div>
                    </div>
                ))}
            </div>
            <div className="displaybox2">
                {divs.map((div, index) => (
                    <div key={index} className="child-div">
                        <div>{div}</div>
                        <div className="date">Now</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Displaybox;