<template>
    <div class="container my-5">
        <div class="card text-bg-primary shadow rounded-3">
            <div class="card-header fw-semibold">
                Settings
            </div>
            <div class="card-body">
                <TabsComponent :tabs="tabs">
                    <template #main>
                        <MainTab />
                    </template>
                    <template #cards>
                        <CardsTab />
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
                    <template #payments>
                        <PaymentsTab />
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
    import CardsTab from '@/components/settings/tabs/CardsTab.vue';
    import ExpensesTab from '@/components/settings/tabs/ExpensesTab.vue';
    import IncomeSourceTab from '@/components/settings/tabs/IncomeSourceTab.vue';
    import IncomeTypeTab from '@/components/settings/tabs/IncomeTypeTab.vue';
    import IncomeTab from '@/components/settings/tabs/IncomeTab.vue';
    import PaymentsTab from '@/components/settings/tabs/PaymentsTab.vue';
    import SavingsTab from '@/components/settings/tabs/SavingsTab.vue';

    export default {
        components: {
            TabsComponent,
            MainTab,
            CardsTab,
            ExpensesTab,
            IncomeSourceTab,
            IncomeTypeTab,
            IncomeTab,
            PaymentsTab,
            SavingsTab,
        },
        data() {
            return {
                tabs: [
                    { name: "main", label: "Main settings" },
                    { name: "cards", label: "Cards" },
                    { name: "expenses", label: "Expenses" },
                    { name: "income", label: "Incomes" },
                    { name: "income_type", label: "Incomes Types" },
                    { name: "income_sources", label: "Incomes Sources" },
                    { name: "payments", label: "Payments" },
                    { name: "savings", label: "Savings" },
                ],
            };
        },
    };
</script>