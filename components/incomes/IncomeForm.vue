<template>
    <div >                
        <div >
            <h1 class="ms-1 fs-5">
                New Income
            </h1>
        </div>
        <div class="row">
            <div class="col-6">
                <select 
                    class="form-select form-select mb-3" 
                    aria-label="Large select example"
                    v-model="income.source_id"
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
            </div>
            <div class="col-6">
                <select 
                    class="form-select form-select mb-3" 
                    aria-label="Large select example"
                    v-model="income.type_id"
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
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Income Name"
                    v-model="income.name"
                >
            </div>
            <div class="col-4">
                <div class="input-group mb-3">
                    <span class="input-group-text">R$</span>
                    <input 
                        type="number" 
                        class="form-control" 
                        placeholder="Income Value"
                        v-model="income.value"
                    >
                </div>
            </div>
            <div class="col-2">
                <div class="input-group mb-3">
                    <input 
                        type="number" 
                        class="form-control" 
                        min="1"
                        max="31"
                        placeholder="Entry day"
                        v-model="income.entry_day"
                    >
                </div>
            </div>
        </div>
        <button 
            type="button" 
            class="btn btn-secondary btn-sm"
            @click="save"
        >
            Save
        </button>
    </div>
</template>
  
<script>
    export default {
        props: {
            id: {
                type: Number,
                required: false,
            },
            isEdit: {
                type: Number,
                required: false,
            }
        },
        data() {
            return {
                income: {
                    name: "",
                    value: "",
                    entry_day: 5,
                    source_id: "",
                    type_id: "",
                },
                incomeSourcesList: [],
                incomeTypesList: [],
            };
        },
        methods: {
            getIncomeSources() {
                this.$axios.get(`income/sources`)
                    .then(({ data }) => {
                        this.incomeSourcesList = data;
                    });
            },
            getIncomeTypes() {
                this.$axios.get(`income/types`)
                    .then(({ data }) => {
                        this.incomeTypesList = data;
                    });
            },
            getIncomeById() {
                this.$axios.get(`incomes`)
                    .then((response) => {
                        console.log(response)
                    });
            },
            save() {
                if(this.isEdit) {
                    this.editIncome();
                }
                this.createIncome();
            },
            createIncome() {
                this.$axios.post(`incomes`, this.income)
                    .then((response) => {
                        console.log(response)
                    });
            },
            editIncome() {
                this.$axios.put(`incomes/${this.id}`, this.income)
                    .then((response) => {
                        console.log(response)
                    });
            },
            confirmIncome() {
                const form = {
                    income: this.selectedIncome,
                    type: this.selectedType,
                    value: this.incomeValue,
                };
                console.log(form)
            },
        },
        computed: {
        },
        created() {
            this.getIncomeSources();
            this.getIncomeTypes();
            
        }
    };
</script>  