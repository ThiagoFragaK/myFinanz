<template>
    <component :is="iconComponent" v-bind="$attrs" class="me-2" size="20" />
  </template>
  
<script>
    import * as LucideIcons from "lucide-vue-next";
    export default {
        props: {
            icon: {
                type: String,
                required: true
            }
        },
        computed: {
            iconComponent() {
                return LucideIcons[this.icon] || null;
            }
        }
    };
</script>
  