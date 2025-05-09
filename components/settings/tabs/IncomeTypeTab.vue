<template>
    <IncomeTypesForm />
    <IncomeTypesTable />
</template>

<script>
    import IncomeTypesForm from "@/components/income-types/IncomeTypesForm.vue";
    import IncomeTypesTable from "@/components/income-types/IncomeTypesTable.vue";
    export default {
        components: {
            IncomeTypesForm,
            IncomeTypesTable,
        }
    }
</script>