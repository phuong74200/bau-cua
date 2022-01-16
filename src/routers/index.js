import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { Login, Room, Game, NotFound } from '../component';
import { login, signOut } from '../component/Login/loginSlice';
import { Error } from '../helpers/notify';
import authApi from '../services/api/authApi';
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
        path: '/game/*',
        name: 'game',
        component: <Game />,
        exact: true,
        restrict: true,
    },
];

export const RouterComponents = () => {
    let dispatch = useDispatch();
    useEffect(() => {
        const getUserData = async () => {
            try {
                if (!localStorage.getItem('token')) return;
                let result = await authApi.getUser(localStorage.getItem('token'), 'firebase');
                dispatch(login(result.data));
            } catch (error) {
                console.log(error);
                dispatch(signOut());
            } finally {
                //set Loading
            }
        };
        getUserData();
    }, [dispatch]);

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
