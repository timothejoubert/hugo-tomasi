<template>
    <div :class="[$style.root, (isSplashScreenDone || !displaySplashScreen) && $style['root--ready']]">
        <v-top-bar />
        <v-splash-screen-wrapper v-if="displaySplashScreen" />
        <Nuxt />
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
    },
})
</script>
<style lang="scss" module>
.root {
    position: relative;
}
</style>
