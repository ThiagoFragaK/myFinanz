<template>
    <div>
        <LoginComponent />
    </div>
</template>

<script>
    import LoginComponent from '@/components/authenticate/LoginComponent.vue';
    
    definePageMeta({
        layout: 'auth'
    });

    export default {
        components: {
            LoginComponent
        },
    }
</script>