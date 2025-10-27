<template>
    <div>
        <div>
            <h1 class="ms-1 fs-5">
                {{ title }}
            </h1>
        </div>
        <div v-if="isLoading" class="row mb-4">
            <LoadingComponent />
        </div>
        <div v-else>
            <div class="row mb-4">
                <div class="col-4">
                    <label>Name</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Expense name"
                        v-model="expense.name"
                        @blur="validateField('name')"
                        ref="nameRef"
                    >
                    <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
                </div>
                <div class="col-4">
                    <label>Description</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Description"
                        v-model="expense.description"
                        @blur="validateField('description')"
                        ref="descriptionRef"
                    >
                    <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
                </div>
                <div class="col-2">
                    <label>Parcel number</label>
                    <input 
                        type="number" 
                        class="form-control" 
                        placeholder="Parcel number"
                        v-model="expense.parcel_numbers"
                        @blur="validateField('parcel')"
                        ref="valueRef"
                    >
                    <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
                </div>
                <div class="col-2">
                    <label>Value</label>
                    <input 
                        type="number" 
                        class="form-control" 
                        placeholder="Expense value"
                        v-model="expense.value"
                        @blur="validateField('value')"
                        ref="valueRef"
                    >
                    <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-4">
                    <label>Payment method</label>
                    <select 
                        class="form-select form-select" 
                        aria-label="Large select example"
                        v-model="expense.payment_methods_id"
                        @blur="validateField('paymentMethod')"
                        ref="valueRef"
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
                    <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
                </div>
                <div class="col-4">
                    <label>Categories</label>
                    <select 
                        class="form-select form-select" 
                        aria-label="Large select example"
                        v-model="expense.category_id"
                        @blur="validateField('category')"
                        ref="valueRef"
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
                    <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
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
        <button 
            type="button" 
            class="btn btn-primary btn-sm"
            :disabled="isLoading"
            @click="save"
        >
            Save
        </button>
    </div>
</template>
  
<script>
    import { Validation } from '@/helpers/Validation';
    import Dates from "@/helpers/Dates";
    import LoadingComponent from '@/components/global/LoadingComponent.vue';

    export default {
        components: {
            LoadingComponent,
        },
        props: {
            id: {
                type: Number,
                required: false,
            },
            isEdit: {
                type: Boolean,
                required: false,
            }
        },
        data() {
            return {
                isLoading: false,
                paymentMethodsList: [],
                categoriesList: [],
                expense: {
                    name: "",
                    description: "",
                    payment_methods_id: "",
                    parcel_numbers: "",
                    value: 0,
                    date: "",
                    category_id: "",
                },
                errors: {},
            };
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
            getExpenseById() {
                if(!this.isEdit) return;

                this.isLoading = true;
                this.$axios.get(`expenses/${this.id}`)
                    .then(({ data }) => {
                        this.expense = data.data;
                        this.expense.date = Dates.getFormatedDate(this.expense.date, "yyyy-MM-dd");
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            async validateField(field) {
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
                const isValid = await this.validateForm();
                if (!isValid) {
                    return this.$notify({
                        title: "Validation error",
                        text: "One or more fields aren't valid, fix them and try again.",
                        icon: 'error'
                    });
                }

                if(this.isEdit) {
                    return this.editExpense();
                }
                this.createExpense();
            },
            createExpense() {
                this.$axios.post(`expenses`, this.expense)
                    .then(() => {
                        this.$notify({
                            title: 'Success',
                            text: 'Expense created successfully',
                            icon: 'success'
                        });
                        this.$emit("save");
                    });
            },
            editExpense() {
                this.$axios.put(`expenses/${this.id}`, this.expense)
                    .then((response) => {
                        this.$notify({
                            title: 'Success',
                            text: 'Expense updated successfully',
                            icon: 'success'
                        });
                        this.$emit("save");
                    });
            },
        },
        computed: {
            title() {
                return this.isEdit ? "Edit Expense" : "New Expense";
            },
        },
        created() {
            this.getCategories();
            this.getPaymentMethods();
            this.getExpenseById();
        }
    };
</script>  