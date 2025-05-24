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
        title="New Income"
        class="btn btn-info ms-2 mb-4"
        @click="newIncome"
        :disabled="disableBtns"
    >
        <IconsLucide icon="Plus" />
    </button>
    <button 
        type="button"
        title="Edit Income"
        class="btn btn-info ms-2 mb-4"
        @click="editIncome"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="Pencil" />
    </button>
    <button 
        type="button"
        title="Disable Income"
        class="btn btn-info ms-2 mb-4"
        :disabled="hasntOnlyOneSelected"
        @click="disableIncome"
    >
        <IconsLucide icon="CircleSlash" />
    </button>
    <button 
        type="button"
        title="Enable Income"
        class="btn btn-info ms-2 mb-4"
        :disabled="hasntOnlyOneSelected"
        @click="enableIncome"
    >
        <IconsLucide icon="CircleCheckBig" />
    </button>
    <IncomeTable 
        v-if="showTable" 
        @allowActions="updateSelection"
        ref="IncomeTable"
    />
    <IncomeForm 
        v-else 
        :id="selectedIncome.id"
        :isEdit="isEdit"
        @save="saveIncome"
        ref="IncomeForm"
    />
</template>

<script>
    import IncomeForm from "@/components/incomes/IncomeForm.vue";
    import IncomeTable from "@/components/incomes/IncomeTable.vue";
    export default {
        components: {
            IncomeForm,
            IncomeTable,
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
            newIncome() {
                this.showTable = this.isEdit = false;
            },
            editIncome() {
                this.showTable = false;
                this.isEdit = true;
            },
            saveIncome() {
                this.returnToTable();
                this.$refs.IncomeTable.getIncomeSources();
            },
            disableIncome() {
                this.$axios.patch(`incomes/disable/${this.selectedIncome.id}`)
                    .then(({ data }) => {
                        this.data = data;
                    })
                    .finally(() => {
                        this.$refs.IncomeTable.getIncomeSources();
                    });
            },
            enableIncome() {
                this.$axios.patch(`incomes/enable/${this.selectedIncome.id}`)
                    .then(({ data }) => {
                        this.data = data;
                    })
                    .finally(() => {
                        this.$refs.IncomeTable.getIncomeSources();
                    });
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
            selectedIncome() {
                if(this.selectedRows.length === 0) {
                    return [];
                }
                return this.selectedRows[0];
            }
        }
    }
</script>