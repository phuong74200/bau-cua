import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { Login, Room } from './component';
import { RouterComponents } from './routers';

function App() {
    return (
        <BrowserRouter>
            <RouterComponents />
        </BrowserRouter>
    );
}

export default App;
