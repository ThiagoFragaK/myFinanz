<template>
    <div>
        <apexchart 
            type="pie" 
            height="350" 
            :options="options" 
            :series="series" 
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: {
                chart: {
                    type: 'pie'
                },
                labels: ['Online', 'In-Store', 'Wholesale'],
                legend: {
                    position: 'bottom'
                },
                colors: ['#347571', '#533f41', '#344c5b']
            },
            series: [177, 115, 100] 
        }
    }
}
</script>