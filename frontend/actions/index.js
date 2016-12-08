import cookie from 'react-cookie';

export const isTokenValid = () => {
    let token = cookie.load('token');
    let expires = cookie.load('expires');
    if (token != null && token !== undefined) {
        if (new Date(expires) > new Date()) {
            return true;
        }
    }
    return false;
};
