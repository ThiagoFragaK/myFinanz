<template>
    <CollapseComponent 
        :collapse-id="id"
        ref="CollapseComponent"
    >
        <div class="row">
            <div class="col-1">
                <button
                    v-tooltip="'Clean filters'"  
                    type="button" 
                    class="btn btn-secondary btn-sm mt-1 w-100"
                    @click="cleanFilters"
                >
                    <IconsLucide icon="X" color="White" />
                </button>
            </div>
            <div class="col-1">
                <button
                    v-tooltip="'Filter'" 
                    type="button" 
                    class="btn btn-primary btn-sm mt-1 w-100"
                    @click="filter"
                >
                    <IconsLucide icon="Forward" />
                </button>
            </div>
            <div class="col-10">
                <div class="row">
                    <div class="col-1">
                        <button
                            v-tooltip="monthFilterTitle"
                            type="button" 
                            class="btn btn-primary btn-sm mt-1 w-100"
                            @click="setCurrentMonth"
                        >
                            <IconsLucide v-if="filters.isCurrentMonth" icon="Calendar" />
                            <IconsLucide v-else icon="Calendar1" />
                        </button>
                    </div>
                    <div class="col">
                        <input 
                            type="text"
                            class="form-control"
                            placeholder="Name, description"
                            v-model="filters.name"
                        >
                    </div>
                    <div class="col">
                        <select 
                            class="form-select form-select" 
                            aria-label="Large select example"
                            v-model="filters.payment_methods_id"
                        >
                            <option disabled selected value="">Methods</option>
                            <option 
                                v-for="option in paymentMethodsList"
                                :key="option.id" 
                                :value="option.id"
                            >
                                {{ option.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col">
                        <select 
                            class="form-select form-select" 
                            aria-label="Large select example"
                            v-model="filters.category_id"
                        >
                            <option disabled selected value="">Categories</option>
                            <option 
                                v-for="option in categoriesList"
                                :key="option.id"
                                :value="option.id"
                            >
                                {{ option.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-2">
                        <div class="input-group">
                            <span class="input-group-text">
                                <IconsLucide icon="ArrowDownToDot" />
                            </span>
                            <input 
                                type="number" 
                                class="form-control" 
                                placeholder="Value min"
                                v-model="filters.values.min"
                            >
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="input-group">
                            <span class="input-group-text">
                                <IconsLucide icon="ArrowUpFromDot" />
                            </span>
                            <input 
                                type="number" 
                                class="form-control" 
                                placeholder="Value max"
                                v-model="filters.values.max"
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </CollapseComponent>
</template>

<script>
    import CollapseComponent from '@/components/global/CollapseComponent.vue';
    export default {
        name: "ExpensesFilters",
        props: { 
            id: { 
                type: String,
                required: true 
            } 
        },
        data: () => ({
            paymentMethodsList: [],
            categoriesList: [],
            filters: {
                isCurrentMonth: true,
                name: "",
                payment_methods_id: "",
                category_id: "",
                values: {
                    min: 0,
                    max: 0,
                }
            }
        }),
        components: { 
            CollapseComponent 
        },
        methods: {
            getCategoriesList() {
                this.$axios.get(`categories`)
                    .then(({ data }) => {
                        this.categoriesList = data.data;
                    });
            },
            getPaymentMethodsList() {
                this.$axios.get(`payment_methods`)
                    .then(({ data }) => {
                        this.paymentMethodsList = data.data;
                    });
            },
            open() { 
                this.$refs.CollapseComponent.open();
            },
            close() { 
                this.$refs.CollapseComponent.close();
            },
            toggle() { 
                this.$refs.CollapseComponent.toggle();
            },
            cleanFilters() {
                this.filters = {
                    isCurrentMonth: true,
                    name: "",
                    payment_methods_id: "",
                    category_id: "",
                    values: {
                        min: 0,
                        max: 0,
                    }
                };
                this.filter();
            },
            filter() {
                this.$emit("filterData", this.filters)
            },
            setCurrentMonth() {
                this.filters.isCurrentMonth = !this.filters.isCurrentMonth;
                this.filter();
            },
        },
        computed: {
            monthFilterTitle() {
                return this.filters.isCurrentMonth ? "Current month" : "All months";
            }
        },
        created() {
            this.getCategoriesList();
            this.getPaymentMethodsList();
        },
    }
</script>
