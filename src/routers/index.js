import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { Login, Room, Game, NotFound } from '../component';
import PrivateRouters from './PrivateRouters';
import PublicRouters from './PublicRouters';

export const publicRouters = [
    {
        path: '/login',
        name: 'login',
        component: <Login />,
    },
];

export const privateRouters = [
    {
        path: '/room',
        name: 'room',
        component: <Room />,
        exact: true,
        restrict: true,
    },
    {
        path: '/game',
        name: 'game',
        component: <Game />,
        exact: true,
        restrict: true,
    },
];

export const RouterComponents = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Navigate to="/room" />} />
                <Route exact path="/" element={<PrivateRouters />}>
                    {privateRouters.map((route) => (
                        <Route
                            key={route.name}
                            path={route.path}
                            element={route.component}
                            exact={route.exact}
                            restrict={route.restrict}
                        />
                    ))}
                </Route>
                <Route exact path="/" element={<PublicRouters />}>
                    {publicRouters.map((route) => (
                        <Route
                            key={route.name}
                            path={route.path}
                            element={route.component}
                            exact={route.exact}
                            restrict={route.restrict}
                        />
                    ))}
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};
