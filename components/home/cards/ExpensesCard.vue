<template>
    <div class="card text-bg-primary">
        <div v-if="isLoading" class="card-body text-info text-center">
            <LoadingComponent
                :status="isLoading"
            />
        </div>
        <div v-else class="card-body scrollable-card-body">
            <h5>Last expenses</h5>
            <div
                v-if="expenses.length > 0"
                v-for="(expense, index) in expenses" 
                :key="index" 
                class="d-flex justify-content-between mb-2"
            >
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <strong>{{ expense.name }}</strong>
                        </div>
                        <div class="col">
                            <span>{{ expense.date }}</span>
                        </div>
                        <div class="col">
                            <span>{{ expense.value }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="d-flex justify-content-center align-items-center">
                <span class="mt-3">There has been no expenses yet.</span>
            </div>
        </div>
    </div>
</template>

<script>
    import NumbersFormatter from "@/helpers/Numbers";
    import DatesFormatter from "@/helpers/Dates";
    import LoadingComponent from "@/components/global/LoadingComponent.vue";
    export default {
        components: {
            LoadingComponent,
        },
        data: () => ({
            isLoading: true,
            expenses: [],
        }),
        methods: {
            getExpenses() {
                this.isLoading = true;
                this.$axios.get(`dashboard/expenses`)
                    .then(({ data }) => {
                        this.expenses = data.data.map(item => {
                            return {
                                "name": item.name,
                                "value": NumbersFormatter.formatCurrencyBR(item.value),
                                "date": DatesFormatter.getFormatedDate(item.date, "dd/MM"),
                            }
                        });
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },
        created() {
            this.getExpenses();
        },
    }
</script>

<style>
    .scrollable-card-body {
        max-height: 120px;
        overflow-y: auto;
    }
</style>