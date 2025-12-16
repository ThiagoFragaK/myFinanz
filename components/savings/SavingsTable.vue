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
            {{ formatCurrency(data.row.value) }}
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
    import { useAuthStore } from '@/stores/auth';
    import { useSavingsService } from '@/services/SavingsService';

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
            totalValue: 0,
            isLoading: true,
            filters: {},
            savingsService: null
        }),
        computed: {
            columns() {
                return [
                     { key: "created_at", label: this.$t('savings.table.date') },
                     { key: "is_positive", label: this.$t('savings.table.type') },
                     { key: "value", label: this.$t('savings.table.value') },
                ]
            }
        },
        setup() {
            const authStore = useAuthStore();
            return { authStore };
        },
        methods: {
            async getSavings(page = 1) {
                this.isLoading = true;
                try {
                    const response = await this.savingsService.getSavings(page, this.filters);
                    const data = response.data;
                    this.data = data.data;
                    this.totalValue = NumbersFormatter.formatCurrency(response.sum, this.authStore.currency);
                    this.pagination = {
                        currentPage: data.current_page,
                        totalPages: data.last_page,
                        perPage: data.per_page,
                        totalItems: data.total,
                    };
                } catch (error) {
                    this.$notify({
                        title: this.$t('common.error'),
                        text: this.$t('savings.notifications.load_error'),
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
            translateTransitionType(type) {
                return type === 1 ? this.$t('savings.types.increase') : this.$t('savings.types.decrease');
            },
            formateDate(date) {
                return Dates.getFormatedDate(date);
            },
            formatCurrency(value) {
                return NumbersFormatter.formatCurrency(value, this.authStore.currency);
            }
        },
        created() {
            this.savingsService = useSavingsService(this.$axios);
            this.getSavings();
        }
    }
</script>