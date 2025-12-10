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
import { useAuthStore } from '@/stores/auth';

const currencyConfig = {
    BRL: { locale: 'pt-BR', currency: 'BRL' },
    EUR: { locale: 'de-DE', currency: 'EUR' },
    USD: { locale: 'en-US', currency: 'USD' },
    ARS: { locale: 'es-AR', currency: 'ARS' },
};

export default {
    name: "CategoriesGraph",
    components: { LoadingComponent },
    setup() {
        const authStore = useAuthStore();
        return { authStore };
    },
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
            dataLabels: {
                enabled: true,
                formatter: (value) => {
                    const config = currencyConfig[this.authStore.currency] || currencyConfig.BRL;
                    return new Intl.NumberFormat(config.locale, {
                        style: 'currency',
                        currency: config.currency
                    }).format(value);
                },
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    colors: ['#fff']
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
                    formatter: (value) => {
                        const config = currencyConfig[this.authStore.currency] || currencyConfig.BRL;
                        return new Intl.NumberFormat(config.locale, {
                            style: 'currency',
                            currency: config.currency
                        }).format(value);
                    }
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