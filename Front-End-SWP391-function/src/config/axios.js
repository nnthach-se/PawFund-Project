import axios from 'axios';
const baseUrl = 'http://localhost:8080/api/v1/';

const config = {
    baseUrl: baseUrl,
};

const api = axios.create(config);

api.defaults.baseURL = baseUrl;

// handle before call API
const handleBefore = (config) => {
    if (config.url.includes('auth/register')) {
        return config;
    } else if (config.url.includes('auth/login')) {
        return config;
    } else if (config.url.includes('auth/logout')) {
        return config;
    } else if (config.url.includes('SearchPets?')) {
        return config;
    } else if (config.url.includes('sort6Pets')) {
        return config;
    } else if (config.url.includes('pets/')) {
        return config;
    } else if (config.url.includes('applications')) {
        return config;
    } else if (config.url.includes('auth/verifyEmail')) {
        return config;
    } else if (config.url.includes('auth/forgotPassword')) {
        return config;
    } else if (config.url.includes('auth/resetPassword')) {
        return config;
    } else if (config.url.includes('auth/resendVerifyEmail')) {
        return config;
    } else if (config.url.includes('auth/outbound/authentication')) {
        return config;
    } else if (config.url.includes('auth/create-password')) {
        return config;
    } else if (config.url.includes('volunteer/application')) {
    } else if (config.url.includes('users/')) {
        return config;
    } else if (config.url.includes('auth/refresh')) {
        return config;
    } else if (config.url.includes('posts/search')) {
        return config;
    } else if (config.url.includes('posts/detail/')) {
        return config;
    }

    const token = localStorage.getItem('token')?.replaceAll('"', '');
    config.headers['Authorization'] = `Bearer ${token}`;

    return config;
};

api.interceptors.request.use(handleBefore, null);

export default api;
