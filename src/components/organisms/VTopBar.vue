<template>
    <div :class="$style.root" class="container">
        <nuxt-link :to="homeLink" :class="$style.home">
            <icon-logo :class="$style.logo" />
            <div :class="$style['logo-text']">{{ logoText }}</div>
        </nuxt-link>
        <v-nav :class="$style.nav" />
        <v-lang-switch />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IconLogo from '~/assets/images/logo.svg?sprite'

export default Vue.extend({
    name: 'VTopBar',
    components: { IconLogo },
    computed: {
        homeLink(): string {
            return this.$i18n.locale === 'en' ? '/en' : '/'
        },
        logoText(): string {
            return this.$store.state.settings?.data?.site_name || this.$config.appName
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

.home {
    display: flex;
    align-items: center;
    gap: rem(12);
}

.logo {
    width: rem(32);
    height: auto;
}

.logo-text {
    display: none;
}

.nav {
    margin-right: rem(20);
    margin-left: auto;
}
</style>
