<template>
    <TableComponent
        :data="data"
        :columns="columns"
        :isLoading="isLoading"
        @selectedRows="updateSelectedRows"
    >
        <template #cell-value="{ data }">
            {{ `R$ ${data.row.value}` }}
        </template>
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

    <PaginationComponent
        v-if="pagination.totalPages > 1"
        :current-page="pagination.currentPage"
        :total-pages="pagination.totalPages"
        :per-page="pagination.perPage"
        :total-items="pagination.totalItems"
        @change-page="getIncome"
    />
</template>

<script>
    import StatusBadge from "@/components/global/StatusBadgeComponent.vue";
    import TableComponent from "@/components/global/TableComponent.vue";
    import PaginationComponent from "@/components/global/PaginationComponent.vue";
    import { useIncomesService } from "@/services/IncomesService";

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
                { key: "value", label: "Value" },
                { key: "entry_day", label: "Entry day" },
                { key: "income_sources", label: "Income Source" },
                { key: "types", label: "Type" },
                { key: "status", label: "Status" },
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
            incomesService: null
        }),
        methods: {
            async getIncome(page = 1) {
                this.isLoading = true;
                try {
                    const response = await this.incomesService.getIncomes(page);
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
                        text: 'Failed to load incomes',
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
        },
        created() {
            this.incomesService = useIncomesService(this.$axios);
            this.getIncome();
        }
    }
</script>