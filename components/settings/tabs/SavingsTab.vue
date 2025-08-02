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
        title="New Saving"
        class="btn btn-primary ms-2 mb-4"
        @click="newSaving"
        :disabled="disableBtns"
    >
        <IconsLucide icon="Plus" />
    </button>
    <button 
        type="button"
        title="Edit Saving"
        class="btn btn-primary ms-2 mb-4"
        @click="editSaving"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="Pencil" />
    </button>
    <SavingsTable 
        v-if="showTable"
        @allowActions="updateSelection"
        ref="SavingsTable"
    />
    <SavingsForm 
        v-else
        :id="selectedSaving.id"
        :isEdit="isEdit"
        @save="save"
        ref="SavingsForm"
    />
</template>

<script>
    import SavingsForm from "@/components/savings/SavingsForm.vue";
    import SavingsTable from "@/components/savings/SavingsTable.vue";
    export default {
        components: {
            SavingsForm,
            SavingsTable,
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
            newSaving() {
                this.showTable = this.isEdit = false;
            },
            editSaving() {
                this.showTable = false;
                this.isEdit = true;
            },
            save() {
                this.returnToTable();
                this.$refs.SavingsTable.getSavings();
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
            selectedSaving() {
                if(this.selectedRows.length === 0) {
                    return [];
                }
                return this.selectedRows[0];
            }
        },
    }
</script>