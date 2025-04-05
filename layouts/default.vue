<template>
    <div class="m-0 p-0 min-vh-100 d-flex flex-column">
        <Navbar />
        <div class=" mx-4 my-4 flex-grow-1 card text-white bg-primary rounded-0 m-0">
            <div class="card-body h-100">
                <Breadcrumb />
                <NuxtPage />
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from "@/components/layout/Navbar.vue";
    import Breadcrumb from "~/components/layout/MainMenu.vue";
    export default {
        components: {
            Breadcrumb,
            Navbar
        },
    };
</script>