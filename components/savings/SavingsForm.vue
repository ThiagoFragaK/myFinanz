<template>
    <div>
        <div>
            <h1 class="ms-1 fs-5">
                {{ title }}
            </h1>
        </div>
        <div class="row mb-4">
            <div class="col-4">
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Saving value"
                    v-model="saving.value"
                >
            </div>
            <div class="col-4 form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="saving.is_positive"
                    :class="{ 'bg-success border-light': saving.is_positive }"
                    :true-value="1"
                    :false-value="0"
                >
                <label class="form-check-label">{{ checkTitle }}</label>
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
                saving: {
                    value: 0,
                    is_positive: 1,
                }
            };
        },
        methods: {
            save() {
                if(this.isEdit) {
                    return this.editSaving();
                }
                this.createSaving();
            },
            getSavingById() {
                if(!this.isEdit) return;

                this.$axios.get(`savings/${this.id}`)
                    .then(({ data }) => {
                        this.saving = data.data;
                    });
            },
            createSaving() {
                this.$axios.post(`savings`, this.saving)
                    .then((response) => {
                        console.log(response);
                        this.$notify({
                            title: 'Success',
                            text: 'Saving created successfully',
                            icon: 'success'
                        });
                        this.$emit("save");
                    });
            },
            editSaving() {
                this.$axios.put(`savings/${this.id}`, this.saving)
                    .then((response) => {
                        console.log(response);
                        this.$notify({
                            title: 'Success',
                            text: 'Saving edited successfully',
                            icon: 'success'
                        });
                        this.$emit("save");
                    });
            },
        },
        computed: {
            title() {
                return this.isEdit ? "Edit Saving" : "New Saving";
            },
            checkTitle() {
                return this.saving.is_positive === 1 ? "Positive" : "Negative";
            },
        },
        created() {
            this.getSavingById();
        }
    };
</script>  