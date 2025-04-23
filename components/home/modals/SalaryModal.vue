<template>
    <button 
        type="button" 
        class="btn btn-primary menu-btn"
        data-bs-toggle="modal" 
        data-bs-target="#SalaryModal"
    >
        <IconsLucide icon="BanknoteArrowDown" />
        Salary
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
                incomeList: [
                    { value: 1, label: "One" },
                    { value: 2, label: "Two" },
                    { value: 3, label: "Three" },
                ],
            };
        },
        methods: {
            confirmIncome() {
                console.log("Confirm")
            },
        },
    };
</script>  