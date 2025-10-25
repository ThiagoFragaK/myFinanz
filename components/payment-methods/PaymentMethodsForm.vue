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
                <label>Name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Name"
                    v-model="paymentMethod.name"
                    @blur="validateField('name')"
                    ref="nameRef"
                >
                <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
            </div>
            <div class="col-3">
                <label>Type</label>
                <select 
                    class="form-select form-select" 
                    aria-label="Large select example"
                    v-model="paymentMethod.type"
                    @blur="validateField('type')"
                    ref="typeRef"
                >
                    <option disabled selected value="">Select the type</option>
                    <option 
                        v-for="option in typesList"
                        :key="option.id" 
                        :value="option.id"
                    >
                        {{ option.name }}
                    </option>
                </select>
                <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
            </div>
            <div class="col-2">
                <label>Limit</label>
                <input 
                    type="number" 
                    class="form-control" 
                    placeholder="Card limit"
                    v-model="paymentMethod.limit"
                    @blur="validateField('limit')"
                    ref="limitRef"
                >
                <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
            </div>
            <div class="col-2">
                <label>Turn day</label>
                <input 
                    type="number" 
                    class="form-control" 
                    placeholder="Card turn day"
                    v-model="paymentMethod.turn_day"
                    @blur="validateField('turnDay')"
                    ref="turnDayRef"
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
                    { id: 0, name: "Debt" },
                    { id: 1, name: "Credit" },
                ],
                paymentMethod: {
                    name: "",
                    type: "",
                    credict_card: "",
                    turn_day: "",
                    limit: 0,
                },
                errors: {},
            };
        },
        methods: {
            getPaymentMethodById() {
                if(!this.isEdit) return;

                this.isLoading = true;
                this.$axios.get(`payment_methods/${this.id}`)
                    .then(({ data }) => {
                        this.paymentMethod = data.data;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
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
                    return this.editPaymentMethod();
                }
                this.createPaymentMethod();
            },            
            createPaymentMethod() {
                this.$axios.post(`payment_methods`, this.paymentMethod)
                    .then(() => {
                        this.$notify({
                            title: 'Success',
                            text: 'Payment Method created successfully',
                            icon: 'success'
                        });
                        this.$emit("save");
                    });
            },
            editPaymentMethod() {
                this.$axios.put(`payment_methods/${this.id}`, this.paymentMethod)
                    .then(() => {
                        this.$notify({
                            title: 'Success',
                            text: 'Payment Method updated successfully',
                            icon: 'success'
                        });
                        this.$emit("save");
                    });
            },
        },
        computed: {
            title() {
                return this.isEdit ? "Edit Method" : "New Payment method";
            },
            isCredictCard() {
                return this.paymentMethod.type === 1;
            },
        },
        created() {
            this.getPaymentMethodById();
        }
    };
</script>  