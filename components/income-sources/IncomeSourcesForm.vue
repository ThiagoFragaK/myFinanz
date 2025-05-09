<template>
    <button 
        type="button" 
        class="btn btn-info mb-4"
        data-bs-toggle="modal" 
        data-bs-target="#IncomeSources"
    >
        <IconsLucide icon="Plus" />
    </button>

    <div 
        class="modal fade" 
        id="IncomeSources" 
        tabindex="-1" 
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content bg-light">                
                <div class="modal-header">
                    <IconsLucide icon="Building2" />
                    <h1 class="modal-title ms-1 fs-5" id="exampleModalLabel">New Income Source</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container text-center">
                        <div class="row">
                            <div class="input-group mb-3">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Income Source Name"
                                    v-model="incomeSource.name"
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button 
                        type="button" 
                        class="btn btn-secondary btn-sm"
                        @click="save"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
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