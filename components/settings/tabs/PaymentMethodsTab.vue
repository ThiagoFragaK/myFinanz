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
        title="New Card"
        class="btn btn-primary ms-2 mb-4"
        @click="newCard"
        :disabled="disableBtns"
    >
        <IconsLucide icon="Plus" />
    </button>
    <button 
        type="button"
        title="Edit Card"
        class="btn btn-primary ms-2 mb-4"
        @click="editCard"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="Pencil" />
    </button>
    <button 
        type="button"
        title="Disable Income"
        class="btn btn-primary ms-2 mb-4"
        :disabled="hasntOnlyOneSelected"
        @click="disableIncome"
    >
        <IconsLucide icon="CircleSlash" />
    </button>
    <button 
        type="button"
        title="Enable Income"
        class="btn btn-primary ms-2 mb-4"
        :disabled="hasntOnlyOneSelected"
        @click="enableIncome"
    >
        <IconsLucide icon="CircleCheckBig" />
    </button>
    <PaymentMethodsTable 
        v-if="showTable"
        @allowActions="updateSelection"
        ref="PaymentMethodsTable"
    />
    <PaymentMethodsForm 
        v-else
        :id="selectedCard.id"
        :isEdit="isEdit"
        @save="save"
        ref="PaymentMethodsForm"
    />
</template>

<script>
    import PaymentMethodsForm from "@/components/payment-methods/PaymentMethodsForm.vue";
    import PaymentMethodsTable from "@/components/payment-methods/PaymentMethodsTable.vue";
    export default {
        components: {
            PaymentMethodsForm,
            PaymentMethodsTable,
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
            newCard() {
                this.showTable = this.isEdit = false;
            },
            editCard() {
                this.showTable = false;
                this.isEdit = true;
            },
            save() {
                this.returnToTable();
                this.$refs.PaymentMethodsTable.getPaymentMethods();
            },
            disableCard() {
                this.$axios.patch(`cards/${this.selectedCard.id}`)
                    .then(({ data }) => {
                        this.data = data;
                        this.$notify({
                            title: 'Success',
                            text: 'Card disabled successfully',
                            icon: 'success'
                        });
                    })
                    .finally(() => {
                        this.$refs.IncomeTable.getIncomeSources();
                    });
            },
            enableCard() {
                this.$axios.patch(`cards/${this.selectedCard.id}`)
                    .then(({ data }) => {
                        this.data = data;
                        this.$notify({
                            title: 'Success',
                            text: 'Card enabled successfully',
                            icon: 'success'
                        });
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
            selectedCard() {
                if(this.selectedRows.length === 0) {
                    return [];
                }
                return this.selectedRows[0];
            }
        },
    }
</script>