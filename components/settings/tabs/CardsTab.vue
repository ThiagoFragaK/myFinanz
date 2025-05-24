<template>
    <button 
        type="button"
        title="Return"
        class="btn btn-info mb-4"
        @click="returnToTable"
        :disabled="showTable"
    >
        <IconsLucide icon="ChevronLeft" />
    </button>
    <button 
        type="button"
        title="New Card"
        class="btn btn-info ms-2 mb-4"
        @click="newCard"
        :disabled="disableBtns"
    >
        <IconsLucide icon="Plus" />
    </button>
    <button 
        type="button"
        title="Edit Card"
        class="btn btn-info ms-2 mb-4"
        @click="editCard"
        :disabled="hasntOnlyOneSelected"
    >
        <IconsLucide icon="Pencil" />
    </button>
    <button 
        type="button"
        title="Disable Income"
        class="btn btn-info ms-2 mb-4"
        :disabled="hasntOnlyOneSelected"
        @click="disableIncome"
    >
        <IconsLucide icon="CircleSlash" />
    </button>
    <button 
        type="button"
        title="Enable Income"
        class="btn btn-info ms-2 mb-4"
        :disabled="hasntOnlyOneSelected"
        @click="enableIncome"
    >
        <IconsLucide icon="CircleCheckBig" />
    </button>
    <CardsTable 
        v-if="showTable"
        @allowActions="updateSelection"
        ref="CardsTable"
    />
    <CardsForm 
        v-else
        :id="selectedCard.id"
        :isEdit="isEdit"
        @save="save"
        ref="CardsForm"
    />
</template>

<script>
    import CardsForm from "@/components/cards/CardsForm.vue";
    import CardsTable from "@/components/cards/CardsTable.vue";
    export default {
        components: {
            CardsForm,
            CardsTable,
        },
        data: () => ({
            selectedRows: [],
            showTable: true,
            isEdit: false,
        }),
        methods: {
            returnToTable() {
                this.selectedRows = [];
                this.showTable = true;
            },
            updateSelection(selectedRows) {
                this.selectedRows = selectedRows;
            },
            newCard() {
                this.showTable = this.isEdit = false;
            },
            editCard() {
                this.showTable = false;
                this.isEdit = true;
            },
            save() {
                this.returnToTable();
                this.$refs.CardsTable.getCards();
            },
            disableCard() {
                this.$axios.patch(`cards/${this.selectedCard.id}`)
                    .then(({ data }) => {
                        this.data = data;
                    })
                    .finally(() => {
                        this.$refs.IncomeTable.getIncomeSources();
                    });
            },
            enableCard() {
                this.$axios.patch(`cards/${this.selectedCard.id}`)
                    .then(({ data }) => {
                        this.data = data;
                    })
                    .finally(() => {
                        this.$refs.IncomeTable.getIncomeSources();
                    });
            },
        },
        computed: {
            disableBtns() {
                return !this.showTable;
            },
            hasntRowsSelected() {
                if(this.disableBtns) return true;
                return this.selectedRows.length === 0;
            },
            hasntOnlyOneSelected() {
                if(this.disableBtns) return true;
                return this.selectedRows.length !== 1;
            },
            selectedCard() {
                if(this.selectedRows.length === 0) {
                    return [];
                }
                return this.selectedRows[0];
            }
        },
    }
</script>