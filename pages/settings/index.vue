<template>
    <SettingsComponent />
</template>

<script>
import SettingsComponent from '@/components/settings/SettingsComponent.vue';

definePageMeta({
    middleware: ['auth']
});

export default {
    components: {
        SettingsComponent
    }
};
</script>