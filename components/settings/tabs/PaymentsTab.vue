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
        title="New Payment"
        class="btn btn-info ms-2 mb-4"
        @click="newPayment"
        :disabled="disableBtns"
    >
        <IconsLucide icon="Plus" />
    </button>
    <button 
        type="button"
        title="Edit payment"
        class="btn btn-info ms-2 mb-4"
        @click="editPayment"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="Pencil" />
    </button>
    <button 
        type="button"
        title="Show payments open"
        class="btn btn-info ms-2 mb-4"
        @click="showOpenPayments"
        :disabled="disableBtns"
    >
        <IconsLucide icon="ListChecks" />
    </button>
    <button 
        type="button"
        title="Disable payment"
        class="btn btn-info ms-2 mb-4"
        @click="disablePayment"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="CircleSlash" />
    </button>
    <button 
        type="button"
        title="Enable payment"
        class="btn btn-info ms-2 mb-4"
        @click="enablePayment"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="CircleCheckBig" />
    </button>
    <button 
        type="button"
        title="Open debt"
        class="btn btn-info ms-2 mb-4"
        @click="openDebt"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="X" />
    </button>
    <button 
        type="button"
        title="Pay debt"
        class="btn btn-info ms-2 mb-4"
        @click="payDebt"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="Check" />
    </button>
    <PaymentsTable 
        v-if="showTable" 
        @allowActions="updateSelection"
        ref="PaymentsTable"
    />
    <PaymentsOpen
        v-else-if="showOpen"
        ref="PaymentOpen"
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
                this.showOpen = false;
                this.showTable = true;
            },
            updateSelection(selectedRows) {
                this.selectedRows = selectedRows;
            },
            newPayment() {
                this.showOpen = false;
                this.showTable = this.isEdit = false;
            },
            editPayment() {
                this.showTable = this.showOpen = false;
                this.isEdit = true;
            },
            savePayment() {
                this.returnToTable();
                this.$refs.PaymentTable.getPayments();
            },
            showOpenPayments() {
                this.showTable = false;
                this.showOpen = true;
            },
            openDebt() {
                this.$axios.patch(`payments/open/${this.id}`)
                    .then(({data}) => {
                        console.log(data)
                        this.$notify({
                            title: 'Success',
                            text: 'Debt opened successfully',
                            icon: 'success'
                        });
                    });
            },
            payDebt() {
                this.$axios.patch(`payments/pay/${this.id}`)
                    .then(({data}) => {
                        console.log(data)
                        this.$notify({
                            title: 'Success',
                            text: 'Debt payid successfully',
                            icon: 'success'
                        });
                    });
            },
            disablePayment() {
                this.$axios.patch(`payments/disable/${this.id}`)
                    .then(({data}) => {
                        console.log(data)
                        this.$notify({
                            title: 'Success',
                            text: 'Payment disabled successfully',
                            icon: 'success'
                        });
                    });
            },
            enablePayment() {
                this.$axios.patch(`payments/enable/${this.id}`)
                    .then(({data}) => {
                        console.log(data)
                        this.$notify({
                            title: 'Success',
                            text: 'Payment enabled successfully',
                            icon: 'success'
                        });
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
            selectedPayment() {
                if(this.selectedRows.length === 0) {
                    return [];
                }
                return this.selectedRows[0];
            }
        }
    }
</script>