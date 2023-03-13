import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAuthStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            setIsLoggedIn(true);
            setIsAdmin(user.isAdmin);
        } else {
            setIsLoggedIn(false);
            setIsAdmin(false);
        }
        setCheckingStatus(false);
    }, [user]);

    return { isLoggedIn, checkingStatus, isAdmin };
};
