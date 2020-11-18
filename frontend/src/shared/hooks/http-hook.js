import { useState, useCallback, useRef, useEffect } from 'react';


export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(
        async (
            url,
            method = "GET",
            body = null,
            headers = {}) => {
            setIsLoading(true);

            // assign a Abort Ctrl to the activeHttpRequests
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal
                });
                const responseData = await response.json();

                activeHttpRequests.current = activeHttpRequests.current.filter(
                    reqCtrl => reqCtrl !== httpAbortCtrl
                );
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setIsLoading(false);
                return responseData;
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
                throw err;
            }
        }, []);
    const clearError = () => {
        setError(null);
    }

    //useEffect can run some cleanup logic after the component on mounts
    useEffect(() => {
        // the returned function is executed as a cleanup function 
        // before the next time useEffect runs again
        // or when the component on mounts
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, [])

    return { isLoading, error, sendRequest, clearError };
};