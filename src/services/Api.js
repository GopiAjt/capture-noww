import axios from 'axios';
import store from '@/stores/store';

const apiClient = axios.create({
    // baseURL: `http://localhost:8080/`
    baseURL: `https://capture-now.onrender.com/`
});

// Request interceptor to add the access token to the headers
apiClient.interceptors.request.use(
    (config) => {
        const token = store.state.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 errors
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = store.state.refreshToken;

            if (refreshToken) {
                try {
                    // Note: Using axios directly to avoid interceptors on the refresh call
                    const response = await axios.post('https://capture-now.onrender.com/customer/refreshToken', {
                        token: refreshToken
                    });

                    const newAccessToken = response.data.accessToken;
                    store.commit('setToken', newAccessToken);

                    // Update the original request with the new token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return apiClient(originalRequest);
                } catch (refreshError) {
                    // If refresh fails, log out the user
                    store.dispatch('logout');
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default () => {
    return apiClient;
};