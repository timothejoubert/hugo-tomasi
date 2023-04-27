<template>
    <div :class="rootClass">
        <pre>{{ links }}</pre>
        <div v-for="(item, i) in links" :key="i">{{item.label}}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'VNav',
    computed: {
        rootClass(): (undefined | false | string)[] {
            return [this.$style.root]
        },
        links() {
            return this.$store.state.mainMenu.links
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
