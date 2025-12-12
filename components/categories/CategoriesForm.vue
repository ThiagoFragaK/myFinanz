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
                    @blur="validateField('name')"
                    @input="validateField('name')"
                    ref="nameRef"
                >
                <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
            </div>
            <div class="col-4">
                <label>Description</label>
                <input 
                    type="text"
                    class="form-control" 
                    placeholder="Category description"
                    v-model="category.description"
                    @blur="validateField('description')"
                    @input="validateField('description')"
                    ref="descriptionRef"
                >
                <small v-if="errors.description" class="text-danger">{{ errors.description }}</small>
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
    import { Validation } from '@/helpers/Validation';
    import LoadingComponent from '@/components/global/LoadingComponent.vue';
    import { useCategoriesService } from '@/services/CategoriesService';
    
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
                errors: {},
                categoriesService: null
            };
        },
        methods: {
            async getCategoryById() {
                if(!this.isEdit) return;

                this.isLoading = true;
                try {
                    const response = await this.categoriesService.getCategoryById(this.id);
                    this.category = response.data;
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: 'Failed to load category',
                        icon: 'error'
                    });
                } finally {
                    this.isLoading = false;
                }
            },
            async validateField(field) {
                const value = this.category[field];
                const result = await Validation.validateField(field, value);

                this.errors[field] = result[field].message;
                return result[field].status;
            },
            async validateForm() {
                const result = await Validation.validateForm(this.category);
                this.errors = Object.fromEntries(
                    Object.entries(result.fields).map(([key, value]) => [key, value.message])
                );
                return result.valid;
            },
            async save() {
                const isValid = await this.validateForm();
                if (!isValid) {
                    return this.$notify({
                        title: "Validation error",
                        text: "One or more fields aren't valid, fix them and try again.",
                        icon: 'error'
                    });
                }

                if(this.isEdit) {
                    return this.editCategory();
                }
                this.createCategory();
            },        
            async createCategory() {
                try {
                    await this.categoriesService.createCategory(this.category);
                    this.$notify({
                        title: 'Success',
                        text: 'Category created successfully',
                        icon: 'success'
                    });
                    this.$emit("save");
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: 'Failed to create category',
                        icon: 'error'
                    });
                }
            },
            async editCategory() {
                try {
                    await this.categoriesService.updateCategory(this.id, this.category);
                    this.$notify({
                        title: 'Success',
                        text: 'Category edited successfully',
                        icon: 'success'
                    });
                    this.$emit("save");
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: 'Failed to update category',
                        icon: 'error'
                    });
                }
            },
        },
        computed: {
            title() {
                return this.isEdit ? "Edit Category" : "New Category";
            }
        },
        created() {
            this.categoriesService = useCategoriesService(this.$axios);
            this.getCategoryById();
        }
    };
</script>