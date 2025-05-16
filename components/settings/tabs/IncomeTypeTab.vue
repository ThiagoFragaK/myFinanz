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
        @click="newIncomeType"
        :disabled="disableBtns"
    >
        <IconsLucide icon="Plus" />
    </button>
    <button 
        type="button"
        title="Edit Income Type"
        class="btn btn-info ms-2 mb-4"
        @click="editIncomeType"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="Pencil" />
    </button>
    <IncomeTypesTable 
        v-if="showTable"
        @allowActions="updateSelection"
        ref="IncomeTypeTable"
    />
    <IncomeTypesForm 
        v-else
        :id="selectedIncomeType.id"
        :isEdit="isEdit"
        @save="save"
        ref="IncomeTypesForm"
    />
</template>

<script>
    import IncomeTypesForm from "@/components/income-types/IncomeTypesForm.vue";
    import IncomeTypesTable from "@/components/income-types/IncomeTypesTable.vue";
    export default {
        components: {
            IncomeTypesForm,
            IncomeTypesTable,
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
            newIncomeType() {
                this.showTable = this.isEdit = false;
            },
            editIncomeType() {
                this.showTable = false;
                this.isEdit = true;
            },
            save() {
                this.returnToTable();
                this.$refs.IncomeTypeTable.getIncomeTypes();
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
            selectedIncomeType() {
                if(this.selectedRows.length === 0) {
                    return [];
                }
                return this.selectedRows[0];
            }
        },
    }
</script>