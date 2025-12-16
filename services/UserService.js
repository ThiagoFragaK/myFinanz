export function useUserService(axios) {
    const getUser = async () => {
        return await axios.get('/user');
    }

    const updateSettings = async (settings) => {
        return await axios.put('/users/settings', settings);
    }

    const updatePassword = async (data) => {
        return await axios.post('/users/password', data);
    }

    return {
        getUser,
        updateSettings,
        updatePassword
    }
}
