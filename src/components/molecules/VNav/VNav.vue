<template>
    <div :class="$style.root">
        <nuxt-link v-for="(item, i) in navItemList" :key="i" :to="item.link.uid" class="text-over-title-s">{{item.label}}</nuxt-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'VNav',
    computed: {
        navItemList() {
            return this.$store.state.mainMenu.data.links
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    display: flex;
    gap: rem(16);
    text-transform: uppercase;
}
</style>
