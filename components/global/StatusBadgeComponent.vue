<template>
    <div>
        <span
            v-if="status === 1" 
            class="badge text-bg-success"
        >
            <div class="text-light">Active</div>
        </span>
        <span 
            v-else
            class="badge text-bg-danger"
        >
            <div class="text-light">Inactive</div>
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            status: {
                type: Number,
                required: true
            },
        }
    }
</script>