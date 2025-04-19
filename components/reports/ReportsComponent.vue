<template>
    <div class="container my-5">
        <div class="card text-bg-primary shadow rounded-3">
            <div class="card-header fw-semibold">
                Reports
            </div>
            <div class="card-body">
                <TabsComponent :tabs="tabs">
                    <template #current>
                        <div>Home tab content goes here.</div>
                    </template>
                    <template #yearly>
                        <div>Profile tab content goes here.</div>
                    </template>
                    <template #comparaison>
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
                { name: "current", label: "Current month" },
                { name: "yearly", label: "Yearly overview" },
                { name: "comparaison", label: "Comparaison" },
            ],
        };
    },
    };
</script>