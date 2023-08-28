import axios from 'axios';
const baseUrl = 'http://localhost:5000';

const sendRequest = async (url, method, data = null) => {
    try {
        const response = await axios({
            method,
            url: `${baseUrl}${url}`,
            headers: {
                'Content-Type' : 'application/json',
            },
            data : data? JSON.stringify(data) : null,
        });
        return response.data;
    } catch (error) {
        console.error('Error Sending request:', error)
        throw error;
    }
}
export const apiGet = async(url) => sendRequest(url, 'GET');
export const apiPost = async(url, data) => sendRequest(url, 'POST', data);
export const apiPut = async(url, data) => sendRequest(url, 'GET', data);