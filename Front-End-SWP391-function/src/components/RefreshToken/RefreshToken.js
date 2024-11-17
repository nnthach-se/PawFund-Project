import { useEffect } from 'react';
import api from '~/config/axios';

const useAuth = () => {
    const refreshToken = async () => {
        const rfToken = localStorage.getItem('refreshToken');
        if (!rfToken) return;

        const tokenjs = localStorage.getItem('token');
        console.log('old token', tokenjs);

        try {
            const response = await api.post('auth/refresh', {
                token: rfToken,
            });

            console.log('lay token voi refresh token', response.data);

            if (response.data && response.data.result) {
                const { token } = response.data.result;
                localStorage.setItem('token', token);
                console.log('Token refreshed successfully');
                console.log('new token', token);
            } else {
                console.error('Invalid response format', response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            refreshToken();
        }, 180000);

        return () => clearInterval(interval);
    }, []);
};

export default useAuth;
