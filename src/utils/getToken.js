export const getToken = () => {
    return localStorage.getItem('token');
}

export const removeToken = () => {
    localStorage.removeItem('token');
}

export const setToken = (value) => {
    localStorage.setItem('token', value);
}