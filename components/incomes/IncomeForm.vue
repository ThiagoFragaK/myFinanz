<template>
    <div>
        <div>
            <h1 class="ms-1 fs-5">
                New Income
            </h1>
        </div>
        <div v-if="isLoading" class="row mb-4">
            <LoadingComponent />
        </div>
        <div v-else>
            <div class="row">
                <div class="col-6">
                    <label>Income source</label>
                    <select 
                        class="form-select form-select" 
                        aria-label="Large select example"
                        v-model="income.source_id"
                        @blur="validateField('source_id')"
                        ref="sourceRef"
                    >
                        <option disabled selected value="">Select your income</option>
                        <option 
                            v-for="option in incomeSourcesList" 
                            :key="option.id" 
                            :value="option.id"
                        >
                            {{ option.name }}
                        </option>
                    </select>
                    <small v-if="errors.source_id" class="text-danger">{{ errors.source_id }}</small>
                </div>
                <div class="col-6">
                    <label>Income type</label>
                    <select 
                        class="form-select form-select" 
                        aria-label="Large select example"
                        v-model="income.type_id"
                        @blur="validateField('type_id')"
                        ref="typeRef"
                    >
                        <option disabled selected value="">Select the type</option>
                        <option 
                            v-for="option in incomeTypesList" 
                            :key="option.id" 
                            :value="option.id"
                        >
                            {{ option.name }}
                        </option>
                    </select>
                    <small v-if="errors.type_id" class="text-danger">{{ errors.type_id }}</small>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <label>Name</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Income Name"
                        v-model="income.name"
                        @blur="validateField('name')"
                        @input="validateField('name')"
                        ref="nameRef"
                    >
                    <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
                </div>
                <div class="col-4">
                    <label>Value</label>
                    <div class="input-group">
                        <span class="input-group-text">R$</span>
                        <input 
                            type="number" 
                            class="form-control" 
                            placeholder="Income Value"
                            v-model="income.value"
                            @blur="validateField('value')"
                            @input="validateField('value')"
                            ref="valueRef"
                        >
                    </div>
                    <small v-if="errors.value" class="text-danger">{{ errors.value }}</small>
                </div>
                <div class="col-2">
                    <label>Entry day</label>
                    <div class="input-group">
                        <input 
                            type="number" 
                            class="form-control" 
                            min="1"
                            max="31"
                            placeholder="Entry day"
                            v-model="income.entry_day"
                            @blur="validateField('entry_day')"
                            @input="validateField('entry_day')"
                            ref="entryDayRef"
                        >
                    </div>
                    <small v-if="errors.entry_day" class="text-danger">{{ errors.entry_day }}</small>
                </div>
            </div>
        </div>
        <button 
            type="button" 
            class="btn btn-primary btn-sm mt-4"
            :disabled="isLoading"
            @click="save"
        >
            Save
        </button>
    </div>
</template>
  
<script>
    import { Validation } from '@/helpers/Validation';
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
                income: {
                    name: "",
                    value: "",
                    entry_day: 5,
                    source_id: "",
                    type_id: "",
                },
                incomeSourcesList: [],
                incomeTypesList: [],
                errors: {},
            };
        },
        methods: {
            getIncomeSources() {
                this.$axios.get(`income/sources/list`)
                    .then(({ data }) => {
                        this.incomeSourcesList = data.data;
                    });
            },
            getIncomeTypes() {
                this.$axios.get(`income/types/list`)
                    .then(({ data }) => {
                        this.incomeTypesList = data.data;
                    });
            },
            getIncomeById() {
                if(!this.isEdit) return;
                
                this.isLoading = true;
                this.$axios.get(`incomes/${this.id}`)
                    .then(({ data }) => {
                        let income = data.data;
                        this.income = {
                            name: income.name,
                            value: income.value,
                            entry_day: income.entry_day,
                            source_id: income.source_id,
                            type_id: income.type_id,
                        }
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            async validateField(field) {
                const value = this.income[field];
                const result = await Validation.validateField(field, value);

                this.errors[field] = result[field].message;
                return result[field].status;
            },
            async validateForm() {
                const result = await Validation.validateForm(this.income);
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
                    return this.editIncome();
                }
                this.createIncome();
            },
            createIncome() {
                this.$axios.post(`incomes`, this.income)
                    .then((response) => {
                        this.$notify({
                            title: 'Income',
                            text: 'Income created successfully!',
                            icon: 'success'
                        });
                        this.$emit("save");
                    });
            },
            editIncome() {
                this.$axios.put(`incomes/${this.id}`, this.income)
                    .then((response) => {
                        this.$notify({
                            title: 'Income',
                            text: 'Income edited successfully!',
                            icon: 'success'
                        });
                        this.$emit("save");
                    });
            },
        },
        created() {
            this.getIncomeSources();
            this.getIncomeTypes();
            this.getIncomeById();
        }
    };
</script>  