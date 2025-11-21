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
                tabs: [
                    { name: "/", label: "Home" },
                    // { name: "budget", label: "Budget" },
                    // { name: "reports", label: "Reports" },
                    { name: "settings", label: "Settings" },
                    { name: "logout", label: "Logout" },
                ],
                loginTabs: [
                    { name: "/login", label: "Login" },
                ],
            };
        },
        methods: {
            redirectToPage(page) {
                this.$router.push(page);
            },
        }
    }
</script>