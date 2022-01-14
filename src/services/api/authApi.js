import ApiCaller from '../../utils/apiCaller';

const getUser = async (token, type) => {
    return await ApiCaller.get('/user', { token, type });
};
export default { getUser };
