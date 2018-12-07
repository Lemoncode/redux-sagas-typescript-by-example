let clients = [];

const notifyClients = (msg, data) =>
    clients.forEach(socket => socket.emit(msg, data));

module.exports = (io) => {
    io.on('connection', function (socket) {
        clients.push(socket);

        socket.on('disconnect', () => {
            clients = clients.filter((s) => s.id = socket.id);
        });
    });

    return {
        notifyClients,
    };
};
