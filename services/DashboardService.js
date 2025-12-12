/**
 * DashboardService
 * Handles all API requests related to dashboard data
 */

/**
 * Creates a dashboard service with the provided axios instance
 * @param {object} axios - Axios instance
 * @returns {object} - Service methods
 */
export function useDashboardService(axios) {
    return {
        /**
         * Get balance card data
         * @returns {Promise<object>} - Balance data
         */
        async getBalanceData() {
            const response = await axios.get('dashboard/balance');
            return response.data;
        },

        /**
         * Get expenses card data
         * @returns {Promise<object>} - Expenses data
         */
        async getExpensesData() {
            const response = await axios.get('dashboard/expenses');
            return response.data;
        },

        /**
         * Get savings card data
         * @returns {Promise<object>} - Savings data
         */
        async getSavingsData() {
            const response = await axios.get('dashboard/savings');
            return response.data;
        },

        /**
         * Get monthly balance graph data
         * @returns {Promise<object>} - Monthly graph data
         */
        async getMonthlyGraphData() {
            const response = await axios.get('dashboard/graph/monthly');
            return response.data;
        },

        /**
         * Get categories graph data
         * @returns {Promise<object>} - Categories graph data
         */
        async getCategoriesGraphData() {
            const response = await axios.get('dashboard/graph/categories');
            return response.data;
        },

        /**
         * Get savings graph data
         * @returns {Promise<object>} - Savings graph data
         */
        async getSavingsGraphData() {
            const response = await axios.get('dashboard/graph/savings');
            return response.data;
        }
    };
}
