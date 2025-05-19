<template>
    <TableComponent
        :data="data"
        :columns="columns"
        @selectedRows="updateSelectedRows"
    >
        <template #cell-income_sources="{ data }">
            {{ data.row.income_sources.name }}
        </template>
        <template #cell-types="{ data }">
            {{ data.row.types.name }}
        </template>
        <template #cell-entry_day="{ data }">
            {{ `${data.row.entry_day}th` }}
        </template>
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
            TableComponent,
            StatusBadge
        },
        data: () => ({
            columns: [
                { key: "name", label: "Name" },
                { key: "value", label: "Value" },
                { key: "entry_day", label: "Entry day" },
                { key: "income_sources", label: "Income Source" },
                { key: "types", label: "Type" },
                { key: "status", label: "Status" },
            ],
            data: [],
            selectedRows: [],
        }),
        methods: {
            getIncomeSources() {
                this.$axios.get(`incomes`)
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
            this.getIncomeSources();
        }
    }
</script>