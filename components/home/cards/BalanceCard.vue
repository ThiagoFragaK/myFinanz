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
                                v-tooltip="'New income'"
                                class="btn btn-outline-primary btn-sm border-0"
                                @click="openIncomesModal"
                            >
                                <IconsLucide icon="BanknoteArrowDown" />
                            </button>
                        </div>
                        <div class="col-10">
                            <h6 class="mb-0">
                                <div class="row">
                                    <strong>Income: </strong>
                                </div>
                                <div class="row">
                                    <span>{{ balance.income }}</span>
                                </div>
                            </h6>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="row align-items-center">
                        <div class="col-2">
                            <button
                                v-tooltip="'New expense'"
                                class="btn btn-outline-primary btn-sm border-0"
                                @click="openExpensesModal"
                            >
                                <IconsLucide icon="BanknoteArrowUp" />
                            </button>
                        </div>
                        <div class="col-10">
                            <h6 class="mb-0">
                                <div class="row">
                                    <strong>Expenses: </strong>
                                </div>
                                <div class="row">
                                    <span>{{ balance.expenses }}</span>
                                </div>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <IncomeModal @reloadIncomes="reloadIncomes()" ref="IncomeModal" />
        <ExpenseModal @reloadExpenses="reloadExpenses()" ref="ExpenseModal" />
    </div>
</template>

<script>
    import NumbersFormatter from "@/helpers/Numbers";
    import LoadingComponent from "@/components/global/LoadingComponent.vue";
    import ExpenseModal from "@/components/home/modals/ExpenseModal.vue";
    import IncomeModal from "@/components/home/modals/IncomeModal.vue";

    export default {
        components: {
            IncomeModal,
            ExpenseModal,
        },
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
            reloadIncomes() {
                this.$emit("updateIncome");
                this.getBalance();
            },
            reloadExpenses() {
                this.$emit("updateExpenses");
                this.getBalance();
            },
            openExpensesModal() {
                this.$refs.ExpenseModal.open();
            },
            openIncomesModal() {
                this.$refs.IncomeModal.open();
            },
        },
        created() {
            this.getBalance();
        },
    }
</script>