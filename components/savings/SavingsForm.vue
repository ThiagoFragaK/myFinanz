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
                <label>{{ $t('savings.form.value') }}</label>
                <input 
                    type="number"
                    class="form-control" 
                    :placeholder="$t('savings.form.value_placeholder')"
                    v-model="saving.value"
                    @blur="validateField('value')"
                    @input="validateField('value')"
                    ref="valueRef"
                >
                <small v-if="errors.value" class="text-danger">{{ errors.value }}</small>
            </div>
            <div class="col-4">
                <label>{{ $t('savings.form.type') }}</label>
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
            {{ $t('common.save') }}
        </button>
    </div>
</template>

<script>
    import { Validation } from '@/helpers/Validation';
    import LoadingComponent from '@/components/global/LoadingComponent.vue';
    import { useSavingsService } from '@/services/SavingsService';

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
                savingsService: null
            };
        },
        methods: {
            async getSavingById() {
                if(!this.isEdit) return;

                this.isLoading = true;
                try {
                    const response = await this.savingsService.getSavingById(this.id);
                    this.saving = response.data;
                } catch (error) {
                    this.$notify({
                        title: this.$t('common.error'),
                        text: this.$t('savings.notifications.load_error'),
                        icon: 'error'
                    });
                } finally {
                    this.isLoading = false;
                }
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
                    return this.editSaving();
                }
                this.createSaving();
            },
            async createSaving() {
                try {
                    await this.savingsService.createSaving(this.saving);
                    this.$notify({
                        title: this.$t('common.success'),
                        text: this.$t('savings.notifications.created'),
                        icon: 'success'
                    });
                    this.$emit("save");
                } catch (error) {
                    this.$notify({
                        title: this.$t('common.error'),
                        text: this.$t('savings.notifications.create_error'),
                        icon: 'error'
                    });
                }
            },
            async editSaving() {
                try {
                    await this.savingsService.updateSaving(this.id, this.saving);
                    this.$notify({
                        title: this.$t('common.success'),
                        text: this.$t('savings.notifications.updated'),
                        icon: 'success'
                    });
                    this.$emit("save");
                } catch (error) {
                    this.$notify({
                        title: this.$t('common.error'),
                        text: this.$t('savings.notifications.update_error'),
                        icon: 'error'
                    });
                }
            },
        },
        computed: {
            title() {
                return this.isEdit ? this.$t('savings.edit') : this.$t('savings.new');
            },
            checkTitle() {
                return this.saving.is_positive === 1 ? this.$t('savings.form.positive') : this.$t('savings.form.negative');
            },
        },
        created() {
            this.savingsService = useSavingsService(this.$axios);
            this.getSavingById();
        }
    };
</script>  