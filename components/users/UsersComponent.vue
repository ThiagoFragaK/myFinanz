<template>
    <div class="container my-5">
        <div class="card border-success bg-transparent rounded-3">
            <div class="card-body">
                <div 
                    v-if="isAdmin"
                    class="row mb-4" 
                >
                    <div class="col-12 text-end">
                        <button 
                            class="btn btn-outlined-primary" 
                            @click="openCreateUserModal"
                        >
                            <Lucide icon="UserPlus" class="me-2" :size="18" />
                            {{ $t('user.create') }}
                        </button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-4">
                        <UpdatePasswordComponent />
                    </div>

                    <div class="col-md-6 mb-4">
                        <PreferencesComponent />
                    </div>
                </div>
            </div>
        </div>
        <CreateUserModal ref="createUserModal" />
    </div>
</template>

<script>
import UpdatePasswordComponent from '@/components/users/UpdatePasswordComponent.vue';
import PreferencesComponent from '@/components/users/PreferencesComponent.vue';
import CreateUserModal from '@/components/users/CreateUserModal.vue';
import { useAuthStore } from '@/stores/auth';
import { mapState } from 'pinia';
import Lucide from '@/components/icons/Lucide.vue';

export default {
    name: 'UsersComponent',
    components: {
        UpdatePasswordComponent,
        PreferencesComponent,
        CreateUserModal,
        Lucide
    },
    computed: {
        ...mapState(useAuthStore, ['user', 'isAdmin'])
    },
    methods: {
        openCreateUserModal() {
            this.$refs.createUserModal.open();
        },
    }
};
</script>

<style scoped>
    .btn-outlined-primary {
        color: var(--bs-primary);
        background-color: transparent;
    }

    .btn-outlined-primary:hover {
        background-color: var(--bs-primary);
        color: #fff;
    }
</style>