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
    export default {
        emits: ["allowActions"],
        components: {
            PaginationComponent,
            StatusBadge,
            TableComponent
        },
        data: () => ({
            columns: [
                { key: "name", label: "Name" },
                { key: "status", label: "Status" },
            ],
            pagination: {
                currentPage: 1,
                totalPages: 1,
                perPage: 10,
                totalItems: 0,
            },
            data: [],
            isLoading: true,
        }),
        methods: {
            getIncomeSources(page = 1) {
                this.isLoading = true;
                this.$axios.get(`income/sources?page=${page}`)
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
        },
        created() {
            this.getIncomeSources();
        }
    }
</script>