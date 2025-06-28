<template>
    <div class="card text-bg-primary">
        <div class="card-body">
            <h5 class="card-title">Last transations</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
        </div>
    </div>
</template>

<script>
    import NumbersFormatter from "@/helpers/Numbers";
    import LoadingComponent from "@/components/global/LoadingComponent.vue";
    export default {
        components: {
            LoadingComponent,
        },
        data: () => ({
            isLoading: true,
            expenses: {
                total: 0,
            },
        }),
        methods: {
            getExpenses() {
                this.isLoading = true;
                this.$axios.get(`dashboard/expenses`)
                    .then(({ data }) => {
                        console.log(data)
                        this.expenses.total = 0;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },
        created() {
            this.getExpenses();
        },
    }
</script>