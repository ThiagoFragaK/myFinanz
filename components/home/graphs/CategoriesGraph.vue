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
    name: "CategoriesGraph",
    components: { LoadingComponent },
    data: () => ({
        isLoading: true,
        dataList: [],
        graphOptions: {
            chart: {
                id: 'categories-stacked',
                stacked: true,
                toolbar: { show: false },
            },
            plotOptions: {
                bar: {
                     horizontal: true,
                    borderRadius: 2,
                    columnWidth: '40%' 
                }
            },
            xaxis: {
                categories: []
            },
            colors: [
                '#39667f', 
                '#c0d9d3', 
                '#077366', 
                '#817f81',
                '#754a32',
                '#c15f75',
                '#69865c',
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
        getCategoriesStats() {
            this.isLoading = true;
            this.$axios.get(`dashboard/graph/categories`)
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
        this.getCategoriesStats();
    }
}
</script>