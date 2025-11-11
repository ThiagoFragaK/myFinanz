<template>
    <ModalComponent
        id="ExpensesModal"
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
                    <div class="col-6">
                        <label>Name</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Expense name"
                            v-model="expense.name"
                            @blur="validateField('name')"
                            @input="validateField('name')"
                        >
                        <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
                    </div>
                    <div class="col-6">
                        <label>Description</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Description"
                            v-model="expense.description"
                            @blur="validateField('description')"
                            @input="validateField('description')"
                        >
                        <small v-if="errors.description" class="text-danger">{{ errors.description }}</small>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-4">
                        <label>Value</label>
                        <div class="input-group">
                            <span class="input-group-text">R$</span>
                            <input 
                                type="number" 
                                class="form-control" 
                                placeholder="Expense value"
                                v-model="expense.value"
                                @blur="validateField('value')"
                                @input="validateField('value')"
                            >
                        </div>
                        <small v-if="errors.value" class="text-danger">{{ errors.value }}</small>
                    </div>
                    <div class="col-3">
                        <label>Parcel number</label>
                        <input 
                            type="number" 
                            class="form-control" 
                            placeholder="Parcel number"
                            v-model="expense.parcel_numbers"
                            @blur="validateField('parcel_numbers')"
                            @input="validateField('parcel_numbers')"
                        >
                        <small v-if="errors.parcel_numbers" class="text-danger">{{ errors.parcel_numbers }}</small>
                    </div>
                    <div class="col-5">
                        <label>Date</label>
                        <input 
                            type="date" 
                            class="form-control" 
                            placeholder="Expense date"
                            v-model="expense.date"
                        >
                    </div>                
                </div>
                <div class="row mt-4">
                    <div class="col-6">
                        <label>Payment method</label>
                        <select 
                            class="form-select form-select"
                            aria-label="Large select example"
                            v-model="expense.payment_methods_id"
                            @blur="validateField('payment_methods_id')"
                            @input="validateField('payment_methods_id')"
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
                        <small v-if="errors.payment_methods_id" class="text-danger">{{ errors.payment_methods_id }}</small>
                    </div>
                    <div class="col-6">
                        <label>Categories</label>
                        <select 
                            class="form-select form-select"
                            aria-label="Large select example"
                            v-model="expense.category_id"
                            @blur="validateField('category_id')"
                            @input="validateField('category_id')"
                        >
                            <option disabled selected value="">Select the category</option>
                            <option 
                                v-for="option in categoriesList"
                                :key="option.id"
                                :value="option.id"
                            >
                                {{ option.name }}
                            </option>
                        </select>
                        <small v-if="errors.category_id" class="text-danger">{{ errors.category_id }}</small>
                    </div>
                </div>
            </div>
        </template>
    </ModalComponent>
</template>

<script>
    import { Validation } from '@/helpers/Validation';
    import ModalComponent from '@/components/global/ModalComponent.vue';    
    export default {
        components: {
            ModalComponent
        },
        data: () => ({
            isLoading: false,
            paymentMethodsList: [],
            categoriesList: [],
            expense: {
                name: "",
                description: "",
                payment_methods_id: "",
                parcel_numbers: 1,
                value: 0,
                date: "",
                category_id: "",
            },
            errors: {},
        }),
        computed: {
        },
        methods: {
            getPaymentMethods() {
                this.$axios.get(`payment_methods/list`)
                    .then(({ data }) => {
                        this.paymentMethodsList = data.data;
                    });
            },
            getCategories() {
                this.$axios.get(`categories/list`)
                    .then(({ data }) => {
                        this.categoriesList = data.data;
                    });
            },
            open() {
                this.resetData();
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
                    category_id: "",
                }
            },
            async validateField(field) {
                console.log()
                const value = this.expense[field];
                const result = await Validation.validateField(field, value);

                this.errors[field] = result[field].message;
                return result[field].status;
            },
            async validateForm() {
                const result = await Validation.validateForm(this.expense);
                this.errors = Object.fromEntries(
                    Object.entries(result.fields).map(([key, value]) => [key, value.message])
                );
                return result.valid;
            },
            async save() {
                console.log("Attempt to save")
                const isValid = await this.validateForm();
                if (!isValid) {
                    return this.$notify({
                        title: "Validation error",
                        text: "One or more fields aren't valid, fix them and try again.",
                        icon: 'error'
                    });
                }

                this.isLoading = true;
                this.$axios.post(`expenses`, this.expense)
                    .then(() => {
                        this.$notify({
                            title: 'Success',
                            text: 'Expense created successfully',
                            icon: 'success'
                        });
                        this.$emit("reloadExpenses");
                        this.close();
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },
        created() {
            this.resetData();
            this.getPaymentMethods();
            this.getCategories();
        }
    }
</script>