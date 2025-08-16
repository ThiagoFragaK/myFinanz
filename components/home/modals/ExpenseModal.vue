<template>
    <ModalComponent
        :isLoading="isLoading"
        @save="save"
        ref="ExpensesModal"
    >
        <template #header>
            <div class="modal-header bg-primary text-white">
                <IconsLucide icon="BanknoteArrowDown" />
                <h5 class="modal-title ms-2"> New expense </h5>
                <button 
                    class="btn text-white ms-auto" 
                    data-bs-dismiss="modal" 
                    @click="close" 
                >
                    <IconsLucide icon="X" />
                </button>
            </div>
        </template>

        <template #body>
            <div class="modal-body">
                <div class="row">
                    <div class="col-5">
                        <label>Name</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Expense name"
                            v-model="expense.name"
                        >
                    </div>
                    <div class="col-5">
                        <label>Description</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Description"
                            v-model="expense.description"
                        >
                    </div>
                    <div class="col-2">
                        <label>Value</label>
                        <input 
                            type="number" 
                            class="form-control" 
                            placeholder="Expense value"
                            v-model="expense.value"
                        >
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-3">
                        <label>Parcel number</label>
                        <input 
                            type="number" 
                            class="form-control" 
                            placeholder="Parcel number"
                            v-model="expense.parcel_numbers"
                        >
                    </div>
                    <div class="col-5">
                        <label>Payment method</label>
                        <select 
                            class="form-select form-select mb-3" 
                            aria-label="Large select example"
                            v-model="expense.payment_methods_id"
                        >
                            <option disabled selected value="">Select the method</option>
                            <option 
                                v-for="option in paymentMethodsList"
                                :key="option.id" 
                                :value="option.id"
                            >
                                {{ option.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-4">
                        <label>Date</label>
                        <input 
                            type="date" 
                            class="form-control" 
                            placeholder="Expense date"
                            v-model="expense.date"
                        >
                    </div>
                </div>
            </div>
        </template>

    </ModalComponent>
</template>

<script>
    import ModalComponent from '@/components/global/ModalComponent.vue';    
    export default {
        components: {
            ModalComponent
        },
        data: () => ({
            paymentMethodsList: [],
            isLoading: false,
            expense: {
                name: "",
                description: "",
                payment_methods_id: "",
                parcel_numbers: 1,
                value: 0,
                date: "",
            },
        }),
        computed: {
        },
        methods: {
            getPaymentMethods() {
                this.$axios.get(`payment_methods`)
                    .then(({ data }) => {
                        this.paymentMethodsList = data.data;
                    });
            },
            open() {
                this.$refs.ExpensesModal.open();
            },
            close() {
                this.$refs.ExpensesModal.close();
            },
            resetData() {
                this.expense = {
                    name: "",
                    description: "",
                    payment_methods_id: "",
                    parcel_numbers: 1,
                    value: 0,
                    date: "",
                }
            },
            save() {
                this.$axios.post(`expenses`, this.expense)
                    .then(() => {
                        this.$notify({
                            title: 'Success',
                            text: 'Expense created successfully',
                            icon: 'success'
                        });
                        this.close();
                    });
            },
        },
        created() {
            this.getPaymentMethods();
        }
    }
</script>