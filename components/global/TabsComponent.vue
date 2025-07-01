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
                    :class="[
                        'text-' + color,
                        { active: activeTab === tab.name }
                    ]"
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
                v-if="activeTab"
                :id="activeTab"
                class="tab-pane fade show active"
                role="tabpanel"
                :aria-labelledby="`${activeTab}-tab`"
            >
                <slot :name="activeTab" />
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
        color: {
            type: String,
            default: "light",
            validator: (val) =>
                [
                    "primary",
                    "secondary",
                    "success",
                    "danger",
                    "warning",
                    "info",
                    "light",
                    "dark",
                ].includes(val),
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
            this.$emit("selected", tabName);
        },
    },
};
</script>

<style scoped>
.nav-link {
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
  background-color: currentColor;
  border-radius: 2px;
}

.nav-link:hover {
  filter: brightness(1.5);
}
.tab-pane {
  padding: 0;
  background-color: transparent;
  border-radius: 0;
}
</style>
