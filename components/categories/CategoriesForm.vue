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
                    placeholder="Category name"
                    v-model="category.name"
                >
            </div>
            <div class="col-4">
                <label>Description</label>
                <input 
                    type="text"
                    class="form-control" 
                    placeholder="Category description"
                    v-model="category.description"
                >
            </div>
            <div class="col-4">
                <label>Icon</label>
                <input 
                    type="text"
                    class="form-control" 
                    placeholder="Lucide icon name"
                    v-model="category.icon"
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
            category: {
                name: '',
                description: '',
                icon: '',
            }
        };
    },
    methods: {
        save() {
            if(this.isEdit) {
                return this.editCategory();
            }
            this.createCategory();
        },
        getCategoryById() {
            if(!this.isEdit) return;

            this.$axios.get(`categories/${this.id}`)
                .then(({ data }) => {
                    this.category = data.data;
                });
        },
        createCategory() {
            this.$axios.post(`categories`, this.category)
                .then((response) => {
                    console.log(response);
                    this.$notify({
                        title: 'Success',
                        text: 'Category created successfully',
                        icon: 'success'
                    });
                    this.$emit("save");
                });
        },
        editCategory() {
            this.$axios.put(`categories/${this.id}`, this.category)
                .then((response) => {
                    console.log(response);
                    this.$notify({
                        title: 'Success',
                        text: 'Category edited successfully',
                        icon: 'success'
                    });
                    this.$emit("save");
                });
        },
    },
    computed: {
        title() {
            return this.isEdit ? "Edit Category" : "New Category";
        }
    },
    created() {
        this.getCategoryById();
    }
};
</script>