<template>
    <div class="min-vh-100 d-flex flex-column bg-light">
        <NavbarComponent :isAuth="true" />
        <div class="flex-grow-1 d-flex align-items-center justify-content-center p-4">
            <div class="card shadow-sm border-0 rounded-4 w-100" style="max-width: 400px;">
                <div class="card-body p-4">
                    <NuxtPage />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavbarComponent from '@/components/global/NavbarComponent.vue';
    export default {
        components: {
            NavbarComponent
        },
    };
</script>