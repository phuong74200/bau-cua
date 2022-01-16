import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import App from './App';
import './index.css';
import { store } from './stores/store';

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
            <ToastContainer />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
