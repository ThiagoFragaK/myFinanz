<template>
    <div>
        <ul class="nav justify-content-center" role="tablist">
            <li
                v-for="(tab, index) in tabs"
                :key="index"
                class="nav-item"
                role="presentation"
            >
                <a
                    class="nav-link"
                    :class="{ active: activeTab === tab.name }"
                    :id="`${tab.name}-tab`"
                    :href="'#' + tab.name"
                    role="tab"
                    @click.prevent="setActiveTab(tab.name)"
                >
                    {{ tab.label }}
                </a>
            </li>
        </ul>
  
        <div class="tab-content mt-4">
            <div
                v-for="(tab, index) in tabs"
                :key="index"
                :id="tab.name"
                class="tab-pane fade"
                :class="{ 'show active': activeTab === tab.name }"
                role="tabpanel"
                :aria-labelledby="`${tab.name}-tab`"
            >
                <slot :name="tab.name" />
            </div>
        </div>
    </div>
</template>
  
<script>
    export default {
        name: "Tabs",
        props: {
            tabs: {
                type: Array,
                required: true,
                default: () => [],
            },
        },
        data() {
            return {
                activeTab: this.tabs[0]?.name || "",
            };
        },
        methods: {
            setActiveTab(tabName) {
                this.activeTab = tabName;
            },
        },
    };
</script>
  
<style scoped>
    .nav-link {
        color: white;
        cursor: pointer;
        border: none;
        position: relative;
        padding-bottom: 6px;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 3px;
        width: 100%;
        background-color: white;
        border-radius: 2px;
    }
    
    .nav-link:hover {
        color: #ffffffcc;
    }
    
    .tab-pane {
        padding: 0;
        background-color: transparent;
        border-radius: 0;
    }
</style>  