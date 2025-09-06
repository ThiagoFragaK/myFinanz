<template>
    <h4>Total: {{ totalValue }}</h4>
    <TableComponent
        :data="data"
        :columns="columns"
        :isLoading="isLoading"
        @selectedRows="updateSelectedRows"
    >
        <template #cell-is_positive="{ data }">
            {{ translateTransitionType(data.row.is_positive) }}
        </template>
        <template #cell-created_at="{ data }">
            {{ formateDate(data.row.created_at) }}
        </template>
        <template #cell-value="{ data }">
            {{ "R$ " + data.row.value }}
        </template>
    </TableComponent>
</template>

<script>
    import Dates from "@/helpers/Dates";
    import NumbersFormatter from "@/helpers/Numbers";
    import TableComponent from "@/components/global/TableComponent.vue";
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
            isLoading: true,
            filters: {},
        }),
        methods: {
            getSavings() {
                this.isLoading = true;
                this.$axios.get(`savings`, { params: { filters: this.filters }})
                    .then(({ data }) => {
                        this.data = data.data;
                        this.totalValue = data.sum;
                        this.totalValue = NumbersFormatter.formatCurrencyBR(data.sum);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            updateSelectedRows(rows) {
                this.selectedRows = rows;
                this.$emit("allowActions", rows);
            },
            translateTransitionType(type) {
                return type === 1 ? "Increase" : "Decrease";
            },
            formateDate(date) {
                return Dates.getFormatedDate(date);
            }
        },
        created() {
            this.getSavings();
        }
    }
</script>