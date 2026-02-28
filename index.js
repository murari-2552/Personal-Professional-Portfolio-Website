const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Message = require('./models/Message');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB ✅'))
    .catch((err) => console.error('MongoDB connection error: ❌', err));

// Routes
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, project, message } = req.body;

        const newMessage = new Message({
            name,
            email,
            project,
            message
        });

        await newMessage.save();
        res.status(201).json({ message: 'Message saved successfully! ✅' });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Internal server error ❌' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});
