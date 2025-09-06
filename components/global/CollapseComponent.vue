<template>
    <div 
        class="collapse" 
        :id="collapseId" 
        ref="collapseEl"
    >
        <div class="card card-body border-success bg-transparent rounded-3">
            <slot />
        </div>
    </div>
</template>

<script>
    export default {
        name: "Collapse",
        props: {
            collapseId: { 
                type: String, 
                required: true 
            }
        },
        mounted() {
            if (process.client) {
                this.collapseInstance = new window.bootstrap.Collapse(this.$refs.collapseEl, {
                    toggle: false
                })
            }
        },
        beforeUnmount() {
            if (this.collapseInstance) {
                this.collapseInstance.dispose()
            }
        },
        methods: {
            open() {
                this.collapseInstance.show()
            },
            close() {
                this.collapseInstance.hide()
            },
            toggle() {
                this.collapseInstance.toggle()
            }
        }
    }
</script>