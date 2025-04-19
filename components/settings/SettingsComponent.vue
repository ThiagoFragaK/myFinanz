<template>
    <div class="container my-5">
        <div class="card text-bg-primary shadow rounded-3">
            <div class="card-header fw-semibold">
                Settings
            </div>
            <div class="card-body">
                <TabsComponent :tabs="tabs">
                    <template #main>
                        <div>Home tab content goes here.</div>
                    </template>
                    <template #cards>
                        <div>Profile tab content goes here.</div>
                    </template>
                    <template #salaries>
                        <div>Contact tab content goes here.</div>
                    </template>
                    <template #payments>
                        <div>Contact tab content goes here.</div>
                    </template>
                </TabsComponent>
            </div>
        </div>
    </div>
  </template>

<script>
    import TabsComponent from '@/components/global/TabsComponent.vue';
    export default {
    components: {
        TabsComponent,
    },
    data() {
        return {
            tabs: [
                { name: "main", label: "Main settings" },
                { name: "cards", label: "Cards" },
                { name: "salaries", label: "Salaries" },
                { name: "payments", label: "Constant payments" },
            ],
        };
    },
    };
</script>