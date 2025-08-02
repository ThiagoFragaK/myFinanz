<template>
    <div>
        <div>
            <h1 class="ms-1 fs-5">
                {{ title }}
            </h1>
        </div>
        <div class="row mb-4">
            <div class="col-4">
                <label>Name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Card name"
                    v-model="card.name"
                >
            </div>
            <div class="col-2">
                <label>Limit</label>
                <input 
                    type="number" 
                    class="form-control" 
                    placeholder="Card limit"
                    v-model="card.limit"
                >
            </div>
            <div class="col-2">
                <label>Turn day</label>
                <input 
                    type="number" 
                    class="form-control" 
                    placeholder="Card turn day"
                    v-model="card.turn_day"
                >
            </div>
        </div>
        <button 
            type="button" 
            class="btn btn-primary btn-sm"
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
                card: {
                    name: "",
                    turn_day: "",
                    limit: 0,
                }
            };
        },
        methods: {
            save() {
                if(this.isEdit) {
                    return this.editCard();
                }
                this.createCard();
            },
            getCardById() {
                if(!this.isEdit) return;

                this.$axios.get(`cards/${this.id}`)
                    .then(({ data }) => {
                        this.card = data.data;
                    });
            },
            createCard() {
                this.$axios.post(`cards`, this.card)
                    .then((response) => {
                        this.$notify({
                            title: 'Success',
                            text: 'Card created successfully',
                            icon: 'success'
                        });
                        this.$emit("save");
                    });
            },
            editCard() {
                this.$axios.put(`cards/${this.id}`, this.card)
                    .then((response) => {
                        this.$notify({
                            title: 'Success',
                            text: 'Card updated successfully',
                            icon: 'success'
                        });
                        this.$emit("save");
                    });
            },
        },
        computed: {
            title() {
                return this.isEdit ? "Edit Card" : "New Card";
            },
        },
        created() {
            this.getCardById();
        }
    };
</script>  