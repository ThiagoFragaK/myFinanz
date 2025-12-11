<template>
    <UsersComponent />
</template>

<script>
import UsersComponent from '@/components/users/UsersComponent.vue';

definePageMeta({
    middleware: ['auth']
});

export default {
    components: {
        UsersComponent
    }
};
</script>
