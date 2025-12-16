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
import { useCategoriesService } from "@/services/CategoriesService";

export default {
    emits: ["allowActions"],
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
        },
        categoriesService: null
    }),
    methods: {
        async getCategories(page = 1) {
            this.isLoading = true;
            try {
                const response = await this.categoriesService.getCategories(page, this.filters);
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
                    text: 'Failed to load categories',
                    icon: 'error'
                });
            } finally {
                this.isLoading = false;
            }
        },
        updateSelectedRows(rows) {
            this.selectedRows = rows;
            this.$emit("allowActions", rows);
        }
    },
    created() {
        this.categoriesService = useCategoriesService(this.$axios);
        this.getCategories();
    }
}
</script>