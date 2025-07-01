<template>
    <div>
        <div>
            <h1 class="ms-1 fs-5">
                Open Debts to pay
            </h1>
        </div>

        
        <div 
            class="card text-bg-info mb-3"
            v-for="payment in paymentsList"
            :key="payment.id"
        >
            <div 
                class="row card-body"
            >
                <div class="col-4 d-flex flex-column">
                    <span class="fw-bold">{{ payment.name }}</span>
                    <span class="text-muted">{{ payment.description }}</span>
                </div>

                <div class="col-3">
                    <div v-if="payment.const_value === null">
                        <input
                            type="number"
                            class="form-control"
                            placeholder="Payment value"
                            v-model="input.constValue"
                        />
                    </div>
                    <div v-else>
                        <span class="fs-5">R$ {{ payment.value }}</span>
                    </div>
                </div>

                <div class="col-2 d-flex align-items-center">
                    <span
                        :class="{
                            'text-danger fw-bold': isLate(payment.due_day),
                            'text-primary fw-bold': !isLate(payment.due_day)
                        }"
                    >
                        {{ isLate(payment.due_day) ? 'Late' : 'Still due' }}
                    </span>
                </div>

                <div class="col-3 d-flex align-items-center">
                    <div class="form-check form-switch d-flex align-items-center" style="font-size: 1.25rem;">
                        <input
                            class="form-check-input custom-switch-lg"
                            type="checkbox"
                            v-model="payment.open"
                            :true-value="0"
                            :false-value="1"
                            @change="updatePaymentStatus(payment)"
                        />
                        <label class="form-check-label ms-2">{{ payment.open === 0 ? "Open" : "In debt" }}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
    export default {
        data() {
            return {
                paymentsList: [],
                input: {
                    constValue: 0,
                }
            };
        },
        methods: {
            getPayments() {
                this.$axios.get(`payments/status`)
                    .then(({ data }) => {
                        this.paymentsList = data.data;
                        console.log(this.paymentsList)
                    });
            },
            updatePaymentStatus(payment) {
                console.log(payment)
                console.log(this.input)
            },
            isLate(dueDay) {
                const today = new Date().getDate();
                return dueDay < today;
            },
        },
        computed: {
        },
        created() {
            this.getPayments();
        }
    };
</script>  

<style scoped>

.custom-switch-lg {
  width: 3rem;
  height: 1.5rem;
}

.custom-switch-lg:checked {
  background-color: #198754;
}
</style>