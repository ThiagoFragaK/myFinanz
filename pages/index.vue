<template>
    <HomeComponent />
</template>

<script>
import HomeComponent from '@/components/home/HomeComponent.vue';

definePageMeta({
    middleware: ['auth']
});

export default {
    components: {
        HomeComponent
    }
};
</script>