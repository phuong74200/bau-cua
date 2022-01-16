// import appReducer from '../app/appSlice'
import authReducer from '../component/Login/loginSlice';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
