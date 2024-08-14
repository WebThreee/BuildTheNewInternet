"use client";

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import io, { Socket } from 'socket.io-client';
import { useAccount } from 'wagmi';

interface Message {
  sender: string;
  content: string;
}

const ChatPage: React.FC<{ userType: string }> = ({ userType }) => {
  const { address } = useAccount();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() && socket && address) {
      const message: Message = {
        sender: address,
        content: inputMessage.trim(),
      };
      socket.emit('sendMessage', message);
      setInputMessage('');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4">{userType} Chat Room</Typography>
      <Box sx={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', p: 2, mb: 2 }}>
        {messages.map((msg, index) => (
          <Typography key={index}>
            <strong>{msg.sender === address ? 'You' : userType === 'Client' ? 'Freelancer' : 'Client'}:</strong> {msg.content}
          </Typography>
        ))}
      </Box>
      <TextField
        fullWidth
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type a message..."
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={sendMessage}>
        Send
      </Button>
    </Container>
  );
};

export default ChatPage;
