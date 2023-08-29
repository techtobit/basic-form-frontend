import { useState, useEffect } from 'react';
import { apiGet, apiPost, apiPut } from '../Apis/Api';


export const useGet = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiGet(url)
            .then(responseData => {
                setData(responseData);
            })
            .catch(err => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
};

export const usePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const makePostRequest = async (url, data) => {
        try {
            setLoading(true);
            await apiPost(url, data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    return { loading, error, makePostRequest };
};

export const usePut = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const makePutRequest = async (url, data) => {
        try {
            setLoading(true);
            await apiPut(url, data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, makePutRequest };
};


