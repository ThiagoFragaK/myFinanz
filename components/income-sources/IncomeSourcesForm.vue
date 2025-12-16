<template>
    <div>
        <div>
            <h1 class="ms-1 fs-5">
                New Income Source
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
                    placeholder="Income Source Name"
                    v-model="incomeSource.name"
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
    import { useIncomeSourcesService } from '@/services/IncomeSourcesService';

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
                incomeSource: {
                    "name": ""
                },
                errors: {},
                incomeSourcesService: null
            };
        },
        methods: {
            async getIncomeSourceById() {
                if(!this.isEdit) return;

                this.isLoading = true;
                try {
                    const response = await this.incomeSourcesService.getIncomeSourceById(this.id);
                    this.incomeSource = response.data;
                } catch (error) {
                    this.$notify({
                        title: this.$t('common.error'),
                        text: this.$t('income_sources.notifications.load_error'),
                        icon: 'error'
                    });
                } finally {
                    this.isLoading = false;
                }
            },
            async validateField(field) {
                const value = this.incomeSource[field];
                const result = await Validation.validateField(field, value);

                this.errors[field] = result[field].message;
                return result[field].status;
            },
            async validateForm() {
                const result = await Validation.validateForm(this.incomeSource);
                this.errors = Object.fromEntries(
                    Object.entries(result.fields).map(([key, value]) => [key, value.message])
                );
                return result.valid;
            },
            async save() {
                const isValid = await this.validateForm();
                if (!isValid) {
                    return this.$notify({
                        title: this.$t('common.validation_error'),
                        text: this.$t('common.validation_text'),
                        icon: 'error'
                    });
                }

                if(this.isEdit) {
                    return this.editNewIncomeSource();
                }
                this.createNewIncomeSource();
            },
            async createNewIncomeSource() {
                try {
                    const response = await this.incomeSourcesService.createIncomeSource(this.incomeSource);
                    this.incomeSource = response.data;
                    this.$notify({
                        title: this.$t('common.success'),
                        text: this.$t('income_sources.notifications.created'),
                        icon: 'success'
                    });
                    this.$emit("save");
                } catch (error) {
                    this.$notify({
                        title: this.$t('common.error'),
                        text: this.$t('income_sources.notifications.create_error'),
                        icon: 'error'
                    });
                }
            },
            async editNewIncomeSource() {
                try {
                    await this.incomeSourcesService.updateIncomeSource(this.id, this.incomeSource);
                    this.$notify({
                        title: this.$t('common.success'),
                        text: this.$t('income_sources.notifications.updated'),
                        icon: 'success'
                    });
                    this.$emit("save");
                } catch (error) {
                    this.$notify({
                        title: this.$t('common.error'),
                        text: this.$t('income_sources.notifications.update_error'),
                        icon: 'error'
                    });
                }
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
            this.incomeSourcesService = useIncomeSourcesService(this.$axios);
            this.getIncomeSourceById();
        }
    };
</script>