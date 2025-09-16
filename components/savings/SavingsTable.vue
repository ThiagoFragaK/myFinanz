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

    <PaginationComponent
        v-if="pagination.totalPages > 1"
        :current-page="pagination.currentPage"
        :total-pages="pagination.totalPages"
        :per-page="pagination.perPage"
        :total-items="pagination.totalItems"
        @change-page="getSavings"
    />
</template>

<script>
    import Dates from "@/helpers/Dates";
    import NumbersFormatter from "@/helpers/Numbers";
    import TableComponent from "@/components/global/TableComponent.vue";
    import PaginationComponent from "@/components/global/PaginationComponent.vue";
    export default {
        components: {
            PaginationComponent,
            TableComponent
        },
        data: () => ({
            columns: [
                { key: "created_at", label: "Data" },
                { key: "is_positive", label: "Transition type" },
                { key: "value", label: "Value" },
            ],
            pagination: {
                currentPage: 1,
                totalPages: 1,
                perPage: 10,
                totalItems: 0,
            },
            data: [],
            selectedRows: [],
            totalValue: 0,
            isLoading: true,
            filters: {},
        }),
        methods: {
            getSavings(page = 1) {
                this.isLoading = true;
                this.$axios.get(`savings?page=${page}`, { params: { filters: this.filters }})
                    .then(({ data }) => {
                        this.data = data.data.data;
                        this.totalValue = data.sum;
                        this.totalValue = NumbersFormatter.formatCurrencyBR(data.sum);
                        this.pagination = {
                            currentPage: data.data.current_page,
                            totalPages: data.data.last_page,
                            perPage: data.data.per_page,
                            totalItems: data.data.total,
                        };
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