/**
 * ExpensesService
 * Handles all API requests related to expenses
 */

/**
 * Creates an expenses service with the provided axios instance
 * @param {object} axios - Axios instance
 * @returns {object} - Service methods
 */
export function useExpensesService(axios) {
    return {
        /**
         * Get all expenses with pagination and filters
         * @param {number} page - Page number
         * @param {object} filters - Filter object
         * @returns {Promise<object>} - Paginated expenses data
         */
        async getExpenses(page = 1, filters = {}) {
            const response = await axios.get('expenses', {
                params: {
                    page,
                    filters
                }
            });
            return response.data;
        },

        /**
         * Get a single expense by ID
         * @param {number} id - Expense ID
         * @returns {Promise<object>} - Expense data
         */
        async getExpenseById(id) {
            const response = await axios.get(`expenses/${id}`);
            return response.data;
        },

        /**
         * Create a new expense
         * @param {object} expenseData - Expense data
         * @returns {Promise<object>} - Created expense data
         */
        async createExpense(expenseData) {
            const response = await axios.post('expenses', expenseData);
            return response.data;
        },

        /**
         * Update an existing expense
         * @param {number} id - Expense ID
         * @param {object} expenseData - Updated expense data
         * @returns {Promise<object>} - Updated expense data
         */
        async updateExpense(id, expenseData) {
            const response = await axios.put(`expenses/${id}`, expenseData);
            return response.data;
        },

        /**
         * Delete an expense
         * @param {number} id - Expense ID
         * @returns {Promise<object>} - Deletion response
         */
        async deleteExpense(id) {
            const response = await axios.delete(`expenses/${id}`);
            return response.data;
        },

        /**
         * Delete multiple expenses
         * @param {array} ids - Array of expense IDs
         * @returns {Promise<object>} - Deletion response
         */
        async deleteExpenses(ids) {
            const response = await axios.delete('expenses', {
                data: { ids }
            });
            return response.data;
        }
    };
}
