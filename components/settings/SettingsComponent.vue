<template>
    <div class="container my-5">
        <div class="card border-success bg-transparent rounded-3">
            <!-- <div class="card-header fw-semibold">
                Settings
            </div> -->
            <div class="card-body">
                <TabsComponent :tabs="tabs" color="primary">
                    <template #main>
                        <MainTab />
                    </template>
                    <template #payment_methods>
                        <PaymentMethodsTab />
                    </template>
                    <template #expenses>
                        <ExpensesTab />
                    </template>
                    <template #income>
                        <IncomeTab />
                    </template>
                    <template #income_type>
                        <IncomeTypeTab />
                    </template>
                    <template #income_sources>
                        <IncomeSourceTab />
                    </template>
                    <template #savings>
                        <SavingsTab />
                    </template>
                </TabsComponent>
            </div>
        </div>
    </div>
</template>

<script>
    import TabsComponent from '@/components/global/TabsComponent.vue';
    import MainTab from '@/components/settings/tabs/MainTab.vue';
    import PaymentMethodsTab from '@/components/settings/tabs/PaymentMethodsTab.vue';
    import ExpensesTab from '@/components/settings/tabs/ExpensesTab.vue';
    import IncomeSourceTab from '@/components/settings/tabs/IncomeSourceTab.vue';
    import IncomeTypeTab from '@/components/settings/tabs/IncomeTypeTab.vue';
    import IncomeTab from '@/components/settings/tabs/IncomeTab.vue';
    import SavingsTab from '@/components/settings/tabs/SavingsTab.vue';

    export default {
        components: {
            TabsComponent,
            MainTab,
            PaymentMethodsTab,
            ExpensesTab,
            IncomeSourceTab,
            IncomeTypeTab,
            IncomeTab,
            SavingsTab,
        },
        data() {
            return {
                tabs: [
                    // { name: "main", label: "Main settings" },
                    { name: "payment_methods", label: "Payment methods" },
                    { name: "expenses", label: "Expenses" },
                    { name: "income", label: "Incomes" },
                    { name: "income_type", label: "Incomes Types" },
                    { name: "income_sources", label: "Incomes Sources" },
                    { name: "savings", label: "Savings" },
                ],
            };
        },
    };
</script>