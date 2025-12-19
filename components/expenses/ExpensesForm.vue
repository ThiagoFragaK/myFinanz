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
                    <label>{{ $t('common.name') }}</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        :placeholder="$t('expenses.form.name_placeholder')"
                        v-model="expense.name"
                        @blur="validateField('name')"
                        @input="validateField('name')"
                        ref="nameRef"
                    >
                    <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
                </div>
                <div class="col-4">
                    <label>{{ $t('expenses.table.description') }}</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        :placeholder="$t('expenses.form.description_placeholder')"
                        v-model="expense.description"
                        @blur="validateField('description')"
                        @input="validateField('description')"
                        ref="descriptionRef"
                    >
                    <small v-if="errors.description" class="text-danger">{{ errors.description }}</small>
                </div>
                <div class="col-2">
                    <label>{{ $t('expenses.form.parcel_number') }}</label>
                    <input 
                        type="number" 
                        class="form-control" 
                        :placeholder="$t('expenses.form.parcel_number_placeholder')"
                        v-model="expense.parcel_numbers"
                        @blur="validateField('parcel_numbers')"
                        @input="validateField('parcel_numbers')"
                        ref="valueRef"
                    >
                    <small v-if="errors.parcel_numbers" class="text-danger">{{ errors.parcel_numbers }}</small>
                </div>
                <div class="col-2">
                    <label>{{ $t('expenses.table.value') }}</label>
                    <input 
                        type="number" 
                        class="form-control" 
                        :placeholder="$t('expenses.form.value_placeholder')"
                        v-model="expense.value"
                        @blur="validateField('value')"
                        @input="validateField('value')"
                        ref="valueRef"
                    >
                    <small v-if="errors.value" class="text-danger">{{ errors.value }}</small>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-4">
                    <label>{{ $t('expenses.table.method') }}</label>
                    <select 
                        class="form-select form-select" 
                        aria-label="Large select example"
                        v-model="expense.payment_methods_id"
                        @blur="validateField('payment_methods_id')"
                        ref="valueRef"
                    >
                        <option disabled selected value="">{{ $t('expenses.form.select_method') }}</option>
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
                <div class="col-4">
                    <label>{{ $t('expenses.table.category') }}</label>
                    <select 
                        class="form-select form-select" 
                        aria-label="Large select example"
                        v-model="expense.category_id"
                        @blur="validateField('category_id')"
                        ref="valueRef"
                    >
                        <option disabled selected value="">{{ $t('expenses.form.select_category') }}</option>
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
                <div class="col-4">
                    <label>{{ $t('expenses.table.date') }}</label>
                    <input 
                        type="date" 
                        class="form-control" 
                        :placeholder="$t('expenses.form.date_placeholder')"
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
            {{ $t('common.save') }}
        </button>
    </div>
</template>
  
<script>
    import { Validation } from '@/helpers/Validation';
    import Dates from "@/helpers/Dates";
    import LoadingComponent from '@/components/global/LoadingComponent.vue';
    import { useExpensesService } from '@/services/ExpensesService';
    import { usePaymentMethodsService } from '@/services/PaymentMethodsService';
    import { useCategoriesService } from '@/services/CategoriesService';

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
                expensesService: null,
                paymentMethodsService: null,
                categoriesService: null
            };
        },
        methods: {
            async getPaymentMethods() {
                try {
                    const response = await this.paymentMethodsService.getPaymentMethodsList();
                    this.paymentMethodsList = response.data;
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: this.$t('payment_methods.notifications.load_error'),
                        icon: 'error'
                    });
                }
            },
            async getCategories() {
                try {
                    const response = await this.categoriesService.getCategoriesList();
                    this.categoriesList = response.data;
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: this.$t('categories.notifications.load_error'),
                        icon: 'error'
                    });
                }
            },
            async getExpenseById() {
                if(!this.isEdit) return;

                this.isLoading = true;
                try {
                    const response = await this.expensesService.getExpenseById(this.id);
                    this.expense = response.data;
                    this.expense.date = Dates.getFormatedDate(this.expense.date, "yyyy-MM-dd");
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: this.$t('expenses.notifications.load_error'),
                        icon: 'error'
                    });
                } finally {
                    this.isLoading = false;
                }
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
                        text: this.$t('login.notifications.validation_text'),
                        icon: 'error'
                    });
                }

                if(this.isEdit) {
                    return this.editExpense();
                }
                this.createExpense();
            },
            async createExpense() {
                try {
                    await this.expensesService.createExpense(this.expense);
                    this.$notify({
                        title: 'Success',
                        text: this.$t('expenses.notifications.created'),
                        icon: 'success'
                    });
                    this.$emit("save");
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: this.$t('expenses.notifications.create_error'),
                        icon: 'error'
                    });
                }
            },
            async editExpense() {
                try {
                    await this.expensesService.updateExpense(this.id, this.expense);
                    this.$notify({
                        title: 'Success',
                        text: this.$t('expenses.notifications.updated'),
                        icon: 'success'
                    });
                    this.$emit("save");
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: this.$t('expenses.notifications.update_error'),
                        icon: 'error'
                    });
                }
            },
        },
        computed: {
            title() {
                return this.isEdit ? this.$t('expenses.edit') : this.$t('expenses.new');
            },
        },
        created() {
            this.expensesService = useExpensesService(this.$axios);
            this.paymentMethodsService = usePaymentMethodsService(this.$axios);
            this.categoriesService = useCategoriesService(this.$axios);
            this.getCategories();
            this.getPaymentMethods();
            this.getExpenseById();
        }
    };
</script>  