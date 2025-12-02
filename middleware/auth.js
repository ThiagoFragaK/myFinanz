export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    // Initialize auth state from localStorage
    authStore.initializeAuth();

    // Check if user is authenticated
    if (!authStore.isAuthenticated) {
        // Redirect to login page
        return navigateTo('/login');
    }
});
