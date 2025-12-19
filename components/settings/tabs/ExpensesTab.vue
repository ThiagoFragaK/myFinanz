<template>
    <button
        v-tooltip="$t('common.return')" 
        type="button"
        :title="$t('common.return')"
        class="btn btn-primary mb-4"
        @click="returnToTable"
        :disabled="showTable"
    >
        <IconsLucide icon="ChevronLeft" />
    </button>
    <button
        v-tooltip="$t('common.filters')"
        type="button"
        :title="$t('common.filters')"
        class="btn btn-primary ms-2 mb-4"
        @click="toggleFilters"
    >
        <IconsLucide icon="Funnel" />
    </button>
    <button
        v-tooltip="$t('expenses.new')" 
        type="button"
        :title="$t('expenses.new')"
        class="btn btn-primary ms-2 mb-4"
        @click="newExpense"
        :disabled="disableBtns"
    >
        <IconsLucide icon="Plus" />
    </button>
    <button
        v-tooltip="$t('expenses.edit')" 
        type="button"
        :title="$t('expenses.edit')"
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