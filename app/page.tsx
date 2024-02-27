"use client";

import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const NotificationListener = () => {
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);
  const [notification, setNotification] = useState<string>("");

  useEffect(() => {
    const newSocket = io("https://server-3-gl8x.onrender.com");
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server. Socket ID:', newSocket.id);
    });

    newSocket.on('notification', (senderSocketId: string) => {
      console.log('Received notification from:', senderSocketId);

      if (senderSocketId !== newSocket.id) {
        setNotification("You got a notification");
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendNotification = () => {
    if (socket) {
      socket.emit('notification', socket.id);
    }
  };

  return (
    <div>
      <button onClick={sendNotification}>Send Notification</button>
      {notification && <p>{notification}</p>}
    </div>
  );
};

export default NotificationListener;
