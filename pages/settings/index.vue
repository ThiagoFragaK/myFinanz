<template>
    <SettingsComponent />
</template>

<script setup>
    import SettingsComponent from '@/components/settings/SettingsComponent.vue';
    
    definePageMeta({
        middleware: ['auth']
    });
</script>