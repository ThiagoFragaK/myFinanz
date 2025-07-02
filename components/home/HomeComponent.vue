<template>
    <div class="row justify-content-center mt-4 align-items-stretch">
        <div class="col-4 d-flex flex-fill">
            <BalanceCard class="flex-grow-1" />
        </div>
        <div class="col-4 d-flex flex-fill">
            <ExpensesCard class="flex-grow-1" />
        </div>
        <div class="col-4 d-flex flex-fill">
            <SavingsCard class="flex-grow-1" />
        </div>
    </div>
    <div class="row justify-content-center mt-4">
        <BalanceGraph />
    </div>
</template>

<script>
    import BalanceCard from "@/components/home/cards/BalanceCard.vue";
    import ExpensesCard from "@/components/home/cards/ExpensesCard.vue";
    import SavingsCard from "@/components/home/cards/SavingsCard.vue";
    import BalanceGraph from "@/components/home/graphs/BalanceGraph.vue";

    export default {
        components: {
            BalanceGraph,
            BalanceCard,
            ExpensesCard,
            SavingsCard
        },
        data() {
            return {
            }
        },
    }
</script>