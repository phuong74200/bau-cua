import io from 'socket.io-client';

const IP = 'localhost';
const PORT = 5000;

const socket = io(`${IP}:${PORT}`);

export default socket;
