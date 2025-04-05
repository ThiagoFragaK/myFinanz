<template>
    <div>
        <apexchart 
            type="bar" 
            :options="chartOptions" 
            :series="series" 
            height="300" 
        />
        <apexchart 
            type="line" 
            :options="chartOptions" 
            :series="series" 
            height="300" 
        />
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            chartOptions: {
                theme: {
                    mode: 'dark'
                },
                chart: {
                    id: 'sales-chart'
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr']
                }
            },
            series: [
                {
                    name: 'Vendas',
                    data: [
                        70, 40, 47, 54
                    ]
                }
            ]
        }
    }
}
</script>