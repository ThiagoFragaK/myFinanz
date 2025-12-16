/**
 * PaymentMethodsService
 * Handles all API requests related to payment methods
 */

/**
 * Creates a payment methods service with the provided axios instance
 * @param {object} axios - Axios instance
 * @returns {object} - Service methods
 */
export function usePaymentMethodsService(axios) {
    return {
        /**
         * Get all payment methods with pagination
         * @param {number} page - Page number
         * @returns {Promise<object>} - Paginated payment methods data
         */
        async getPaymentMethods(page = 1) {
            const response = await axios.get('payment_methods', {
                params: { page }
            });
            return response.data;
        },

        /**
         * Get a simple list of all payment methods (for dropdowns/selects)
         * @returns {Promise<object>} - List of payment methods
         */
        async getPaymentMethodsList() {
            const response = await axios.get('payment_methods/list');
            return response.data;
        },

        /**
         * Get a single payment method by ID
         * @param {number} id - Payment method ID
         * @returns {Promise<object>} - Payment method data
         */
        async getPaymentMethodById(id) {
            const response = await axios.get(`payment_methods/${id}`);
            return response.data;
        },

        /**
         * Create a new payment method
         * @param {object} data - Payment method data
         * @returns {Promise<object>} - Created payment method data
         */
        async createPaymentMethod(data) {
            const response = await axios.post('payment_methods', data);
            return response.data;
        },

        /**
         * Update an existing payment method
         * @param {number} id - Payment method ID
         * @param {object} data - Updated payment method data
         * @returns {Promise<object>} - Updated payment method data
         */
        async updatePaymentMethod(id, data) {
            const response = await axios.put(`payment_methods/${id}`, data);
            return response.data;
        },

        /**
         * Delete a payment method
         * @param {number} id - Payment method ID
         * @returns {Promise<object>} - Deletion response
         */
        async deletePaymentMethod(id) {
            const response = await axios.delete(`payment_methods/${id}`);
            return response.data;
        },

        /**
         * Disable a card
         * @param {number} id - Card ID
         * @returns {Promise<object>} - Response
         */
        async disableCard(id) {
            const response = await axios.patch(`cards/${id}`);
            return response.data;
        },

        /**
         * Enable a card
         * @param {number} id - Card ID
         * @returns {Promise<object>} - Response
         */
        async enableCard(id) {
            const response = await axios.patch(`cards/${id}`);
            return response.data;
        }
    };
}
