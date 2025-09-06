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
        v-tooltip="'New saving'" 
        type="button"
        title="New Saving"
        class="btn btn-primary ms-2 mb-4"
        @click="newSaving"
        :disabled="disableBtns"
    >
        <IconsLucide icon="Plus" />
    </button>
    <button
        v-tooltip="'Edit saving'" 
        type="button"
        title="Edit Saving"
        class="btn btn-primary ms-2 mb-4"
        @click="editSaving"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="Pencil" />
    </button>
    <SavingsFilters
        id="filters"
        class="mb-4"
        @filterData="filterTableData"
        ref="SavingsFilters"
    />
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
    import SavingsFilters from "@/components/savings/SavingsFilters.vue";
    export default {
        components: {
            SavingsFilters,
            SavingsForm,
            SavingsTable,
        },
        data: () => ({
            selectedRows: [],
            showTable: true,
            isEdit: false,
            filters: {},
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
            toggleFilters() {
                this.$refs.SavingsFilters.toggle();
            },
            filterTableData(filters) {
                this.$refs.SavingsTable.filters = filters;
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