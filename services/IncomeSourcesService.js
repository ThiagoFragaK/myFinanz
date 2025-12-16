/**
 * IncomeSourcesService
 * Handles all API requests related to income sources
 */

/**
 * Creates an income sources service with the provided axios instance
 * @param {object} axios - Axios instance
 * @returns {object} - Service methods
 */
export function useIncomeSourcesService(axios) {
    return {
        /**
         * Get all income sources with pagination
         * @param {number} page - Page number
         * @returns {Promise<object>} - Paginated income sources data
         */
        async getIncomeSources(page = 1) {
            const response = await axios.get('income/sources', {
                params: { page }
            });
            return response.data;
        },

        /**
         * Get a simple list of all income sources (for dropdowns/selects)
         * @returns {Promise<object>} - List of income sources
         */
        async getIncomeSourcesList() {
            const response = await axios.get('income/sources/list');
            return response.data;
        },

        /**
         * Get a single income source by ID
         * @param {number} id - Income source ID
         * @returns {Promise<object>} - Income source data
         */
        async getIncomeSourceById(id) {
            const response = await axios.get(`income/sources/${id}`);
            return response.data;
        },

        /**
         * Create a new income source
         * @param {object} data - Income source data
         * @returns {Promise<object>} - Created income source data
         */
        async createIncomeSource(data) {
            const response = await axios.post('income/sources', data);
            return response.data;
        },

        /**
         * Update an existing income source
         * @param {number} id - Income source ID
         * @param {object} data - Updated income source data
         * @returns {Promise<object>} - Updated income source data
         */
        async updateIncomeSource(id, data) {
            const response = await axios.put(`income/sources/${id}`, data);
            return response.data;
        },

        /**
         * Disable an income source
         * @param {number} id - Income source ID
         * @returns {Promise<object>} - Response
         */
        async disableIncomeSource(id) {
            const response = await axios.patch(`incomes/source/disable/${id}`);
            return response.data;
        },

        /**
         * Enable an income source
         * @param {number} id - Income source ID
         * @returns {Promise<object>} - Response
         */
        async enableIncomeSource(id) {
            const response = await axios.patch(`incomes/source/enable/${id}`);
            return response.data;
        }
    };
}
