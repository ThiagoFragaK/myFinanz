<template>
    <div>
        <div>
            <h1 class="ms-1 fs-5">
                New Income Source
            </h1>
        </div>
        <div class="row mb-4">
            <div class="col-4">
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Income Source Name"
                    v-model="incomeSource.name"
                >
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
                type: Boolean,
                required: false,
            }
        },
        data() {
            return {
                incomeSource: {
                    "name": ""
                }
            };
        },
        methods: {
            getIncomeSourceById() {
                if(!this.isEdit) return;

                this.$axios.get(`income/sources/${this.id}`)
                    .then(({ data }) => {
                        this.incomeSource = data;
                    });
            },
            save() {
                if(this.isEdit) {
                    this.editNewIncomeSource();
                }
                this.createNewIncomeSource();
            },
            createNewIncomeSource() {
                this.$axios.post(`income/sources`, this.incomeSource)
                    .then(({ data }) => {
                        this.incomeSource = data;
                    });
            },
            editNewIncomeSource() {
                this.$axios.put(`income/sources/${this.id}`, this.incomeSource)
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
        mounted() {
            this.getIncomeSourceById();
        }
    };
</script>  