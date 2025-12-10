<template>
    <ReportsComponent />
</template>

<script setup>
    import ReportsComponent from '@/components/reports/ReportsComponent.vue';
    
    definePageMeta({
        middleware: ['auth']
    });
</script>