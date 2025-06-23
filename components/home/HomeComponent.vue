<template>
    <div class="row justify-content-center mt-4">
        <div class="col">
            <div class="card border-success bg-transparent mb-3">
                <div class="card-body text-success">
                    <h5 class="card-title">Success card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card text-bg-primary mb-3">
                <div class="card-body">
                    <h5 class="card-title">Primary card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card border-success bg-transparent mb-3">
                <div class="card-body text-success">
                    <h5 class="card-title">Success card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                </div>
            </div>          
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
    import IncomeModal from "@/components/home/modals/IncomesModal.vue";
    import ExpensesModal from "@/components/home/modals/ExpensesModal.vue";
    import PaymentsModal from "@/components/home/modals/PaymentsModal.vue";
    import SavingsModal from "@/components/home/modals/SavingsModal.vue";
    export default {
        components: {
            IncomeModal,
            ExpensesModal,
            PaymentsModal,
            SavingsModal
        },
        data() {
            return {
            }
        },
    }
</script>