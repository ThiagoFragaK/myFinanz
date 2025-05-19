<template>
    <TableComponent
        :data="data"
        :columns="columns"
        @selectedRows="updateSelectedRows"
    >
        <template #cell-value="{ data }">
            {{ "R$" + data.row.value }}
        </template>
        <template #cell-due_day="{ data }">
            {{ data.row.due_day + "th"}}
        </template>
        <template #cell-status="{ data }">
            <StatusBadge :status="data.row.status" />
        </template>
        <template #cell-open="{ data }">
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
            TableComponent,
        },
        data: () => ({
            columns: [
                { key: "name", label: "Name" },
                { key: "description", label: "Description" },
                { key: "value", label: "Value" },
                { key: "due_day", label: "Due Date" },
                { key: "status", label: "Status" },
                { key: "open", label: "Payment status" },
            ],
            data: [],
            selectedRows: [],
        }),
        methods: {
            getPayments() {
                this.$axios.get(`payments`)
                    .then(({ data }) => {
                        this.data = data.data;
                    });
            },
            updateSelectedRows(rows) {
                this.selectedRows = rows;
                this.$emit("allowActions", rows);
            },
        },
        created() {
            this.getPayments();
        }
    }
</script>