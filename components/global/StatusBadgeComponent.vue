<template>
    <div>
        <span
            v-if="status === 1" 
            class="badge text-bg-success"
        >
            <div class="text-light">{{ $t('common.status_active') }}</div>
        </span>
        <span 
            v-else
            class="badge text-bg-danger"
        >
            <div class="text-light">{{ $t('common.status_inactive') }}</div>
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