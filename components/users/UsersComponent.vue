<template>
    <div class="container my-5">
        <div class="card border-success bg-transparent rounded-3">
            <div class="card-body">
                <div class="row">
                    <!-- Update Password Section -->
                    <div class="col-md-6 mb-4">
                        <UpdatePasswordComponent />
                    </div>

                    <!-- Language and Currency Settings -->
                    <div class="col-md-6 mb-4">
                        <PreferencesComponent />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UpdatePasswordComponent from '@/components/users/UpdatePasswordComponent.vue';
import PreferencesComponent from '@/components/users/PreferencesComponent.vue';

export default {
    name: 'UsersComponent',
    components: {
        UpdatePasswordComponent,
        PreferencesComponent
    }
};
</script>
