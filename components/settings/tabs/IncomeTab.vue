<template>
    <button 
        v-tooltip="'Return'"
        type="button"
        class="btn btn-primary mb-4"
        @click="returnToTable"
        :disabled="showTable"
    >
        <IconsLucide icon="ChevronLeft" />
    </button>
    <button 
        v-tooltip="'New income'"
        type="button"
        class="btn btn-primary ms-2 mb-4"
        @click="newIncome"
        :disabled="disableBtns"
    >
        <IconsLucide icon="Plus" />
    </button>
    <button
        v-tooltip="'Edit income'"
        type="button"
        class="btn btn-primary ms-2 mb-4"
        @click="editIncome"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="Pencil" />
    </button>
    <button 
        v-tooltip="'Disable income'"
        type="button"
        class="btn btn-primary ms-2 mb-4"
        :disabled="hasntOnlyOneSelected"
        @click="disableIncome"
    >
        <IconsLucide icon="CircleSlash" />
    </button>
    <button 
        v-tooltip="'Enable income'"
        type="button"
        class="btn btn-primary ms-2 mb-4"
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
    import { useIncomesService } from '@/services/IncomesService';

    export default {
        components: {
            IncomeForm,
            IncomeTable,
        },
        data: () => ({
            selectedRows: [],
            showTable: true,
            isEdit: false,
            incomesService: null
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
            async disableIncome() {
                try {
                    await this.incomesService.disableIncome(this.selectedIncome.id);
                    this.$notify({
                        title: 'Success',
                        text: 'Income disabled successfully',
                        icon: 'success'
                    });
                    this.$refs.IncomeTable.getIncomeSources();
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: 'Failed to disable income',
                        icon: 'error'
                    });
                }
            },
            async enableIncome() {
                try {
                    await this.incomesService.enableIncome(this.selectedIncome.id);
                    this.$notify({
                        title: 'Success',
                        text: 'Income enabled successfully',
                        icon: 'success'
                    });
                    this.$refs.IncomeTable.getIncomeSources();
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: 'Failed to enable income',
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
            selectedIncome() {
                if(this.selectedRows.length === 0) {
                    return [];
                }
                return this.selectedRows[0];
            }
        },
        created() {
            this.incomesService = useIncomesService(this.$axios);
        }
    }
</script>