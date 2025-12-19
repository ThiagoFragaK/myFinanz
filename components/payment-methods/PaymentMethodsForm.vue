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
                <label>{{ $t('common.name') }}</label>
                <input 
                    type="text" 
                    class="form-control" 
                    :placeholder="$t('payment_methods.form.name_placeholder')"
                    v-model="paymentMethod.name"
                    @blur="validateField('name')"
                    @input="validateField('name')"
                    ref="nameRef"
                >
                <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
            </div>
            <div class="col-3">
                <label>{{ $t('payment_methods.table.type') }}</label>
                <select 
                    class="form-select form-select" 
                    aria-label="Large select example"
                    v-model="paymentMethod.type"
                    @blur="validateField('type')"
                    ref="typeRef"
                >
                    <option disabled selected value="">{{ $t('payment_methods.form.select_type') }}</option>
                    <option 
                        v-for="option in typesList"
                        :key="option.id" 
                        :value="option.id"
                    >
                        {{ option.name }}
                    </option>
                </select>
                <small v-if="errors.type" class="text-danger">{{ errors.type }}</small>
            </div>
            <div class="col-2">
                <label>{{ $t('payment_methods.table.limit') }}</label>
                <input 
                    type="number" 
                    class="form-control"
                    :placeholder="$t('payment_methods.form.limit_placeholder')"
                    v-model="paymentMethod.limit"
                    @blur="validateField('limit')"
                    @input="validateField('limit')"
                    ref="limitRef"
                >
                <small v-if="errors.limit" class="text-danger">{{ errors.limit }}</small>
            </div>
            <div class="col-2">
                <label>{{ $t('payment_methods.table.turn_day') }}</label>
                <input 
                    type="number" 
                    class="form-control" 
                    :placeholder="$t('payment_methods.form.turn_day_placeholder')"
                    v-model="paymentMethod.turn_day"
                    @blur="validateField('turn_day')"
                    @input="validateField('turn_day')"
                    ref="turnDayRef"
                >
                <small v-if="errors.turn_day" class="text-danger">{{ errors.turn_day }}</small>
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
    import { usePaymentMethodsService } from '@/services/PaymentMethodsService';

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
                typesList: [
                    { id: 0, name: this.$t('payment_methods.form.debt') },
                    { id: 1, name: this.$t('payment_methods.form.credit') },
                ],
                paymentMethod: {
                    name: "",
                    type: "",
                    credict_card: "",
                    turn_day: "",
                    limit: 0,
                },
                errors: {},
                paymentMethodsService: null
            };
        },
        methods: {
            async getPaymentMethodById() {
                if(!this.isEdit) return;

                this.isLoading = true;
                try {
                    const response = await this.paymentMethodsService.getPaymentMethodById(this.id);
                    this.paymentMethod = response.data;
                } catch (error) {
                    this.$notify({
                        title: this.$t('common.error'),
                        text: this.$t('payment_methods.notifications.load_error'),
                        icon: 'error'
                    });
                } finally {
                    this.isLoading = false;
                }
            },
            async validateField(field) {
                const value = this.paymentMethod[field];
                const result = await Validation.validateField(field, value);

                this.errors[field] = result[field].message;
                return result[field].status;
            },
            async validateForm() {
                const result = await Validation.validateForm(this.paymentMethod);
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
                    return this.editPaymentMethod();
                }
                this.createPaymentMethod();
            },            
            async createPaymentMethod() {
                try {
                    await this.paymentMethodsService.createPaymentMethod(this.paymentMethod);
                    this.$notify({
                        title: this.$t('common.success'),
                        text: this.$t('payment_methods.notifications.created'),
                        icon: 'success'
                    });
                    this.$emit("save");
                } catch (error) {
                    this.$notify({
                        title: this.$t('common.error'),
                        text: this.$t('payment_methods.notifications.create_error'),
                        icon: 'error'
                    });
                }
            },
            async editPaymentMethod() {
                try {
                    await this.paymentMethodsService.updatePaymentMethod(this.id, this.paymentMethod);
                    this.$notify({
                        title: this.$t('common.success'),
                        text: this.$t('payment_methods.notifications.updated'),
                        icon: 'success'
                    });
                    this.$emit("save");
                } catch (error) {
                    this.$notify({
                        title: this.$t('common.error'),
                        text: this.$t('payment_methods.notifications.update_error'),
                        icon: 'error'
                    });
                }
            },
        },
        computed: {
             title() {
                return this.isEdit ? this.$t('payment_methods.edit') : this.$t('payment_methods.new');
            },
            isCredictCard() {
                return this.paymentMethod.type === 1;
            },
        },
        created() {
            this.paymentMethodsService = usePaymentMethodsService(this.$axios);
            this.getPaymentMethodById();
        }
    };
</script>  