<template>
    <LoadingComponent
        v-if="isLoading"
        :status="isLoading" 
    />
    <apexchart
        v-else
        type="bar"
        :options="graphOptions"
        :series="dataList"
        height="350"
    />
</template>

<script>
import LoadingComponent from '@/components/global/LoadingComponent.vue';

export default {
    name: "SavingsGraph",
    components: { LoadingComponent },
    data: () => ({
        isLoading: true,
        dataList: [],
        graphOptions: {
            chart: {
                id: 'savings-bar',
                toolbar: { 
                    show: false
                },
            },
            plotOptions: {
                bar: { 
                    borderRadius: 2, 
                    columnWidth: '90%' 
                },
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: []
            },
            colors: [
                '#2098A3'
            ],
            tooltip: {
                theme: 'light',
                y: {
                    formatter: value => new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(value)
                }
            }
        },
    }),
    methods: {
        getMonthlySavings() {
            this.isLoading = true;
            this.$axios.get(`dashboard/graph/savings`)
                .then(({ data }) => {
                    this.dataList = [
                        { name: 'Savings', data: data.data.data }
                    ];
                    this.graphOptions.xaxis.categories = data.data.dates;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },
    created() {
        this.getMonthlySavings();
    }
}
</script>