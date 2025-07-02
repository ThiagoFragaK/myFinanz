<template>
    <div class="card border-success bg-transparent">
        <div class="card-body text-success text-center">
            <div class="row justify-content-center mb-2">
                <LoadingComponent
                    v-if="isLoading" 
                    :status="isLoading"
                />
                <div v-else>
                    <div class="col-auto">
                        <h2>
                            <strong>Savings: </strong>
                            <span> {{ savings.total }}</span>
                        </h2>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-7">
                            <h6>
                                <strong>Previously: </strong>
                                <span> {{ savings.previous }}</span>
                            </h6>
                        </div>
                        <div class="col-5">
                            <h6>
                                <strong>Variação: </strong>
                                <span
                                    :class="{ 'text-danger': savings.variation < 0, 'text-success': savings.variation >= 0 }"
                                >{{ variationNumber }}</span>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NumbersFormatter from "@/helpers/Numbers";
    import LoadingComponent from "@/components/global/LoadingComponent.vue";
    export default {
        components: {
            LoadingComponent,
        },
        data: () => ({
            isLoading: true,
            savings: {
                total: 0,
                previous: 0,
                variation: 0,
            },
        }),
        methods: {
            getBalance() {
                this.isLoading = true;
                this.$axios.get(`dashboard/savings`)
                    .then(({ data }) => {
                        this.savings.total = NumbersFormatter.formatCurrencyBR(data.data.current);
                        this.savings.previous = NumbersFormatter.formatCurrencyBR(data.data.previous);
                        this.savings.variation = data.data.variation;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },
        computed: {
            variationNumber() {
                return this.savings.variation + "%";
            }
        },
        created() {
            this.getBalance();
        },
    }
</script>