<template>
    <div>
        <div>
            <h1 class="ms-1 fs-5">
                {{ title }}
            </h1>
        </div>
        <div class="row mb-4">
            <div class="col-6">
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Payment name"
                    v-model="payment.name"
                >
            </div>
            <div class="col-6">
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Payment description"
                    v-model="payment.description"
                >
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-3">
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Payment value"
                    v-model="payment.value"
                >
            </div>
            <div class="col-3 form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="payment.constValue"
                    :class="{ 'bg-success border-light': payment.constValue }"
                    :true-value="1"
                    :false-value="0"
                >
                <label class="form-check-label">{{ cosntValueTitle }}</label>
            </div>
            <div class="col-1">
                <input 
                    type="number" 
                    class="form-control" 
                    placeholder="Payment due day"
                    v-model="payment.dueDay"
                >
            </div>
            <div class="col-3">
                <input 
                    type="date" 
                    class="form-control" 
                    placeholder="Payment finish date"
                    v-model="payment.endDate"
                >
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
                payment: {
                    name: "",
                    description: "",
                    value: 0,
                    constValue: 1,
                    dueDay: 1,
                    endDate: "",
                }
            };
        },
        methods: {
            save() {
                if(this.isEdit) {
                    return this.editPayment();
                }
                this.createPayment();
            },
            getPaymentById() {
                if(!this.isEdit) return;

                this.$axios.get(`payments/${this.id}`)
                    .then(({ data }) => {
                        let payment = data.data;
                        console.log(payment)
                        this.payment = {
                            name: payment.name,
                            description: payment.description,
                            value: payment.value,
                            constValue: payment.const_value,
                            dueDay: payment.due_day,
                            endDate: payment.end_date,
                        };
                    });
            },
            createPayment() {
                this.$axios.post(`payments`, this.payment)
                    .then(({data}) => {
                        console.log(data);
                        this.$notify({
                            title: 'Success',
                            text: 'Payment created successfully',
                            icon: 'success'
                        });
                        this.$emit("save");
                    });
            },
            editPayment() {
                this.$axios.put(`payments/${this.id}`, this.payment)
                    .then(({data}) => {
                        console.log(data)
                        this.$notify({
                            title: 'Success',
                            text: 'Payment updated successfully',
                            icon: 'success'
                        });
                        this.$emit("save");
                    });
            },
        },
        computed: {
            title() {
                return this.isEdit ? "Edit Payment" : "New Payment";
            },
            cosntValueTitle() {
                return this.payment.const_value === 1 ? "Const" : "Variable";
            }
        },
        created() {
            this.getPaymentById();
        }
    };
</script>  