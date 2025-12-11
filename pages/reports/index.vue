<template>
    <ReportsComponent />
</template>

<script>
import ReportsComponent from '@/components/reports/ReportsComponent.vue';

definePageMeta({
    middleware: ['auth']
});

export default {
    components: {
        ReportsComponent
    }
};
</script>