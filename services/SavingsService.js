/**
 * SavingsService
 * Handles all API requests related to savings
 */

/**
 * Creates a savings service with the provided axios instance
 * @param {object} axios - Axios instance
 * @returns {object} - Service methods
 */
export function useSavingsService(axios) {
    return {
        /**
         * Get all savings with pagination and filters
         * @param {number} page - Page number
         * @param {object} filters - Filter object
         * @returns {Promise<object>} - Paginated savings data
         */
        async getSavings(page = 1, filters = {}) {
            const response = await axios.get('savings', {
                params: {
                    page,
                    filters
                }
            });
            return response.data;
        },

        /**
         * Get a single saving by ID
         * @param {number} id - Saving ID
         * @returns {Promise<object>} - Saving data
         */
        async getSavingById(id) {
            const response = await axios.get(`savings/${id}`);
            return response.data;
        },

        /**
         * Create a new saving
         * @param {object} savingData - Saving data
         * @returns {Promise<object>} - Created saving data
         */
        async createSaving(savingData) {
            const response = await axios.post('savings', savingData);
            return response.data;
        },

        /**
         * Update an existing saving
         * @param {number} id - Saving ID
         * @param {object} savingData - Updated saving data
         * @returns {Promise<object>} - Updated saving data
         */
        async updateSaving(id, savingData) {
            const response = await axios.put(`savings/${id}`, savingData);
            return response.data;
        },

        /**
         * Delete a saving
         * @param {number} id - Saving ID
         * @returns {Promise<object>} - Deletion response
         */
        async deleteSaving(id) {
            const response = await axios.delete(`savings/${id}`);
            return response.data;
        }
    };
}
