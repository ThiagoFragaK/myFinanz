<template>
    <div>
        <div>
            <h1 class="ms-1 fs-5">
                New Income Type
            </h1>
        </div>
        <div v-if="isLoading" class="row mb-4">
            <LoadingComponent />
        </div>
        <div v-else class="row mb-4">
            <div class="col-4">
                <label>Name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Income Type Name"
                    v-model="incomeType.name"
                    @blur="validateField('name')"
                    @input="validateField('name')"
                    ref="nameRef"
                >
                <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
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
    import { useIncomeTypesService } from '@/services/IncomeTypesService';

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
                incomeType: {
                    "name": ""
                },
                errors: {},
                incomeTypesService: null
            };
        },
        methods: {
            async getIncomeTypeById() {
                if(!this.isEdit) return;

                this.isLoading = true;
                try {
                    const response = await this.incomeTypesService.getIncomeTypeById(this.id);
                    this.incomeType = response.data;
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: 'Failed to load income type',
                        icon: 'error'
                    });
                } finally {
                    this.isLoading = false;
                }
            },
            async validateField(field) {
                const value = this.incomeType[field];
                const result = await Validation.validateField(field, value);

                this.errors[field] = result[field].message;
                return result[field].status;
            },
            async validateForm() {
                const result = await Validation.validateForm(this.incomeType);
                this.errors = Object.fromEntries(
                    Object.entries(result.fields).map(([key, value]) => [key, value.message])
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
                    return this.editIncomeTypes();
                }
                this.createIncomeType();
            },
            async createIncomeType() {
                try {
                    await this.incomeTypesService.createIncomeType(this.incomeType);
                    this.$notify({
                        title: 'Success',
                        text: 'Income type created successfully',
                        icon: 'success'
                    });
                    this.$emit("save");
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: 'Failed to create income type',
                        icon: 'error'
                    });
                }
            },
            async editIncomeTypes() {
                try {
                    await this.incomeTypesService.updateIncomeType(this.id, this.incomeType);
                    this.$notify({
                        title: 'Success',
                        text: 'Income type updated successfully',
                        icon: 'success'
                    });
                    this.$emit("save");
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: 'Failed to update income type',
                        icon: 'error'
                    });
                }
            },
        },
        created() {
            this.incomeTypesService = useIncomeTypesService(this.$axios);
            this.getIncomeTypeById();
        }
    };
</script>  