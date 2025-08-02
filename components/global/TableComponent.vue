<template>
    <table 
        class="table table-striped table-hover table-primary table-sm table-responsive rounded"
    >
        <thead>
            <tr>
                <th v-if="hasSelection">
                    <input
                        type="checkbox"
                        class="form-check-input"
                        :checked="allSelected"
                        @change="selectAllRow"
                    />
                </th>
                <th 
                    v-for="(column, index) in columns" 
                    :key="index" 
                >
                    {{ column.label || column }}
                </th>
            </tr>
        </thead>
        <tbody v-if="isLoading">
            <tr>
                <td 
                    :colspan="columns.length + (hasSelection ? 1 : 0)" 
                    class="text-center text-light bg-primary/5 py-4 italic"
                >
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
        <tbody v-else-if="data.length > 0">
            <tr
                v-for="(row, index) in data" 
                :key="index"
            >
                <td v-if="hasSelection">
                    <input
                        type="checkbox"
                        class="form-check-input"
                        :value="row"
                        :checked="isSelected(row)"
                        @change="selectRow(row)"
                    />
                </td>
                <td 
                    v-for="column in columns" 
                    :key="column.key"
                >
                    <slot 
                        :name="`cell-${column.key}`" 
                        :data="{ row, column }" 
                    >
                        {{ row[column.key] }}
                    </slot>
                </td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr>
                <td 
                    :colspan="columns.length + (hasSelection ? 1 : 0)" 
                    class="text-center text-primary bg-primary/5 py-4 italic"
                >
                    No data available.
                </td>
            </tr>
        </tbody>
    </table>
</template>
  
<script>
    export default {
        props: {
            data: {
                type: Array,
                required: true,
            },
            columns: {
                type: Array,
                required: true,
            },
            isLoading: {
                type: Boolean,
                default: true,
            },
            hasSelection: {
                type: Boolean,
                default: true,
            },
        },
        data() {
            return {
                selectedRows: [],
            };
        },
        methods: {
            selectAllRow() {
                if (this.allSelected) {
                    this.selectedRows = [];
                } else {
                    this.selectedRows = [...this.data];
                }
                this.$emit("selectedRows", this.selectedRows);
            },
            selectRow(row) {
                const index = this.selectedRows.indexOf(row);
                if (index === -1) {
                    this.selectedRows.push(row);
                } else {
                    this.selectedRows.splice(index, 1);
                }
                this.$emit("selectedRows", this.selectedRows);
            },
            isSelected(row) {
                return this.selectedRows.includes(row);
            },
            cleanSelection() {
                this.selectedRows = [];
            }
        },
        computed: {
            allSelected() {
                return this.data.length > 0 && this.selectedRows.length === this.data.length;
            },
        },
        mounted() {
            this.cleanSelection();
        },
    };
</script>
