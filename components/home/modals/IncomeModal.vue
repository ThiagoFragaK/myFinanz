<template>
    <ModalComponent
        id="IncomeModal"
        :isLoading="isLoading"
        @save="save"
        ref="IncomeModal"
    >
        <template #header>
            <div class="modal-header bg-primary text-white">
                <IconsLucide icon="BanknoteArrowDown" />
                <h5 class="modal-title ms-2"> New Income </h5>
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
                        <label>Income source</label>
                        <select 
                            class="form-select form-select" 
                            aria-label="Large select example"
                            v-model="income.source_id"
                            @blur="validateField('source_id')"
                            @input="validateField('source_id')"
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
                            @input="validateField('type_id')"
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
                        >
                        <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
                    </div>
                    <div class="col-5">
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
                            >
                        </div>
                        <small v-if="errors.value" class="text-danger">{{ errors.value }}</small>
                    </div>
                    <div class="col-3">
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
                            >
                        </div>
                        <small v-if="errors.entry_day" class="text-danger">{{ errors.entry_day }}</small>
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
            incomeSourcesList: [],
            incomeTypesList: [],
            income: {
                name: "",
                value: "",
                entry_day: 1,
                source_id: "",
                type_id: "",
            },
            errors: {},
        }),
        computed: {
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
            open() {
                this.resetData();
                this.$refs.IncomeModal.open();
            },
            close() {
                this.$refs.IncomeModal.close();
            },
            resetData() {
                this.expense = {
                    name: "",
                    value: "",
                    entry_day: 1,
                    source_id: "",
                    type_id: "",
                }
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

                this.$axios.post(`incomes`, this.income)
                    .then(() => {
                        this.$notify({
                            title: 'Income',
                            text: 'Income created successfully!',
                            icon: 'success'
                        });
                        this.$emit("reloadIncomes");
                        this.resetData();
                        this.close();
                    });
            },
        },
        created() {
            this.resetData();
            this.getIncomeSources();
            this.getIncomeTypes();
        }
    }
</script>