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
    import { useExpensesService } from "@/services/ExpensesService";

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
            expensesService: null
        }),
        methods: {
            async getExpenses(page = 1) {
                this.isLoading = true;
                try {
                    const response = await this.expensesService.getExpenses(page, this.filters);
                    this.data = response.data.data;
                    this.pagination = {
                        currentPage: response.data.current_page,
                        totalPages: response.data.last_page,
                        perPage: response.data.per_page,
                        totalItems: response.data.total,
                    };
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: 'Failed to load expenses',
                        icon: 'error'
                    });
                } finally {
                    this.isLoading = false;
                }
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
            this.expensesService = useExpensesService(this.$axios);
            this.getExpenses();
        }
    }
</script>