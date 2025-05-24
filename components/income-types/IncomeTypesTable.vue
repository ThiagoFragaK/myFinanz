<template>
    <TableComponent
        :data="data"
        :columns="columns"
        @selectedRows="updateSelectedRows"
    ></TableComponent>
</template>

<script>
    import TableComponent from "@/components/global/TableComponent.vue"
    export default {
        components: {
            TableComponent
        },
        data: () => ({
            columns: [
                { key: "id", label: "Code" },
                { key: "name", label: "Name" },
            ],
            data: [],
            selectedRows: [],
        }),
        methods: {
            getIncomeTypes() {
                this.$axios.get(`income/types`)
                    .then(({ data }) => {
                        this.data = data.data;
                    });
            },
            updateSelectedRows(rows) {
                this.selectedRows = rows;
                this.$emit("allowActions", rows);
            },
        },
        created() {
            this.getIncomeTypes();
        }
    }
</script>