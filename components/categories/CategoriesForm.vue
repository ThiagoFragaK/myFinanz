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
                <label>{{ $t('common.name') }}</label>
                <input 
                    type="text"
                    class="form-control" 
                    :placeholder="$t('categories.form.name_placeholder')"
                    v-model="category.name"
                    @blur="validateField('name')"
                    @input="validateField('name')"
                    ref="nameRef"
                >
                <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
            </div>
            <div class="col-4">
                <label>{{ $t('common.description') }}</label>
                <input 
                    type="text"
                    class="form-control" 
                    :placeholder="$t('categories.form.description_placeholder')"
                    v-model="category.description"
                    @blur="validateField('description')"
                    @input="validateField('description')"
                    ref="descriptionRef"
                >
                <small v-if="errors.description" class="text-danger">{{ errors.description }}</small>
            </div>
            <div class="col-4">
                <label>{{ $t('common.icon') }}</label>
                 <div class="input-group mb-3">
                    <span class="input-group-text">
                        <IconsLucide :icon="category.icon || 'TextCursor'" />
                    </span>
                    <input 
                        type="text"
                        class="form-control" 
                        :placeholder="$t('categories.form.icon_placeholder')"
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
            {{ $t('common.save') }}
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
                        text: this.$t('categories.notifications.load_error'),
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
                        text: this.$t('login.notifications.validation_text'),
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
                        text: this.$t('categories.notifications.created'),
                        icon: 'success'
                    });
                    this.$emit("save");
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: this.$t('categories.notifications.create_error'),
                        icon: 'error'
                    });
                }
            },
            async editCategory() {
                try {
                    await this.categoriesService.updateCategory(this.id, this.category);
                    this.$notify({
                        title: 'Success',
                        text: this.$t('categories.notifications.updated'),
                        icon: 'success'
                    });
                    this.$emit("save");
                } catch (error) {
                    this.$notify({
                        title: 'Error',
                        text: this.$t('categories.notifications.update_error'),
                        icon: 'error'
                    });
                }
            },
        },
        computed: {
            title() {
                return this.isEdit ? this.$t('categories.edit_category') : this.$t('categories.new_category');
            }
        },
        created() {
            this.categoriesService = useCategoriesService(this.$axios);
            this.getCategoryById();
        }
    };
</script>