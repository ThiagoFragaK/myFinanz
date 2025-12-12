/**
 * CategoriesService
 * Handles all API requests related to categories
 */

/**
 * Creates a categories service with the provided axios instance
 * @param {object} axios - Axios instance
 * @returns {object} - Service methods
 */
export function useCategoriesService(axios) {
    return {
        /**
         * Get all categories with pagination and filters
         * @param {number} page - Page number
         * @param {object} filters - Filter object (e.g., { name: 'Food' })
         * @returns {Promise<object>} - Paginated categories data
         */
        async getCategories(page = 1, filters = {}) {
            const response = await axios.get('categories', {
                params: {
                    page,
                    filters
                }
            });
            return response.data;
        },

        /**
         * Get a single category by ID
         * @param {number} id - Category ID
         * @returns {Promise<object>} - Category data
         */
        async getCategoryById(id) {
            const response = await axios.get(`categories/${id}`);
            return response.data;
        },

        /**
         * Create a new category
         * @param {object} categoryData - Category data (name, description, icon)
         * @returns {Promise<object>} - Created category data
         */
        async createCategory(categoryData) {
            const response = await axios.post('categories', categoryData);
            return response.data;
        },

        /**
         * Update an existing category
         * @param {number} id - Category ID
         * @param {object} categoryData - Updated category data
         * @returns {Promise<object>} - Updated category data
         */
        async updateCategory(id, categoryData) {
            const response = await axios.put(`categories/${id}`, categoryData);
            return response.data;
        },

        /**
         * Get a simple list of all categories (for dropdowns/selects)
         * @returns {Promise<object>} - List of categories
         */
        async getCategoriesList() {
            const response = await axios.get('categories/list');
            return response.data;
        },

        /**
         * Delete a category
         * @param {number} id - Category ID
         * @returns {Promise<object>} - Deletion response
         */
        async deleteCategory(id) {
            const response = await axios.delete(`categories/${id}`);
            return response.data;
        },

        /**
         * Delete multiple categories
         * @param {array} ids - Array of category IDs
         * @returns {Promise<object>} - Deletion response
         */
        async deleteCategories(ids) {
            const response = await axios.delete('categories', {
                data: { ids }
            });
            return response.data;
        }
    };
}
