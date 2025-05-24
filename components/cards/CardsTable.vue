<template>
    <TableComponent
        :data="data"
        :columns="columns"
        @selectedRows="updateSelectedRows"
    >
        <template #cell-turn_day="{ data }">
            {{ data.row.turn_day + "th"}}
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
                { key: "turn_day", label: "Turn Day" },
                { key: "limit", label: "Limit" },
                { key: "status", label: "Status" },
            ],
            data: [],
            selectedRows: [],
        }),
        methods: {
            getCards() {
                this.$axios.get(`cards`)
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
            this.getCards();
        }
    }
</script>