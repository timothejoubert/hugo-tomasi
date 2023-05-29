<template>
    <div :class="$style.root" class="container">
        <nuxt-link :to="homeLink">logo</nuxt-link>
        <v-nav :class="$style.nav" />
        <v-lang-switch />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'VTopBar',
    computed: {
        homeLink(): string {
            return this.$i18n.locale === 'en' ? '/en' : '/'
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: sticky;
    z-index: 101;
    top: 0;
    display: flex;
    height: $v-top-bar-height;
    align-items: center;
    color: color(white);
    mix-blend-mode: difference;
}
.nav {
    margin-right: rem(20);
    margin-left: auto;
}
</style>
