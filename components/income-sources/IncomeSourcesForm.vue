<template>
    <div>
        <div>
            <h1 class="ms-1 fs-5">
                New Income Source
            </h1>
        </div>
        <div class="row mb-4">
            <div class="col-4">
                <label>Name</label>
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
                        this.incomeSource = data.data;
                    });
            },
            save() {
                if(this.isEdit) {
                    return this.editNewIncomeSource();
                }
                this.createNewIncomeSource();
            },
            createNewIncomeSource() {
                this.$axios.post(`income/sources`, this.incomeSource)
                    .then(({ data }) => {
                        this.incomeSource = data;
                        this.$notify({
                            title: 'Success',
                            text: 'Income source created successfully',
                            icon: 'success'
                        });
                        this.$emit("save");
                    });
            },
            editNewIncomeSource() {
                this.$axios.put(`income/sources/${this.id}`, this.incomeSource)
                    .then((response) => {
                        this.$notify({
                            title: 'Success',
                            text: 'Income source updated successfully',
                            icon: 'success'
                        });
                        this.$emit("save");
                    });
            },
            confirmIncome() {
                const form = {
                    income: this.selectedIncome,
                    type: this.selectedType,
                    value: this.incomeValue,
                };
            },
        },
        mounted() {
            this.getIncomeSourceById();
        }
    };
</script>  