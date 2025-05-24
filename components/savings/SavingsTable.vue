<template>
    <h4>Total: R$ {{ totalValue }}</h4>
    <TableComponent
        :data="data"
        :columns="columns"
        @selectedRows="updateSelectedRows"
    >
        <template #cell-is_positive="{ data }">
            {{ translateTransitionType(data.row.is_positive) }}
        </template>
        <template #cell-created_at="{ data }">
            {{ data.row.created_at }}
        </template>
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
                { key: "created_at", label: "Data" },
                { key: "is_positive", label: "Transition type" },
                { key: "value", label: "Value" },
            ],
            data: [],
            selectedRows: [],
            totalValue: 0,
        }),
        methods: {
            getIncomeTypes() {
                this.$axios.get(`savings`)
                    .then(({ data }) => {
                        this.data = data.data;
                        this.totalValue = data.sum;
                    });
            },
            updateSelectedRows(rows) {
                this.selectedRows = rows;
                this.$emit("allowActions", rows);
            },
            translateTransitionType(type) {
                return type === 1 ? "Increase" : "Decrease";
            }
        },
        created() {
            this.getIncomeTypes();
        }
    }
</script>