<template>
    <div>
        <div>
            <h1 class="ms-1 fs-5">
                {{ title }}
            </h1>
        </div>
        <div v-if="isLoading" class="row mb-4">
            <LoadingComponent />
        </div>
        <div v-else class="row mb-4">
            <div class="col-4">
                <label>Value</label>
                <input 
                    type="number"
                    class="form-control" 
                    placeholder="Saving value"
                    v-model="saving.value"
                    @blur="validateField('value')"
                    ref="valueRef"
                >
                <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
            </div>
            <div class="col-4">
                <label>Value status</label>
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="saving.is_positive"
                        :class="{ 'bg-success border-light': saving.is_positive }"
                        :true-value="1"
                        :false-value="0"
                    >
                    <label class="form-check-label ms-2 mt-2">{{ checkTitle }}</label>
                </div>
            </div>
        </div>
        <button 
            type="button" 
            class="btn btn-primary btn-sm"
            :disabled="isLoading"
            @click="save"
        >
            Save
        </button>
    </div>
</template>
  
<script>
    import { Validation } from '@/helpers/Validation';
    import LoadingComponent from '@/components/global/LoadingComponent.vue';
    export default {
        components: {
            LoadingComponent,
        },
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
                isLoading: false,
                saving: {
                    value: 0,
                    is_positive: 1,
                },
                errors: {},
            };
        },
        methods: {
            getSavingById() {
                if(!this.isEdit) return;

                this.isLoading = true;
                this.$axios.get(`savings/${this.id}`)
                    .then(({ data }) => {
                        this.saving = data.data;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
            async validateField(field) {
                const value = this.saving[field];
                const result = await Validation.validateField(field, value);

                this.errors[field] = result[field].message;
                return result[field].status;
            },
            async validateForm() {
                const result = await Validation.validateForm(this.saving);
                this.errors = Object.fromEntries(
                    Object.entries(result.fields).map(([f, v]) => [f, v.message])
                );
                return result.valid;
            },
            async save() {
                const isValid = await this.validateForm();
                if (!isValid) {
                    return this.$notify({
                        title: "Validation error",
                        text: "One or more fields aren't valid, fix them and try again.",
                        icon: 'error'
                    });
                }

                if(this.isEdit) {
                    return this.editSaving();
                }
                this.createSaving();
            },
            createSaving() {
                this.$axios.post(`savings`, this.saving)
                    .then((response) => {
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