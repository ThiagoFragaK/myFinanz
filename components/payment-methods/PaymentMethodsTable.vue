<template>
    <TableComponent
        :data="data"
        :columns="columns"
        :isLoading="isLoading"
        @selectedRows="updateSelectedRows"
    >
        <template #cell-type="{ data }">
            {{ data.row.type === 1 ? "Credict Card" : "Debt" }}
        </template>
        <template #cell-turn_day="{ data }">
            {{ data.row.turn_day + "th"}}
        </template>
        <template #cell-limit="{ data }">
            {{ `R$ ${data.row.limit}`}}
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
        @change-page="getPaymentMethods"
    />
</template>

<script>
    import StatusBadge from "@/components/global/StatusBadgeComponent.vue";
    import TableComponent from "@/components/global/TableComponent.vue";
    import PaginationComponent from "@/components/global/PaginationComponent.vue";
    import { usePaymentMethodsService } from '@/services/PaymentMethodsService';

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
                { key: "type", label: "Type" },
                { key: "turn_day", label: "Turn Day" },
                { key: "limit", label: "Limit" },
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
            paymentMethodsService: null
        }),
        methods: {
            async getPaymentMethods(page = 1) {
                this.isLoading = true;
                try {
                    const response = await this.paymentMethodsService.getPaymentMethods(page);
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
                        text: 'Failed to load payment methods',
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
            this.paymentMethodsService = usePaymentMethodsService(this.$axios);
            this.getPaymentMethods();
        }
    }
</script>