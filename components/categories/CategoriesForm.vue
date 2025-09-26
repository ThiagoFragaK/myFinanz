<template>
    <div>
        <div>
            <h1 class="ms-1 fs-5">
                {{ title }}
            </h1>
        </div>
        <div v-if="isLoading" class="row mb-4">
            <LoadingComponent />
        </div>
        <div v-else class="row mb-4">
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
                 <div class="input-group mb-3">
                    <span class="input-group-text">
                        <IconsLucide :icon="category.icon || 'TextCursor'" />
                    </span>
                    <input 
                        type="text"
                        class="form-control" 
                        placeholder="Category icon (Lucide)"
                        v-model="category.icon"
                    >
                </div>
            </div>
        </div>
        <button 
            type="button" 
            class="btn btn-primary btn-sm"
            :disabled="isLoading"
            @click="save"
        >
            Save
        </button>
    </div>
</template>
  
<script>
import LoadingComponent from '@/components/global/LoadingComponent.vue';
export default {
    components: {
        LoadingComponent,
    },
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
            isLoading: false,
            category: {
                name: '',
                description: '',
                icon: '',
            },
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

            this.isLoading = true;
            this.$axios.get(`categories/${this.id}`)
                .then(({ data }) => {
                    this.category = data.data;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        createCategory() {
            this.$axios.post(`categories`, this.category)
                .then(() => {
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
                .then(() => {
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