import ApiCaller from '../../utils/apiCaller';

// GET
const getAllRooms = async () => {
    return await ApiCaller.get('/room');
};

const getRoom = async (roomId) => {
    return await ApiCaller.get(`/room/${roomId}`);
};

// POST
const createRoom = async (data) => {
    return await ApiCaller.post('/room', data);
};

const joinRoom = async (roomID) => {
    return await ApiCaller.post(`room/${roomID}/join`);
};

// PUT
const updateRoom = async (roomId, data) => {
    return await ApiCaller.put(`/room/${roomId}`, data);
};

// DELETE
const deleteRoom = async (roomId) => {
    return await ApiCaller.remove(`/room/${roomId}`);
};
export default { getAllRooms, getRoom, createRoom, joinRoom, updateRoom, deleteRoom };
