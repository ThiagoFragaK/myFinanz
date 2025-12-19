<template>
    <TableComponent
        :data="data"
        :columns="columns"
        :isLoading="isLoading"
        @selectedRows="updateSelectedRows"
    ></TableComponent>
    <PaginationComponent
        v-if="pagination.totalPages > 1"
        :current-page="pagination.currentPage"
        :total-pages="pagination.totalPages"
        :per-page="pagination.perPage"
        :total-items="pagination.totalItems"
        @change-page="getIncomeTypes"
    />
</template>

<script>
    import TableComponent from "@/components/global/TableComponent.vue";
    import PaginationComponent from "@/components/global/PaginationComponent.vue";
    import { useIncomeTypesService } from '@/services/IncomeTypesService';

    export default {
        emits: ["allowActions"],
        components: {
            PaginationComponent,
            TableComponent
        },
        data: () => ({
            pagination: {
                currentPage: 1,
                totalPages: 1,
                perPage: 10,
                totalItems: 0,
            },
            data: [],
            selectedRows: [],
            isLoading: true,
            incomeTypesService: null
        }),
        computed: {
            columns() {
                return [
                     { key: "id", label: this.$t('income_types.table.code') },
                     { key: "name", label: this.$t('income_types.table.name') },
                ]
            }
        },
        methods: {
            async getIncomeTypes(page = 1) {
                this.isLoading = true;
                try {
                    const response = await this.incomeTypesService.getIncomeTypes(page);
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
                        text: 'Failed to load income types',
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
            this.incomeTypesService = useIncomeTypesService(this.$axios);
            this.getIncomeTypes();
        }
    }
</script>