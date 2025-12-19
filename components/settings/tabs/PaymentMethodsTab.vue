<template>
    <button 
        v-tooltip="$t('common.return')"
        type="button"
        class="btn btn-primary mb-4"
        @click="returnToTable"
        :disabled="showTable"
    >
        <IconsLucide icon="ChevronLeft" />
    </button>
    <button 
        v-tooltip="$t('payment_methods.new')"
        type="button"
        class="btn btn-primary ms-2 mb-4"
        @click="newCard"
        :disabled="disableBtns"
    >
        <IconsLucide icon="Plus" />
    </button>
    <button 
        v-tooltip="$t('payment_methods.edit')"
        type="button"
        class="btn btn-primary ms-2 mb-4"
        @click="editCard"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="Pencil" />
    </button>
    <button 
        v-tooltip="$t('payment_methods.disable')"
        type="button"
        class="btn btn-primary ms-2 mb-4"
        :disabled="hasntOnlyOneSelected"
        @click="disableCard"
    >
        <IconsLucide icon="CircleSlash" />
    </button>
    <button 
        v-tooltip="$t('payment_methods.enable')"
        type="button"
        class="btn btn-primary ms-2 mb-4"
        :disabled="hasntOnlyOneSelected"
        @click="enableCard"
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
    import { usePaymentMethodsService } from '@/services/PaymentMethodsService';

    export default {
        components: {
            PaymentMethodsForm,
            PaymentMethodsTable,
        },
        data: () => ({
            selectedRows: [],
            showTable: true,
            isEdit: false,
            paymentMethodsService: null
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
            async disableCard() {
                try {
                    await this.paymentMethodsService.disablePaymentMethod(this.selectedCard.id);
                    this.$notify({
                        title: this.$t('common.success'),
                        text: this.$t('payment_methods.notifications.updated'),
                        icon: 'success'
                    });
                    this.$refs.PaymentMethodsTable.getPaymentMethods();
                } catch (error) {
                    this.$notify({
                        title: this.$t('common.error'),
                        text: this.$t('payment_methods.notifications.update_error'),
                        icon: 'error'
                    });
                }
            },
            async enableCard() {
                try {
                    await this.paymentMethodsService.enablePaymentMethod(this.selectedCard.id);
                    this.$notify({
                        title: this.$t('common.success'),
                        text: this.$t('payment_methods.notifications.updated'),
                        icon: 'success'
                    });
                    this.$refs.PaymentMethodsTable.getPaymentMethods();
                } catch (error) {
                    this.$notify({
                        title: this.$t('common.error'),
                        text: this.$t('payment_methods.notifications.update_error'),
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
            selectedCard() {
                if(this.selectedRows.length === 0) {
                    return [];
                }
                return this.selectedRows[0];
            }
        },
        created() {
            this.paymentMethodsService = usePaymentMethodsService(this.$axios);
        }
    }
</script>