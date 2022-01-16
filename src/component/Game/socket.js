import * as CONFIG from './config';

import io from 'socket.io-client';

const IP = CONFIG.SOCKET_URL;
const PORT = CONFIG.SOCKET_PORT;

const socket = io(`${IP}:${PORT}`);

export default socket;
