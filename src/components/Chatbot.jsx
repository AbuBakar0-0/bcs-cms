import React, { useState } from 'react';
import { sendMessageToGemini } from '../utils/gemini';
import { TextField, Button, Box, Typography } from '@mui/material';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    setUserInput('');

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);

    // Send user input to Gemini API
    const botResponse = await sendMessageToGemini(userInput);
    setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Chat with our AI-Assistant
      </Typography>
      <Box
        sx={{
          height: 400,
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: 2,
          borderRadius: 4,
          marginBottom: 2,
        }}
      >
        {messages.map((msg, index) => (
          <Typography
            key={index}
            sx={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              marginBottom: 1,
              background: msg.sender === 'user' ? "#cccccc" : "#0073b9",
              borderRadius: "10px",
              padding: "10px",
              color: msg.sender === "user" ? "black" : "white",
            }}
          >
            <strong>{msg.sender === 'user' ? '' : 'AI Assistant : '}</strong> {msg.text}
          </Typography>
        ))}
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleSendMessage} fullWidth>
        Send
      </Button>
    </div>
  );
};

export default Chatbot;
