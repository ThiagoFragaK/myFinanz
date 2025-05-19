<template>
    <div>
        <div>
            <h1 class="ms-1 fs-5">
                {{ title }}
            </h1>
        </div>
        <div class="row mb-4">
            <div class="col-4">
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Expense name"
                    v-model="expense.name"
                >
            </div>
            <div class="col-4">
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Description"
                    v-model="expense.description"
                >
            </div>
            <div class="col-2">
                <input 
                    type="number" 
                    class="form-control" 
                    placeholder="Parcel number"
                    v-model="expense.parcel_numbers"
                >
            </div>
            <div class="col-2">
                <input 
                    type="number" 
                    class="form-control" 
                    placeholder="Expense value"
                    v-model="expense.value"
                >
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-4">
                <select 
                    class="form-select form-select mb-3" 
                    aria-label="Large select example"
                    v-model="expense.card_id"
                >
                    <option disabled selected value="">Select the card</option>
                    <option 
                        v-for="option in cardsList"
                        :key="option.id" 
                        :value="option.id"
                    >
                        {{ option.name }}
                    </option>
                </select>
            </div>
        </div>
        <button 
            type="button" 
            class="btn btn-secondary btn-sm"
            @click="save"
        >
            Save
        </button>
    </div>
</template>
  
<script>
    export default {
        props: {
            id: {
                type: Number,
                required: false,
            },
            isEdit: {
                type: Boolean,
                required: false,
            }
        },
        data() {
            return {
                cardsList: [],
                expense: {
                    name: "",
                    description: "",
                    card_id: "",
                    parcel_numbers: "",
                    value: 0,
                }
            };
        },
        methods: {
            getCards() {
                this.$axios.get(`cards`)
                    .then(({ data }) => {
                        this.cardsList = data.data;
                    });
            },
            save() {
                if(this.isEdit) {
                    return this.editExpense();
                }
                this.createExpense();
            },
            getExpenseById() {
                if(!this.isEdit) return;

                this.$axios.get(`expenses/${this.id}`)
                    .then(({ data }) => {
                        console.log(data)
                        this.expense = data.data;
                    });
            },
            createExpense() {
                this.$axios.post(`expenses`, this.expense)
                    .then((response) => {
                        console.log(response)
                    });
            },
            editExpense() {
                this.$axios.put(`expenses/${this.id}`, this.expense)
                    .then((response) => {
                        console.log(response)
                    });
            },
        },
        computed: {
            title() {
                return this.isEdit ? "Edit Expense" : "New Expense";
            },
        },
        created() {
            this.getCards();
            this.getExpenseById();
        }
    };
</script>  