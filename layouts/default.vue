<template>
    <div>
        <NavbarComponent />
        <div class="mx-4 my-2">
            <div class="card-body">
                <NuxtPage />
            </div>
        </div>
    </div>
    <ChangePasswordModal ref="changePasswordModal" />
</template>

<script>
    import NavbarComponent from '@/components/global/NavbarComponent.vue';
    import ChangePasswordModal from '@/components/users/ChangePasswordModal.vue';
    import { useAuthStore } from '@/stores/auth';
    import { mapState } from 'pinia';

    export default {
        components: {
            NavbarComponent,
            ChangePasswordModal
        },
        computed: {
            ...mapState(useAuthStore, ['is_first_login']),
        },
        watch: {
            is_first_login: {
                handler(val) {
                    if (val) {
                        this.$nextTick(() => {
                            this.$refs.changePasswordModal.open();
                        });
                    }
                },
                immediate: true
            }
        }
    };
</script>