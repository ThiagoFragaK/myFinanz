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
                        //check length: if zero, returns message saying it has none
                        this.expenses = data.data.map(item => {
                            return {
                                "name": item.name,
                                "value": NumbersFormatter.formatCurrencyBR(item.value),
                                "date": DatesFormatter.getFormatedMonthDate(item.created_at),
                            }
                        });
                    })
                    .finally(() => {
                        console.log(this.expenses)
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