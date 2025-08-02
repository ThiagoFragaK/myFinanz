<template>
    <div>
        <div>
            <h1 class="ms-1 fs-5">
                New Income Type
            </h1>
        </div>
        <div class="row mb-4">
            <div class="col-4">
                <label>Name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Income Type Name"
                    v-model="incomeType.name"
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
                incomeType: {
                    "name": ""
                }
            };
        },
        methods: {
            save() {
                if(this.isEdit) {
                    return this.editIncomeTypes();
                }
                this.createIncomeType();
            },
            getIncomeTypeById() {
                if(!this.isEdit) return;

                this.$axios.get(`income/types/${this.id}`)
                    .then(({ data }) => {
                        this.incomeType = data.data;
                    });
            },
            createIncomeType() {
                this.$axios.post(`income/types`, this.incomeType)
                    .then((response) => {
                        console.log(response);
                        this.$notify({
                            title: 'Success',
                            text: 'Income type created successfully',
                            icon: 'success'
                        });
                        this.$emit("save");
                    });
            },
            editIncomeTypes() {
                this.$axios.put(`income/types/${this.id}`, this.incomeType)
                    .then((response) => {
                        console.log(response);
                        this.$notify({
                            title: 'Success',
                            text: 'Income type updated successfully',
                            icon: 'success'
                        });
                        this.$emit("save");
                    });
            },
        },
        created() {
            this.getIncomeTypeById();
        }
    };
</script>  