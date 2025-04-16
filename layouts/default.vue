<template>
    <div>
        <NavbarComponent />
        <div class="mx-4 my-2">
            <div class="card-body">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>

<script>
    import NavbarComponent from '~/components/global/NavbarComponent.vue';
    export default {
        components: {
            NavbarComponent
        },
    };
</script>