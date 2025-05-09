<template>
    <IncomeSourcesForm />
    <IncomeSourcesTable />
</template>

<script>
    import IncomeSourcesForm from "@/components/income-sources/IncomeSourcesForm.vue";
    import IncomeSourcesTable from "@/components/income-sources/IncomeSourcesTable.vue";
    export default {
        components: {
            IncomeSourcesForm,
            IncomeSourcesTable,
        }
    }
</script>