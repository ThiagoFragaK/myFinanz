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
            }
        },
        data() {
            return {
                isEdit: false,
                incomeSource: {
                    "name": ""
                }
            };
        },
        methods: {
            save() {
                if(this.isEdit) {
                    this.editNewIncomeSource();
                }
                this.createNewIncomeSource();
            },
            createNewIncomeSource() {
                this.$axios.post(`income/sources`, this.incomeSource)
                    .then((response) => {
                        console.log(response)
                    });
            },
            editNewIncomeSource() {
                this.$axios.put(`income/sources/${this.id}`, { param: this.incomeSource })
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
        mounted() {
        }
    };
</script>  