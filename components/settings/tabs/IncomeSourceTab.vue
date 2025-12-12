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
        title="New Income Type"
        class="btn btn-primary ms-2 mb-4"
        @click="newIncomeSource"
        :disabled="disableBtns"
    >
        <IconsLucide icon="Plus" />
    </button>
    <button 
        type="button"
        title="Edit Income Type"
        class="btn btn-primary ms-2 mb-4"
        @click="editIncomeSource"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="Pencil" />
    </button>
    <button 
        type="button"
        title="Disable Income"
        class="btn btn-primary ms-2 mb-4"
        :disabled="hasntOnlyOneSelected"
        @click="disableIncomeSource"
    >
        <IconsLucide icon="CircleSlash" />
    </button>
    <button 
        type="button"
        title="Enable Income"
        class="btn btn-primary ms-2 mb-4"
        :disabled="hasntOnlyOneSelected"
        @click="enableIncomeSource"
    >
        <IconsLucide icon="CircleCheckBig" />
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
    import { useIncomeSourcesService } from '@/services/IncomeSourcesService';

    export default {
        components: {
            IncomeSourcesForm,
            IncomeSourcesTable,
        },
        data: () => ({
            selectedRows: [],
            showTable: true,
            isEdit: false,
            incomeSourcesService: null
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
            async disableIncomeSource() {
                try {
                    await this.incomeSourcesService.disableIncomeSource(this.selectedIncomeSource.id);
                    this.$notify({
                        title: 'Success',
                        text: 'Income source disabled successfully',
                        icon: 'success'
                    });
                    this.$refs.IncomeTable.getIncomeSources();
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: 'Failed to disable income source',
                        icon: 'error'
                    });
                }
            },
            async enableIncomeSource() {
                try {
                    await this.incomeSourcesService.enableIncomeSource(this.selectedIncomeSource.id);
                    this.$notify({
                        title: 'Success',
                        text: 'Income source enabled successfully',
                        icon: 'success'
                    });
                    this.$refs.IncomeTable.getIncomeSources();
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: 'Failed to enable income source',
                        icon: 'error'
                    });
                }
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
        created() {
            this.incomeSourcesService = useIncomeSourcesService(this.$axios);
        }
    }
</script>