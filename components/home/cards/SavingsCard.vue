<template>
    <div class="card border-success bg-transparent">
        <div class="card-body text-success text-center">
            <div class="row justify-content-center">
                <LoadingComponent
                    v-if="isLoading" 
                    :status="isLoading"
                />
                <div v-else class="col-auto">
                    <h1>
                        <strong>Savings: </strong>
                        <span> {{ savings.total }}</span>
                    </h1>
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
            },
        }),
        methods: {
            getBalance() {
                this.isLoading = true;
                this.$axios.get(`dashboard/savings`)
                    .then(({ data }) => {
                        this.savings.total = NumbersFormatter.formatCurrencyBR(data.data);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },
        created() {
            this.getBalance();
        },
    }
</script>