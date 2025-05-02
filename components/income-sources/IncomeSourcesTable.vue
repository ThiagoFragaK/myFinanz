<template>
    <TableComponent
        :data="data"
        :columns="columns"
    >
    </TableComponent>
</template>

<script>
    import TableComponent from "@/components/global/TableComponent.vue"
    export default {
        components: {
            TableComponent
        },
        data: () => ({
            columns: [
                { key: "id", label: "Id" },
                { key: "name", label: "Name" },
                { key: "status", label: "Status" },
                { key: "actions", label: "Actions" },
            ],
            data: [
                { id: 1, name: "TechNova Ltd.", status: 1 },
                { id: 2, name: "GreenField Solutions", status: 0 },
                { id: 3, name: "Skyline Ventures", status: 0 },
                { id: 4, name: "BrightPath Corp.", status: 1 },
                { id: 5, name: "FusionWorks", status: 0 },
                { id: 6, name: "BlueOcean Enterprises", status: 0 },
                { id: 7, name: "CoreLogic Systems", status: 1 },
                { id: 8, name: "NexaDigital", status: 0 },
                { id: 9, name: "AltaTech Industries", status: 1 },
                { id: 10, name: "VeraSoft", status: 0 }
            ],
        }),
        methods: {
            getIncomeSources() {

            },
        },
        created() {
            this.getIncomeSources();
        }
    }
</script>