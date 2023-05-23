<template>
    <div :class="[$style.root, (isSplashScreenDone || !displaySplashScreen) && $style['root--ready']]">
        <v-splash-screen-wrapper v-if="displaySplashScreen" />
        <v-top-bar />
        <Nuxt />

        <!-- eslint-disable-next-line vue/no-v-html -->
        <script type="application/ld+json" v-html="websiteInfos"></script>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import Resize from '~/mixins/Resize'
import MutationType from '~/constants/mutation-type'
import toBoolean from '~/utils/to-boolean'
import GeneralsConst from '~/constants/app'

export default mixins(Resize).extend({
    name: 'default',
    mounted() {
        this.$store.commit(
            MutationType.PREFERS_REDUCED_MOTION,
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        )
    },
    computed: {
        displaySplashScreen(): boolean {
            return toBoolean(GeneralsConst.DISPLAY_SPLASH_SCREEN_ONCE)
        },
        isSplashScreenDone(): boolean {
            return this.$store.state.splashScreenDone
        },
        websiteInfos(): Record<string, unknown> {
            return {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: this.$config.appName,
                alternateName: this.$config.appName.replace(/\s/g, ''),
                url: this.$config.appUrl,
            }
        },
    },
})
</script>
<style lang="scss" module>
.root {
    position: relative;
}
</style>
