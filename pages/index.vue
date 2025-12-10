<template>
    <HomeComponent />
</template>

<script setup>
    import HomeComponent from '@/components/home/HomeComponent.vue';
    
    definePageMeta({
        middleware: ['auth']
    });
</script>