<template>
    <div v-if="status" class="d-flex justify-content-center align-items-center">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>
  
<script>
    export default {
        name: "Loading Component",
        props: {
            status: {
                type: Boolean,
                required: true,
            },
        },
    };
</script>
  
<style scoped>
.d-flex {
min-height: 100px; /* Adjust height as needed */
}
</style>
  