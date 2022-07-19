import { useState } from 'react'
import { toast } from 'react-toastify';

function useHttps() {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (requestConfig) => {
        setIsLoading(true);
        try {
            // visit https://blog.logrocket.com/axios-vs-fetch-best-http-requests/
            const controller = new AbortController();
            const res = await fetch(
                requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                signal: controller.signal,
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? requestConfig.body : requestConfig.body,
            })
            console.log('aaaaaaa')

            // if no response in 4 seconds abort request
            setTimeout(() => {
                controller.abort();
                setIsLoading(false);
            }, 4000)

            setIsLoading(false);

            const responseData = await res.json();

            if (!res.ok) {
                throw responseData.message ? new Error(responseData.message) : new Error('Request failed!');
            }

            setError(null);
            setResponse(responseData);
            toast(responseData.message);
        } catch (error) {
            toast(error.message)
            setError(error)
            setResponse(null);
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        response,
        sendRequest
    }
}

export default useHttps;