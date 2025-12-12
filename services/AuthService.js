export function useAuthService(axios) {
    const login = async (credentials) => {
        return await axios.post('/login', credentials);
    }

    const logout = async () => {
        return await axios.post('/logout');
    }

    return {
        login,
        logout
    }
}
