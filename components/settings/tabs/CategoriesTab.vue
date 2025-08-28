<template>
    <button 
        type="button"
        title="Return"
        class="btn btn-primary mb-4"
        @click="returnToTable"
        :disabled="showTable"
    >
        <IconsLucide icon="ChevronLeft" />
    </button>
    <button 
        type="button"
        title="New Category"
        class="btn btn-primary ms-2 mb-4"
        @click="newCategory"
        :disabled="disableBtns"
    >
        <IconsLucide icon="Plus" />
    </button>
    <button 
        type="button"
        title="Edit Category"
        class="btn btn-primary ms-2 mb-4"
        @click="editCategory"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="Pencil" />
    </button>
    <CategoriesTable 
        v-if="showTable"
        @allowActions="updateSelection"
        ref="CategoriesTable"
    />
    <CategoriesForm 
        v-else
        :id="selectedCategory.id"
        :isEdit="isEdit"
        @save="save"
        ref="CategoriesForm"
    />
</template>

<script>
import CategoriesForm from "@/components/categories/CategoriesForm.vue";
import CategoriesTable from "@/components/categories/CategoriesTable.vue";

export default {
    components: {
        CategoriesForm,
        CategoriesTable,
    },
    data: () => ({
        selectedRows: [],
        showTable: true,
        isEdit: false,
    }),
    methods: {
        returnToTable() {
            this.selectedRows = [];
            this.showTable = true;
        },
        updateSelection(selectedRows) {
            this.selectedRows = selectedRows;
        },
        newCategory() {
            this.showTable = this.isEdit = false;
        },
        editCategory() {
            this.showTable = false;
            this.isEdit = true;
        },
        save() {
            this.returnToTable();
            this.$refs.CategoriesTable.getCategories();
        },
    },
    computed: {
        disableBtns() {
            return !this.showTable;
        },
        hasntRowsSelected() {
            if (this.disableBtns) return true;
            return this.selectedRows.length === 0;
        },
        hasntOnlyOneSelected() {
            if (this.disableBtns) return true;
            return this.selectedRows.length !== 1;
        },
        selectedCategory() {
            if (this.selectedRows.length === 0) {
                return [];
            }
            return this.selectedRows[0];
        }
    },
}
</script>