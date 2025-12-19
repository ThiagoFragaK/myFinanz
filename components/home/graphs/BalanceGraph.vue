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
    import { useAuthStore } from '@/stores/auth';

    const currencyConfig = {
        BRL: { locale: 'pt-BR', currency: 'BRL' },
        EUR: { locale: 'de-DE', currency: 'EUR' },
        USD: { locale: 'en-US', currency: 'USD' },
        ARS: { locale: 'es-AR', currency: 'ARS' },
    };

    export default {
        name: "BalanceGraph",
        components: {
            LoadingComponent,
        },
        setup() {
            const authStore = useAuthStore();
            return { authStore };
        },
        data() {
            return {
                isLoading: true,
                dataList: [],
                datesList: [],
                graphOptions: null,
            };
        },
        methods: {
            getMonthBalance() {
                this.isLoading = true;
                this.$axios.get(`dashboard/graph/monthly`)
                    .then(({ data }) => {
                        this.dataList = data.data.data.map(item => ({
                            ...item,
                            name: this.$t(item.name)
                        }));
                        this.graphOptions.xaxis.categories = data.data.dates;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },
        created() {
            const userCurrency = this.authStore.currency;
            this.graphOptions = {
                chart: {
                    id: 'sales-bar',
                    toolbar: { 
                        show: false 
                    },
                },
                stroke: {
                    curve: 'smooth',
                    width: 1
                },
                markers: {
                    size: 2,
                },
                xaxis: {
                    categories: []
                },
                colors: [
                    '#207236',
                    '#b13933', 
                    '#091b2b', 
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
            };
            this.getMonthBalance();
        },
        computed: {
            showGraph() {
                return !this.isLoading && this.dataList > 0;
            }
        }
    }
</script>