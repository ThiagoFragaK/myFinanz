<template>
    <TableComponent
        :data="data"
        :columns="columns"
        :isLoading="isLoading"
        @selectedRows="updateSelectedRows"
    >
        <template #cell-categories="{ data }">
            <span v-if="data.row.category_id === null">-</span>
            <IconsLucide v-else :icon="data.row.categories.icon" />
        </template>
        <template #cell-payment_methods="{ data }">
            {{ data.row.payment_methods.name }}
        </template>
        <template #cell-created_at="{ data }">
            {{ formatDate(data.row.date) }}
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
        @change-page="getExpenses"
    />
</template>

<script>
    import DateHelper from "@/helpers/Dates";
    import StatusBadge from "@/components/global/StatusBadgeComponent.vue";
    import TableComponent from "@/components/global/TableComponent.vue";
    import PaginationComponent from "@/components/global/PaginationComponent.vue";
    export default {
        emits: ["allowActions"],
        components: {
            PaginationComponent,
            TableComponent,
            StatusBadge
        },
        data: () => ({
            columns: [
                { key: "name", label: "Name" },
                { key: "description", label: "Description" },
                { key: "payment_methods", label: "Payment methods" },
                { key: "categories", label: "Category" },
                { key: "created_at", label: "Date" },
                { key: "parcel_numbers", label: "Parcels" },
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
            isLoading: true,
            filters: {
                isCurrentMonth: true,
            },
        }),
        methods: {
            getExpenses(page = 1) {
                this.isLoading = true;
                this.$axios.get(`expenses?page=${page}`, { params: { filters: this.filters } })
                    .then(({ data }) => {
                        this.data = data.data.data;
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
            formatDate(date) {
                return DateHelper.getFormatedDate(date);
            },
        },
        created() {
            this.getExpenses();
        }
    }
</script>