/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import SplashScreen from '../../components/layout/SplashScreen';
import useAuthStore from '../stores/others/authStore';
import useGeneralStore from '../stores/others/generalStore';
import ExpressLogin from '../../views/common/auth/ExpressLogin';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const location = useLocation();
    const { loaded, setLoaded } = useGeneralStore();
    const { is_logged_in, is_verified } = useAuthStore();
    const [is_initialized, setIsInitialized] = useState(false);

    useEffect(() => {
        let tm;
        tm = setTimeout(() => {
            setIsInitialized(true);
            !is_logged_in && setLoaded(true);
        }, 3000);

        return () => clearTimeout(tm);
    }, []);


    return (loaded && is_initialized) ? ((is_logged_in && is_verified) ? <Outlet /> : (location.pathname === '/express/login') ? <ExpressLogin /> : <Navigate to="/login" />) : <SplashScreen />
}

export default ProtectedRoute