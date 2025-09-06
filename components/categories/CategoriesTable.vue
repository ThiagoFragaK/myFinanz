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
</template>

<script>
import TableComponent from "@/components/global/TableComponent.vue";

export default {
    components: {
        TableComponent
    },
    data: () => ({
        columns: [
            { key: "icon", label: "Icon" },
            { key: "name", label: "Name" },
            { key: "description", label: "Description" },
        ],
        data: [],
        selectedRows: [],
        isLoading: true,
        filters: {
            name: "",
        }
    }),
    methods: {
        getCategories() {
            this.isLoading = true;
            this.$axios.get(`categories`, { params: { filters: this.filters } })
                .then(({ data }) => {
                    this.data = data.data;
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