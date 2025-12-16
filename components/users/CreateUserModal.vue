<template>
    <ModalComponent
        id="CreateUserModal"
        :isLoading="isLoading"
        :title="$t('user.create_modal.title')"
        :saveText="$t('user.create_modal.submit')"
        @save="onSubmit"
        ref="modal"
    >
        <template #header>
            <div class="modal-header bg-primary text-white">
                <IconsLucide icon="UserPlus" />
                <h5 class="modal-title ms-2"> {{ $t('user.create_modal.header') }} </h5>
                <button 
                    class="btn text-white ms-auto" 
                    data-bs-dismiss="modal" 
                    @click="close" 
                >
                    <IconsLucide icon="X" />
                </button>
            </div>
        </template>

        <template #body>
            <div class="modal-body">
                <p class="text-muted small mb-4">
                    {{ $t('user.create_modal.description') }}
                </p>
                <form @submit.prevent="onSubmit">
                    <div class="mb-3">
                        <label class="form-label small fw-semibold">{{ $t('user.create_modal.email') }}</label>
                        <div class="input-group">
                            <span class="input-group-text bg-white border-end-0">
                                <Lucide icon="Mail" :size="16" />
                            </span>
                            <input 
                                type="email" 
                                class="form-control border-start-0"
                                :class="{ 'is-invalid': errors.email }"
                                v-model="form.email"
                                @blur="validateField('email')"
                                @input="validateField('email')"
                                :placeholder="$t('login.email_placeholder')"
                            >
                            <div class="invalid-feedback">{{ errors.email }}</div>
                        </div>
                    </div>
                </form>
            </div>
        </template>
    </ModalComponent>
</template>

<script>
import Lucide from '@/components/icons/Lucide.vue';
import ModalComponent from '@/components/global/ModalComponent.vue';
import { useUserService } from '@/services/UserService';
import { Validation } from '@/helpers/Validation';

export default {
    name: 'CreateUserModal',
    components: {
        Lucide,
        ModalComponent
    },
    data() {
        return {
            form: {
                email: ''
            },
            errors: {},
            isLoading: false
        }
    },
    methods: {
        open() {
            this.form.email = '';
            this.errors = {};
            this.$refs.modal.open();
        },
        close() {
            this.$refs.modal.close();
        },
        async validateField(field) {
            const value = this.form[field];
            const result = await Validation.validateField(field, value);

            this.errors[field] = result[field].message;
            return result[field].status;
        },
        async validateForm() {
            const result = await Validation.validateForm(this.form);
            this.errors = Object.fromEntries(
                Object.entries(result.fields).map(([key, value]) => [key, value.message])
            );
            return result.valid;
        },
        async onSubmit() {
            const isValid = await this.validateForm();
            if (!isValid) return;

            this.isLoading = true;
            const { $axios } = useNuxtApp();
            const userService = useUserService($axios);

            try {
                const response = await userService.createUser(this.form.email);
                if (response.data.success) {
                  this.$notify({
                        title: this.$t('login.notifications.success'),
                        text: this.$t('user.create_modal.success'),
                        icon: 'success'
                   });
                   this.close();
                } else {
                    this.$notify({
                        title: this.$t('login.notifications.failed'),
                        text: response.data.message || this.$t('user.create_modal.failed'),
                        icon: 'error'
                    });
                }
            } catch (error) {
                this.$notify({
                    title: this.$t('login.notifications.failed'),
                    text: error.response?.data?.message || this.$t('login.notifications.failed'),
                    icon: 'error'
                });
            } finally {
                this.isLoading = false;
            }
        }
    }
}
</script>
