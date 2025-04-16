<template>
    <div class="row">
        <div class="col-2"></div>
        <div class="col-2 mt-5">
            <div class="row mt-4">
                <button type="button" class="btn btn-primary">Salary</button>
            </div>
            <div class="row mt-4">
                <button type="button" class="btn btn-primary">Expenses</button>
            </div>
            <div class="row mt-4">
                <button type="button" class="btn btn-primary">Payments</button>
            </div>
            <div class="row mt-4">
                <button type="button" class="btn btn-primary">Reports</button>
            </div>
            <div class="row mt-4">
                <button type="button" class="btn btn-primary">Cards</button>
            </div>
            <div class="row mt-4">
                <button type="button" class="btn btn-primary">Configs</button>
            </div>
        </div>
        <div class="col-2"></div>
        <div class="col-5">
            <div class="row">
                <apexchart
                  type="line"
                  :options="barChartOptions"
                  :series="barSeries"
                  height="350"
                />
            </div>
            <div class="row">
                <apexchart 
                    type="pie" 
                    height="350" 
                    :options="pieChartOptions" 
                    :series="pieSeries" 
                />
            </div>
        </div>
    </div>
    <div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Bar Chart
            barChartOptions: {
                chart: {
                id: 'sales-bar',
                toolbar: { show: false }
                },
                xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr']
                },
                colors: ['#347571', '#533f41', '#344c5b']
            },
            barSeries: [
                { name: 'Online Sales', data: [90, 30, 65, 50] },
                { name: 'In-Store Sales', data: [30, 40, 15, 30] },
                { name: 'Wholesale', data: [30, 20, 15, 50] }
            ],

            // Pie Chart
            pieChartOptions: {
                chart: {
                type: 'pie'
                },
                labels: ['Online', 'In-Store', 'Wholesale'],
                legend: {
                position: 'bottom'
                },
                colors: ['#347571', '#533f41', '#344c5b']
            },
            pieSeries: [215, 115, 100] // Total of each category
        }
    }
}
</script>