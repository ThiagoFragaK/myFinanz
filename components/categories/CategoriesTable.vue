<template>
    <TableComponent
        :data="data"
        :columns="columns"
        :isLoading="isLoading"
        @selectedRows="updateSelectedRows"
    >
        <template #cell-icon="{ data }">
            <IconsLucide :icon="data.row.icon" color="white" />
        </template>
    </TableComponent>

    <PaginationComponent
        v-if="pagination.totalPages > 1"
        :current-page="pagination.currentPage"
        :total-pages="pagination.totalPages"
        :per-page="pagination.perPage"
        :total-items="pagination.totalItems"
        @change-page="getCategories"
    />
</template>

<script>
import TableComponent from "@/components/global/TableComponent.vue";
import PaginationComponent from "@/components/global/PaginationComponent.vue";
export default {
    components: {
        PaginationComponent,
        TableComponent
    },
    data: () => ({
        columns: [
            { key: "icon", label: "Icon" },
            { key: "name", label: "Name" },
            { key: "description", label: "Description" },
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
            name: "",
        }
    }),
    methods: {
        getCategories(page = 1) {
            this.isLoading = true;
            this.$axios.get(`categories?page=${page}`, { params: { filters: this.filters } })
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
        }
    },
    created() {
        this.getCategories();
    }
}
</script>