<template>
    <TableComponent
        :data="data"
        :columns="columns"
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
                { key: "id", label: "Id" },
                { key: "name", label: "Name" },
            ],
            data: [],
        }),
        methods: {
            getIncomeSources() {
                this.$axios.get(`income/types`)
                    .then(({ data }) => {
                        this.data = data;
                    });
            },
        },
        created() {
            this.getIncomeSources();
        }
    }
</script>