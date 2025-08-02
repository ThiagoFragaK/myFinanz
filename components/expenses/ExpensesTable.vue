<template>
    <TableComponent
        :data="data"
        :columns="columns"
        :isLoading="isLoading"
        @selectedRows="updateSelectedRows"
    >
        <template #cell-cards="{ data }">
            {{ data.row.cards.name }}
        </template>
        <template #cell-created_at="{ data }">
            {{ formatDate(data.row.created_at) }}
        </template>
        <template #cell-value="{ data }">
            {{ "R$ " + data.row.value }}
        </template>
    </TableComponent>
</template>

<script>
    import DateHelper from "@/helpers/Dates";
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
                { key: "description", label: "Description" },
                { key: "cards", label: "Card" },
                { key: "created_at", label: "Date" },
                { key: "parcel_numbers", label: "Parcels" },
                { key: "value", label: "Value" },
            ],
            data: [],
            selectedRows: [],
            isLoading: true,
        }),
        methods: {
            getExpenses() {
                this.isLoading = true;
                this.$axios.get(`expenses`)
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
            formatDate(date) {
                return DateHelper.getFormatedDate(date);
            },
        },
        created() {
            this.getExpenses();
        }
    }
</script>