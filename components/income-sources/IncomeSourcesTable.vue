<template>
    <TableComponent
        :data="data"
        :columns="columns"
        :isLoading="isLoading"
        @selectedRows="updateSelectedRows"
    >
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
        @change-page="getIncomeSources"
    />
</template>

<script>
    import StatusBadge from "@/components/global/StatusBadgeComponent.vue";
    import TableComponent from "@/components/global/TableComponent.vue";
    import PaginationComponent from "@/components/global/PaginationComponent.vue";
    import { useIncomeSourcesService } from '@/services/IncomeSourcesService';

    export default {
        emits: ["allowActions"],
        components: {
            PaginationComponent,
            StatusBadge,
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
            isLoading: true,
            incomeSourcesService: null
        }),
        computed: {
            columns() {
                return [
                     { key: "name", label: this.$t('income_sources.table.name') },
                     { key: "status", label: this.$t('income_sources.table.status') },
                ]
            }
        },
        mounted() {
            this.incomeSourcesService = useIncomeSourcesService(this.$axios);
            this.getIncomeSources();
        },
        methods: {
            async getIncomeSources(page = 1) {
                this.isLoading = true;
                try {
                    const response = await this.incomeSourcesService.getIncomeSources(page);
                    this.data = response.data.data;
                    this.pagination = {
                        currentPage: response.data.current_page,
                        totalPages: response.data.last_page,
                        perPage: response.data.per_page,
                        totalItems: response.data.total,
                    };
                } catch (error) {
                    this.$notify({
                        title: this.$t('common.error'),
                        text: this.$t('income_sources.notifications.load_error'),
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
            this.incomeSourcesService = useIncomeSourcesService(this.$axios);
            this.getIncomeSources();
        }
    }
</script>