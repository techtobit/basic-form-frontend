import { useState, useEffect } from 'react';
import { apiGet, apiPost, apiPut } from '../Apis/Api';
import { toast } from 'react-hot-toast';


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

// export const usePut = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const makePutRequest = async (url, data) => {
//         try {
//             setLoading(true);
//             const  existingDocument = await apiGet(url);
//             if( existingDocument)
//             {
//                 existingDocument.name = data.name;
//                 existingDoc.selectedSectors = data.selectedSectors;
//                 existingDocument.agreeToTerms = data.agreeToTerms;
                
//                 await apiPut(url,  existingDocument);
//             }
//             else 
//             {
//                 toast.error('Document Not Found')
//             }
//         } catch (err) {
//             setError(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { loading, error, makePutRequest };
// };
export const usePut = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const makePutRequest = async (url, data) => {
        try {
            setLoading(true);
            const existingDocument = await apiGet(url);
            if (existingDocument) {
                existingDocument.name = data.name;
                existingDocument.selectedSectors = data.selectedSectors;
                existingDocument.agreeToTerms = data.agreeToTerms;

                await apiPut(url, existingDocument);
            } else {
                toast.error('Document Not Found');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, makePutRequest };
};
