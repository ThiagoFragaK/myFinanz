<template>
    <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container-fluid d-flex justify-content-between align-items-center position-relative">        
            <div style="width: 45px;"></div>    
            <NuxtLink 
                to="/" 
                class="navbar-brand mx-auto position-absolute start-50 translate-middle-x"
            >
                <img 
                    src="@/assets/MyFinanz-Logo.png" 
                    class="img-fluid" 
                    alt="MyFinanz Logo" 
                    style="height: 45px;"
                >
            </NuxtLink>
        </div>
    </nav>
</template> 

<script>
    import { Menu } from 'lucide-vue-next';
    export default {
        components: {
            Menu,
        },
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>