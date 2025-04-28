<template>
    <button 
        type="button" 
        class="btn btn-primary menu-btn"
        data-bs-toggle="modal" 
        data-bs-target="#SalaryModal"
    >
        <IconsLucide icon="BanknoteArrowDown" />
        Income
    </button>

    <div 
        class="modal fade" 
        id="SalaryModal" 
        tabindex="-1" 
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content bg-light">                
                <div class="modal-header">
                    <IconsLucide icon="BanknoteArrowDown" />
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Confirm income modal</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container text-center">
                        <div class="row">
                            <div class="col-6">
                                <select 
                                    class="form-select form-select mb-3" 
                                    aria-label="Large select example"
                                    v-model="selectedIncome"
                                >
                                    <option disabled selected value="">Select your income</option>
                                    <option 
                                        v-for="option in incomeList" 
                                        :key="option.value" 
                                        :value="option.value"
                                    >
                                        {{ option.label }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-6">
                                <select 
                                    class="form-select form-select mb-3" 
                                    aria-label="Large select example"
                                    v-model="selectedType"
                                >
                                    <option disabled selected value="">Select the type</option>
                                    <option 
                                        v-for="option in incomeTypeList" 
                                        :key="option.id" 
                                        :value="option.id"
                                    >
                                        {{ option.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div :class="['collapse', { show: mustShowValue }]" id="IncomeTypeValue">
                                <div class="input-group mb-3">
                                    <span class="input-group-text">R$</span>
                                    <input 
                                        type="number" 
                                        class="form-control" 
                                        placeholder="Income Value"
                                    >
                                    <span class="input-group-text">.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button 
                        type="button" 
                        class="btn btn-secondary btn-sm"
                        @click="confirmIncome"
                    >
                        Confirm income
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
    export default {
        data() {
            return {
                selectedIncome: "",
                selectedType: "",
                incomeValue: 0,
                incomeList: [],
                incomeTypeList: [],
            };
        },
        methods: {
            getIncomeByUser() {
                this.$axios.get(`income/sources`)
                    .then((response) => {
                        this.incomeList = response.data;
                    });
            },
            getIncomeTypes() {
                this.$axios.get(`income/types`)
                    .then((response) => {
                        this.incomeTypeList = response.data;
                    });
                
                this.$notify({
                    title: 'Income Types',
                    text: 'Income Types loaded.',
                    icon: 'success'
                });
            },
            confirmIncome() {
                //confirm
                const form = {
                    income: this.selectedIncome,
                    type: this.selectedType,
                    value: this.incomeValue,
                };
                console.log(form)
            },
        },
        computed: {
            mustShowValue() {
                return this.selectedType > 1;
            }
        },
        mounted() {
            this.getIncomeByUser();
            this.getIncomeTypes();
        }
    };
</script>  