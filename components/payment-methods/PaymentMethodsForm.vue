<template>
    <div>
        <div>
            <h1 class="ms-1 fs-5">
                {{ title }}
            </h1>
        </div>
        <div class="row mb-4">
            <div class="col-4">
                <label>Name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Name"
                    v-model="paymentMethod.name"
                >
            </div>
            <div class="col-3">
                <label>Type</label>
                <select 
                    class="form-select form-select mb-3" 
                    aria-label="Large select example"
                    v-model="paymentMethod.type"
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
            </div>
            <div class="col-2">
                <label>Limit</label>
                <input 
                    type="number" 
                    class="form-control" 
                    placeholder="Card limit"
                    v-model="paymentMethod.limit"
                >
            </div>
            <div class="col-2">
                <label>Turn day</label>
                <input 
                    type="number" 
                    class="form-control" 
                    placeholder="Card turn day"
                    v-model="paymentMethod.turn_day"
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
                }
            };
        },
        methods: {
            getPaymentMethodById() {
                if(!this.isEdit) return;

                this.$axios.get(`payment_methods/${this.id}`)
                    .then(({ data }) => {
                        this.card = data.data;
                    });
            },
            save() {
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