/**
 * IncomesService
 * Handles all API requests related to incomes
 */

/**
 * Creates an incomes service with the provided axios instance
 * @param {object} axios - Axios instance
 * @returns {object} - Service methods
 */
export function useIncomesService(axios) {
    return {
        /**
         * Get all incomes with pagination
         * @param {number} page - Page number
         * @returns {Promise<object>} - Paginated incomes data
         */
        async getIncomes(page = 1) {
            const response = await axios.get('incomes', {
                params: { page }
            });
            return response.data;
        },

        /**
         * Get a single income by ID
         * @param {number} id - Income ID
         * @returns {Promise<object>} - Income data
         */
        async getIncomeById(id) {
            const response = await axios.get(`incomes/${id}`);
            return response.data;
        },

        /**
         * Create a new income
         * @param {object} incomeData - Income data
         * @returns {Promise<object>} - Created income data
         */
        async createIncome(incomeData) {
            const response = await axios.post('incomes', incomeData);
            return response.data;
        },

        /**
         * Update an existing income
         * @param {number} id - Income ID
         * @param {object} incomeData - Updated income data
         * @returns {Promise<object>} - Updated income data
         */
        async updateIncome(id, incomeData) {
            const response = await axios.put(`incomes/${id}`, incomeData);
            return response.data;
        },

        /**
         * Delete an income
         * @param {number} id - Income ID
         * @returns {Promise<object>} - Deletion response
         */
        async deleteIncome(id) {
            const response = await axios.delete(`incomes/${id}`);
            return response.data;
        },

        /**
         * Disable an income
         * @param {number} id - Income ID
         * @returns {Promise<object>} - Response
         */
        async disableIncome(id) {
            const response = await axios.patch(`incomes/disable/${id}`);
            return response.data;
        },

        /**
         * Enable an income
         * @param {number} id - Income ID
         * @returns {Promise<object>} - Response
         */
        async enableIncome(id) {
            const response = await axios.patch(`incomes/enable/${id}`);
            return response.data;
        }
    };
}
