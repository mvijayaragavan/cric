require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./src/config/db');

const app = express();
const server = http.createServer(app);

// Enable CORS for frontend
app.use(cors());

app.use(express.json());

// Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Attach io to request object for use in controllers
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Setup Socket.io logic
require('./src/socket')(io);

// Connect to MongoDB
connectDB();

// Map Routes
app.use('/api/matches', require('./src/routes/matchRoutes'));
app.use('/api/teams', require('./src/routes/teamRoutes'));
app.use('/api/players', require('./src/routes/playerRoutes'));
app.use('/api/tournaments', require('./src/routes/tournamentRoutes'));
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/clubs', require('./src/routes/clubRoutes'));
app.use('/api/ai', require('./src/routes/aiRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.send('Stumps API is running...');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
