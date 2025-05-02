<template>
    <button 
        type="button" 
        class="btn btn-light mb-4"
    >
        <IconsLucide icon="Plus" />
    </button>
    <IncomeSourcesTable />
</template>

<script>
    import IncomeSourcesTable from "@/components/income-sources/IncomeSourcesTable.vue"
    export default {
        components: {
            IncomeSourcesTable,
        }
    }
</script>