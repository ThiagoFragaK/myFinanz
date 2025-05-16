<template>
    <button 
        type="button"
        title="Return"
        class="btn btn-info mb-4"
        @click="returnToTable"
        :disabled="showTable"
    >
        <IconsLucide icon="ChevronLeft" />
    </button>
    <button 
        type="button"
        title="New Income Type"
        class="btn btn-info ms-2 mb-4"
        @click="newIncomeSource"
        :disabled="disableBtns"
    >
        <IconsLucide icon="Plus" />
    </button>
    <button 
        type="button"
        title="Edit Income Type"
        class="btn btn-info ms-2 mb-4"
        @click="editIncomeSource"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="Pencil" />
    </button>
    <IncomeSourcesTable 
        v-if="showTable"
        @allowActions="updateSelection"
        ref="IncomeSourcesTable"
    />
    <IncomeSourcesForm 
        v-else
        :id="selectedIncomeSource.id"
        :isEdit="isEdit"
        @save="saveIncomeSource"
        ref="IncomeSourcesForm"
    />
</template>

<script>
    import IncomeSourcesForm from "@/components/income-sources/IncomeSourcesForm.vue";
    import IncomeSourcesTable from "@/components/income-sources/IncomeSourcesTable.vue";
    export default {
        components: {
            IncomeSourcesForm,
            IncomeSourcesTable,
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
            newIncomeSource() {
                this.showTable = this.isEdit = false;
            },
            editIncomeSource() {
                this.showTable = false;
                this.isEdit = true;
            },
            saveIncomeSource() {
                this.returnToTable();
                this.$refs.IncomeSourcesTable.getIncomeSources();
            },
        },
        computed: {
            disableBtns() {
                return !this.showTable;
            },
            hasntRowsSelected() {
                if(this.disableBtns) return true;
                return this.selectedRows.length === 0;
            },
            hasntOnlyOneSelected() {
                if(this.disableBtns) return true;
                return this.selectedRows.length !== 1;
            },
            selectedIncomeSource() {
                if(this.selectedRows.length === 0) {
                    return [];
                }
                return this.selectedRows[0];
            }
        },
    }
</script>