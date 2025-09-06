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
            <div class="col-3">
                <input
                    v-tooltip="'Min date'" 
                    type="date" 
                    class="form-control" 
                    placeholder="Min date"
                    v-model="filters.date.min"
                >
            </div>       
            <div class="col-3">
                <input
                    v-tooltip="'Max date'" 
                    type="date" 
                    class="form-control" 
                    placeholder="Max date"
                    v-model="filters.date.max"
                >
            </div>         
            <div class="col-2">
                <input 
                    type="text"
                    class="form-control" 
                    placeholder="Min value"
                    v-model="filters.value.min"
                >
            </div>          
            <div class="col-2">
                <input 
                    type="text"
                    class="form-control" 
                    placeholder="Max value"
                    v-model="filters.value.max"
                >
            </div>          
        </div>
    </CollapseComponent>
</template>

<script>
    import CollapseComponent from '@/components/global/CollapseComponent.vue';
    export default {
        name: "CategoriesFilters",
        props: { 
            id: { 
                type: String, 
                required: true 
            } 
        },
        data: () => ({
            filters: {
                value: {
                    min: null,
                    max: null,
                },
                date: {
                    min: "",
                    max: "",
                },
            }
        }),
        components: { 
            CollapseComponent 
        },
        methods: {
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
                    value: {
                        min: null,
                        max: null,
                    },
                    date: {
                        min: null,
                        max: null,
                    },
                };
                this.filter();
            },
            filter() {
                this.$emit("filterData", this.filters)
            },
        }
    }
</script>
