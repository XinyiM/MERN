import { useState, useCallback, useEffect } from 'react';

let logoutTimer; //general variable


export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);
    // APP component is the first one when renders

    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        setUserId(uid);
        // create an expiration date
        // after 1 hour, it will automatically logged out.
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        // generate a date object from now to 1h later
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: uid,
                token: token,
                expiration: tokenExpirationDate.toISOString()
            }));
        // auto log-in
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            setTimeout(logout, remainingTime)
        } else {
            clearTimeout(logoutTimer); // clear any ongoing timers
        }
    }, [token, logout, tokenExpirationDate])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        // get the data stored using JSON format
        // convert JSON data to normal JS object
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expirationDate > new Date())) {
            login(storedData.userId, storedData.token, new Date(storedData.expiration)); // trigger the login logic
        }
    }, [login]); // no dependencies so only render once.

    return { token, login, logout, userId };
}