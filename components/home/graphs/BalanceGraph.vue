<template>
    <LoadingComponent
        v-if="isLoading"
        :status="isLoading" 
    />
    <apexchart
        v-else
        type="line"
        :options="graphOptions"
        :series="dataList"
        height="350"
    />
</template>

<script>
    import LoadingComponent from '@/components/global/LoadingComponent.vue';
    export default {
        name: "BalanceGraph",
        components: {
            LoadingComponent,
        },
        data: () => ({
            isLoading: true,
            dataList: [],
            datesList: [],
            graphOptions: {
                chart: {
                    id: 'sales-bar',
                    toolbar: { 
                        show: false 
                    },
                },
                stroke: {
                    curve: 'smooth',
                    width: 2
                },
                markers: {
                    size: 2,
                },
                xaxis: {
                    categories: []
                },
                colors: ['#347571', '#533f41', '#344c5b'],
                tooltip: {
                    theme: 'light',
                    y: {
                        formatter: function (value) {
                            return new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(value);
                        }
                    }
                }
            },
        }),
        methods: {
            getMonthBalance() {
                this.isLoading = true;
                this.$axios.get(`dashboard/graph/monthly`)
                    .then(({ data }) => {
                        this.dataList = data.data.data;
                        this.graphOptions.xaxis.categories = data.data.dates;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },
        created() {
            this.getMonthBalance();
        },
        computed: {
            showGraph() {
                return !this.isLoading && this.dataList > 0;
            }
        }
    }
</script>