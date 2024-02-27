"use client";

import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const NotificationListener = () => {
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);
  const [notification, setNotification] = useState<string>("");

  useEffect(() => {
    const newSocket = io("https://server-1-b7aj.onrender.com/");
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server. Socket ID:', newSocket.id);
    });

    newSocket.on('notification', (senderSocketId: string) => {
      console.log('Received notification from:', senderSocketId);

      // Check if the notification is not from the current socket
      if (senderSocketId !== newSocket.id) {
        // Handle the notification logic here
        setNotification("You got a notification");
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendNotification = () => {
    if (socket) {
      // Emit a 'notification' event to the server with the sender's socket ID
      socket.emit('notification', socket.id);
    }
  };

  return (
    <div>
      {/* Button to send notification */}
      <button onClick={sendNotification}>Send Notification</button>
      {/* Notification message */}
      {notification && <p>{notification}</p>}
    </div>
  );
};

export default NotificationListener;
