// Basic socket logic for real-time updates
module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`Socket Connected: ${socket.id}`);

        // Join a specific match room
        socket.on('join_match', (matchId) => {
            socket.join(matchId);
            console.log(`Socket ${socket.id} joined match ${matchId}`);
        });

        // Leave a specific match room
        socket.on('leave_match', (matchId) => {
            socket.leave(matchId);
            console.log(`Socket ${socket.id} left match ${matchId}`);
        });

        socket.on('disconnect', () => {
            console.log(`Socket Disconnected: ${socket.id}`);
        });
    });
};
