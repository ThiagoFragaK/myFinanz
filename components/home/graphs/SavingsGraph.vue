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
    name: "SavingsGraph",
    components: { LoadingComponent },
    setup() {
        const authStore = useAuthStore();
        return { authStore };
    },
    data() {
        return {
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
    };
    },
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