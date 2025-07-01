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
        <div class="col-6">
            <GraphsLines />
        </div>
        <div class="col-6">
            <GraphsPie />
        </div>
    </div>
</template>

<script>
    import BalanceCard from "@/components/home/cards/BalanceCard.vue";
    import ExpensesCard from "@/components/home/cards/ExpensesCard.vue";
    import SavingsCard from "@/components/home/cards/SavingsCard.vue";

    export default {
        components: {
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