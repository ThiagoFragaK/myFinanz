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
                    <div class="col-5">
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
                    <div class="col-3">
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
            isLoading: false,
            incomeSourcesList: [],
            incomeTypesList: [],
            income: {
                name: "",
                value: "",
                entry_day: 5,
                source_id: "",
                type_id: "",
            },
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
                this.$refs.IncomeModal.open();
            },
            close() {
                this.$refs.IncomeModal.close();
            },
            resetData() {
                this.expense = {
                    name: "",
                    value: "",
                    entry_day: 5,
                    source_id: "",
                    type_id: "",
                }
            },
            save() {
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