<template>
    <div class="row justify-content-center mt-4 align-items-stretch">
        <div class="col-4 d-flex flex-fill">
            <BalanceCard 
                class="flex-grow-1"
                @updateIncome="updateIncome"
                @updateExpenses="updateExpenses"
            />
        </div>
        <div class="col-4 d-flex flex-fill">
            <ExpensesCard 
                class="flex-grow-1"
                :key="reloadExpenses"
            />
        </div>
        <div class="col-4 d-flex flex-fill">
            <SavingsCard class="flex-grow-1" />
        </div>
    </div>
    <div class="row justify-content-center mt-4">
        <div class="row">
            <BalanceGraph
                :key="reloadBalanceGraph"
            />
        </div>
        <div class="row">
            <div class="col">
                <SavingsGraph />
            </div>
            <div class="col">
                <CategoriesGraph
                    :key="reloadExpenses"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import BalanceCard from "@/components/home/cards/BalanceCard.vue";
    import ExpensesCard from "@/components/home/cards/ExpensesCard.vue";
    import SavingsCard from "@/components/home/cards/SavingsCard.vue";
    import BalanceGraph from "@/components/home/graphs/BalanceGraph.vue";
    import SavingsGraph from "@/components/home/graphs/SavingsGraph.vue";
    import CategoriesGraph from "@/components/home/graphs/CategoriesGraph.vue";

    export default {
        components: {
            CategoriesGraph,
            SavingsGraph,
            BalanceGraph,
            BalanceCard,
            ExpensesCard,
            SavingsCard
        },
        data() {
            return {
                reloadIncomes: false,
                reloadExpenses: false,
            }
        },
        methods: {
            updateIncome() {
                this.reloadIncomes = !this.reloadIncomes;
            },
            updateExpenses() {
                this.reloadExpenses = !this.reloadExpenses;
            },
        },
        computed: {
            reloadBalanceGraph() {
                return `${this.reloadIncomes}-${this.reloadExpenses}`;
            }
        }
    }
</script>