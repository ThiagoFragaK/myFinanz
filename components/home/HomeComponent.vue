<template>
    <div class="row">
        <div class="col-2"></div>
        <div class="col-2 mt-5">
            <div class="row mt-4">
                <div class="w-100">
                    <button 
                        type="button" 
                        class="btn btn-primary menu-btn"
                    >
                        <IconsLucide icon="BanknoteArrowUp" />
                        Salary
                    </button>
                </div>
            </div>
            <div class="row mt-4">
                <div class="w-100">
                    <button 
                        type="button" 
                        class="btn btn-primary menu-btn"
                    >
                        <IconsLucide icon="BanknoteArrowDown" />
                        Expenses
                    </button>
                </div>
            </div>
            <div class="row mt-4">
                <div class="w-100">
                    <button 
                        type="button" 
                        class="btn btn-primary menu-btn"
                    >
                        <IconsLucide icon="Receipt" />
                        Payments
                    </button>
                </div>
            </div>
            <div class="row mt-4">
                <div class="w-100">
                    <button 
                        type="button" 
                        class="btn btn-primary menu-btn"
                    >
                        <IconsLucide icon="PiggyBank" />
                        Savings
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="w-100 mt-4">
                    <NuxtLink to="/reports" class="d-block w-100">
                        <button 
                            type="button" 
                            class="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                        >
                            <IconsLucide icon="ChartColumn" />
                            Reports
                        </button>
                    </NuxtLink>
                </div>
                <div class="w-100 mt-4">
                    <NuxtLink to="/settings" class="d-block w-100">
                        <button 
                            type="button" 
                            class="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                        >
                            <IconsLucide icon="Settings2" />
                            Settings
                        </button>
                    </NuxtLink>
                </div>
            </div>
        </div>
        
        <div class="col-2"></div>
        <div class="col-5">
            <div class="row">
                <GraphsLines />
            </div>
            <div class="row">
                <GraphsPie />
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
        }
    }
}
</script>

<style>
.menu-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}
</style>