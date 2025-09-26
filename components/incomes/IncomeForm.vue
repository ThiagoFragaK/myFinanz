<template>
    <div>
        <div>
            <h1 class="ms-1 fs-5">
                New Income
            </h1>
        </div>
        <div class="row">
            <div class="col-6">
                <label>Income source</label>
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
                <label>Income type</label>
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
                <label>Name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Income Name"
                    v-model="income.name"
                >
            </div>
            <div class="col-4">
                <label>Value</label>
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
                <label>Entry day</label>
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
            class="btn btn-primary btn-sm"
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
                type: Boolean,
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
                    });
            },
            save() {
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