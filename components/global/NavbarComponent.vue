<template>
    <br/>
    <div class="row mt-5">
        <div class="col-1">
        </div>
        <div class="col-4">
            <div class=ms-4>
                <NuxtLink 
                    to="/"
                    @click="$refs.TabsComponent.setActiveTab(tabs[0].name)"
                >
                    <img 
                        src="@/assets/logo/my-finanz.png" 
                        class="img-fluid"
                        style="width: 300px;"
                    >
                </NuxtLink>
            </div>
        </div>
        <div v-if="!isAuth" class="col-6 mt-4">
            <div class="d-flex justify-content-end">
                <TabsComponent
                    :tabs="tabs"
                    color="primary"
                    @selected="redirectToPage"
                    ref="TabsComponent"
                />
            </div>
        </div>
        <div v-else class="col-6 mt-4">
            <div class="d-flex justify-content-end">
                <TabsComponent
                    :tabs="loginTabs"
                    color="primary"
                    @selected="redirectToPage"
                    ref="TabsComponent"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import TabsComponent from '@/components/global/TabsComponent.vue';
    import { useAuthStore } from '@/stores/auth';
    
    export default {
        props: {
            isAuth: {
                type: Boolean,
                required: false,
                default: false,
            },
        },
        components: {
            TabsComponent
        },
        data() {
            return {
                loginTabs: [
                    { name: "/login", label: this.$t('navbar.login') },
                ],
            };
        },
        computed: {
            tabs() {
                const authStore = useAuthStore();
                const userName = authStore.user?.name || 'User';
                
                return [
                    { name: "/", label: this.$t('navbar.home') },
                    // { name: "budget", label: "Budget" },
                    // { name: "reports", label: "Reports" },
                    { name: "settings", label: this.$t('navbar.settings') },
                    { name: "/user", label: userName },
                    { name: "logout", label: this.$t('navbar.logout') },
                ];
            }
        },
        methods: {
            async redirectToPage(page) {
                if (page === 'logout') {
                    const authStore = useAuthStore();
                    await authStore.logout();
                    this.$router.push('/login');
                } else {
                    this.$router.push(page);
                }
            },
        }
    }
</script>