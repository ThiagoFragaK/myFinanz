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
        @click="newPayment"
        :disabled="disableBtns"
    >
        <IconsLucide icon="Plus" />
    </button>
    <button 
        type="button"
        title="Edit Income"
        class="btn btn-info ms-2 mb-4"
        @click="editPayment"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="Pencil" />
    </button>
    <button 
        type="button"
        title="Disable payment"
        class="btn btn-info ms-2 mb-4"
        @click="editPayment"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="CircleSlash" />
    </button>
    <button 
        type="button"
        title="Enable payment"
        class="btn btn-info ms-2 mb-4"
        @click="editPayment"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="CircleCheckBig" />
    </button>
    <button 
        type="button"
        title="Open debt"
        class="btn btn-info ms-2 mb-4"
        @click="editPayment"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="X" />
    </button>
    <button 
        type="button"
        title="Pay debt"
        class="btn btn-info ms-2 mb-4"
        @click="editPayment"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="Check" />
    </button>
    <PaymentsTable 
        v-if="showTable" 
        @allowActions="updateSelection"
        ref="PaymentsTable"
    />
    <PaymentsForm 
        v-else 
        :id="selectedPayment.id"
        :isEdit="isEdit"
        @save="save"
        ref="PaymentsForm"
    />
</template>

<script>
    import PaymentsForm from "@/components/payments/PaymentsForm.vue";
    import PaymentsTable from "@/components/payments/PaymentsTable.vue";
    export default {
        components: {
            PaymentsForm,
            PaymentsTable,
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
            newPayment() {
                this.showTable = this.isEdit = false;
            },
            editPayment() {
                this.showTable = false;
                this.isEdit = true;
            },
            savePayment() {
                this.returnToTable();
                this.$refs.PaymentTable.getPayments();
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
            selectedPayment() {
                if(this.selectedRows.length === 0) {
                    return [];
                }
                return this.selectedRows[0];
            }
        }
    }
</script>