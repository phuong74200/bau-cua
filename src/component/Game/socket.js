import io from 'socket.io-client';

const IP = 'localhost';
const PORT = 3000;

const socket = io(`${IP}:${PORT}`);

export default socket;
