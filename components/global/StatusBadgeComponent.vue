<template>
    <div>
        <span
            v-if="status === 1" 
            class="badge text-bg-success"
        >
            Active
        </span>
        <span 
            v-else
            class="badge text-bg-danger"
        >
            Inactive
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