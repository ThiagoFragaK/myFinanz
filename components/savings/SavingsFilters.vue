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
            <div class="col-4">
                <input 
                    type="text"
                    class="form-control" 
                    placeholder="Category name"
                    v-model="filters.name"
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
                name: "",
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
                this.filters.name = "";
                this.filter();
            },
            filter() {
                this.$emit("filterData", this.filters)
            },
        }
    }
</script>
