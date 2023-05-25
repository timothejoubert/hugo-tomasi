<template>
    <div :class="$style.root">
        <nuxt-link :to="homeLink">logo</nuxt-link>
        <v-nav :class="$style.nav"/>
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
        }
    },
})
</script>

<style lang="scss" module>
.root {
    display: flex;
    align-items: center;
    padding: rem(24);
}
.nav {
    margin-right: rem(20);
    margin-left: auto;
}
</style>
