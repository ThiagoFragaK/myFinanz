<template>
    <TableComponent
        :data="data"
        :columns="columns"
        :isLoading="isLoading"
        @selectedRows="updateSelectedRows"
    >
        <template #cell-status="{ data }">
            <StatusBadge :status="data.row.status" />
        </template>
    </TableComponent>
</template>

<script>
    import StatusBadge from "@/components/global/StatusBadgeComponent.vue";
    import TableComponent from "@/components/global/TableComponent.vue";
    export default {
        components: {
            StatusBadge,
            TableComponent
        },
        data: () => ({
            columns: [
                { key: "name", label: "Name" },
                { key: "status", label: "Status" },
            ],
            data: [],
            isLoading: true,
        }),
        methods: {
            getIncomeSources() {
                this.isLoading = true;
                this.$axios.get(`income/sources`)
                    .then(({ data }) => {
                        this.data = data.data;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            updateSelectedRows(rows) {
                this.selectedRows = rows;
                this.$emit("allowActions", rows);
            },
        },
        created() {
            this.getIncomeSources();
        }
    }
</script>