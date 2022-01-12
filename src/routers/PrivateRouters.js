import React from 'react';

import { Outlet, Navigate } from 'react-router-dom';

const PrivateRouters = () => {
    let isAuthenticated = true;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouters;
