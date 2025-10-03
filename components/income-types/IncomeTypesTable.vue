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
    export default {
        emits: ["allowActions"],
        components: {
            PaginationComponent,
            TableComponent
        },
        data: () => ({
            columns: [
                { key: "id", label: "Code" },
                { key: "name", label: "Name" },
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
        }),
        methods: {
            getIncomeTypes(page = 1) {
                this.isLoading = true;
                this.$axios.get(`income/types?page=${page}`)
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
            this.getIncomeTypes();
        }
    }
</script>