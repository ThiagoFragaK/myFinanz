/**
 * IncomeTypesService
 * Handles all API requests related to income types
 */

/**
 * Creates an income types service with the provided axios instance
 * @param {object} axios - Axios instance
 * @returns {object} - Service methods
 */
export function useIncomeTypesService(axios) {
    return {
        /**
         * Get all income types with pagination
         * @param {number} page - Page number
         * @returns {Promise<object>} - Paginated income types data
         */
        async getIncomeTypes(page = 1) {
            const response = await axios.get('income/types', {
                params: { page }
            });
            return response.data;
        },

        /**
         * Get a simple list of all income types (for dropdowns/selects)
         * @returns {Promise<object>} - List of income types
         */
        async getIncomeTypesList() {
            const response = await axios.get('income/types/list');
            return response.data;
        },

        /**
         * Get a single income type by ID
         * @param {number} id - Income type ID
         * @returns {Promise<object>} - Income type data
         */
        async getIncomeTypeById(id) {
            const response = await axios.get(`income/types/${id}`);
            return response.data;
        },

        /**
         * Create a new income type
         * @param {object} data - Income type data
         * @returns {Promise<object>} - Created income type data
         */
        async createIncomeType(data) {
            const response = await axios.post('income/types', data);
            return response.data;
        },

        /**
         * Update an existing income type
         * @param {number} id - Income type ID
         * @param {object} data - Updated income type data
         * @returns {Promise<object>} - Updated income type data
         */
        async updateIncomeType(id, data) {
            const response = await axios.put(`income/types/${id}`, data);
            return response.data;
        }
    };
}
