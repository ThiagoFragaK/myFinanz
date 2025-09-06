<template>
    <button
        v-tooltip="'Return'" 
        type="button"
        title="Return"
        class="btn btn-primary mb-4"
        @click="returnToTable"
        :disabled="showTable"
    >
        <IconsLucide icon="ChevronLeft" />
    </button>
    <button
        v-tooltip="'Filters'"
        type="button"
        title="Open filters"
        class="btn btn-primary ms-2 mb-4"
        @click="toggleFilters"
    >
        <IconsLucide icon="Funnel" />
    </button>
    <button
        v-tooltip="'New expense'" 
        type="button"
        title="New Expense"
        class="btn btn-primary ms-2 mb-4"
        @click="newExpense"
        :disabled="disableBtns"
    >
        <IconsLucide icon="Plus" />
    </button>
    <button
        v-tooltip="'Edit expense'" 
        type="button"
        title="Edit Expense"
        class="btn btn-primary ms-2 mb-4"
        @click="editExpense"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="Pencil" />
    </button>
    <ExpensesFilters
        id="filters"
        class="mb-4"
        @filterData="filterTableData"
        ref="ExpensesFilters"
    />
    <ExpensesTable 
        v-if="showTable"
        @allowActions="updateSelection"
        ref="ExpensesTable"
    />
    <ExpensesForm 
        v-else
        :id="selectedExpense.id"
        :isEdit="isEdit"
        @save="save"
        ref="ExpensesForm"
    />
</template>

<script>
    import ExpensesForm from "@/components/expenses/ExpensesForm.vue";
    import ExpensesTable from "@/components/expenses/ExpensesTable.vue";
    import ExpensesFilters from "@/components/expenses/ExpensesFilters.vue";
    export default {
        components: {
            ExpensesFilters,
            ExpensesForm,
            ExpensesTable,
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
            newExpense() {
                this.showTable = this.isEdit = false;
            },
            editExpense() {
                this.showTable = false;
                this.isEdit = true;
            },
            save() {
                this.returnToTable();
                this.$refs.ExpensesTable.getExpenses();
            },
            toggleFilters() {
                this.$refs.ExpensesFilters.toggle();
            },
            filterTableData(filters) {
                this.$refs.ExpensesTable.filters = filters;
                this.$refs.ExpensesTable.getExpenses();
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
            selectedExpense() {
                if(this.selectedRows.length === 0) {
                    return [];
                }
                return this.selectedRows[0];
            }
        },
    }
</script>