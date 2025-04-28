<template>
    <div class="row">
        <div class="col-2"></div>
        <div class="col-2 mt-5">
            <div class="row mt-4">
                <div class="w-100">
                    <IncomeModal />
                </div>
            </div>
            <div class="row mt-4">
                <div class="w-100">
                    <ExpensesModal />
                </div>
            </div>
            <div class="row mt-4">
                <div class="w-100">
                    <PaymentsModal />
                </div>
            </div>
            <div class="row mt-4">
                <div class="w-100">                    
                    <SavingsModal />
                </div>
            </div>
            <div class="row">
                <div class="w-100 mt-4">
                    <button
                        disabled 
                        type="button" 
                        class="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                    >
                        <IconsLucide icon="ChartColumn" />
                        Reports
                    </button>
                    <!-- <NuxtLink to="/reports" class="d-block w-100">
                    </NuxtLink> -->
                </div>
                <div class="w-100 mt-4">
                    <NuxtLink to="/settings" class="d-block w-100">
                        <button 
                            type="button" 
                            class="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                        >
                            <IconsLucide icon="Settings2" />
                            Settings
                        </button>
                    </NuxtLink>
                </div>
            </div>
        </div>
        
        <div class="col-2"></div>
        <div class="col-5">
            <div class="row">
                <GraphsLines />
            </div>
            <div class="row">
                <GraphsPie />
            </div>
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