<template>
    <div class="card border-success bg-transparent">
        <div v-if="isLoading" class="card-body text-success text-center">
            <LoadingComponent
                :status="isLoading"
            />
        </div>
        <div v-else class="card-body text-success text-center">
            <div class="row justify-content-center">
                <div class="col-auto">
                    <h2>
                        <strong>Balance: </strong>
                        <span> {{ balance.total }}</span>
                    </h2>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-5">
                    <div class="row align-items-center">
                        <div class="col-2">
                            <button
                                class="btn btn-outline-primary btn-sm border-0"
                            >
                                <IconsLucide icon="BanknoteArrowDown" />
                            </button>
                        </div>
                        <div class="col-10">
                            <h6 class="mb-0">
                                <strong>Income: </strong>
                                <span>{{ balance.income }}</span>
                            </h6>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="row align-items-center">
                        <div class="col-2">
                            <button
                                class="btn btn-outline-primary btn-sm border-0"
                            >
                                <IconsLucide icon="BanknoteArrowUp" />
                            </button>
                        </div>
                        <div class="col-10">
                            <h6 class="mb-0">
                                <strong>Expenses: </strong>
                                <span>{{ balance.expenses }}</span>
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
        data: () => ({
            isLoading: true,
            balance: {
                total: 0,
                income: 0,
                expenses: 0,
            },
        }),
        methods: {
            getBalance() {
                this.isLoading = true;
                this.$axios.get(`dashboard/balance`)
                    .then(({ data }) => {
                        this.balance.total = NumbersFormatter.formatCurrencyBR(data.data.net_balance) ?? 0;
                        this.balance.expenses = NumbersFormatter.formatCurrencyBR(data.data.total_expense) ?? 0;
                        this.balance.income = NumbersFormatter.formatCurrencyBR(data.data.total_income) ?? 0;
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