<template>
    <div :class="rootClass">
        <div :class="$style.content">
            <div class="text-h1">{{ siteName }}</div>
            <span class="text-h3">{{ counterOutput }}%</span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { SplashScreenState } from '~/components/organisms/VSplashScreenWrapper.vue'
import loading from '~/scss/export/_v-splash-screen.scss'

const START_VALUE = 0
const LAST_VALUE = 100

export default Vue.extend({
    name: 'VSplashScreen',
    props: {
        value: String as PropType<SplashScreenState>,
    },
    data() {
        return {
            counterOutput: 0,
        }
    },
    computed: {
        rootClass(): (string | undefined | false)[] {
            return [
                this.$style.root,
                this.value === 'beforeLeaved' && this.$style['root--before-leave'],
                this.value === 'leave' && this.$style['root--leave'],
            ]
        },
        siteName(): string {
            return this.$store.state.settings?.data?.site_name || this.$config.appName
        },
    },
    watch: {
        value(splashState: SplashScreenState) {
            if (splashState === 'beforeEnter') {
                this.startCounter()
                this.onBeforeLeaved()
            } else if (splashState === 'leave') {
                this.onLeaveDone()
            }
        },
    },
    methods: {
        startCounter() {
            let startTimestamp: null | number = null

            const increaseCounter = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp

                const progress = Math.min((timestamp - startTimestamp) / parseInt(loading['counter-duration']), 1)
                this.counterOutput = Math.floor(progress * (LAST_VALUE - START_VALUE) + START_VALUE)

                if (progress < 1) window.requestAnimationFrame(increaseCounter)
                else if (this.value === 'beforeLeaved') this.onCounterDone()
            }

            window.requestAnimationFrame(increaseCounter)
        },
        onCounterDone() {
            this.$emit('input', 'leave')
        },
        onBeforeLeaved() {
            const enterDelay = parseInt(loading['counter-duration']) - parseInt(loading['enter-duration']) - 450
            window.setTimeout(() => {
                this.$emit('input', 'beforeLeaved')
            }, enterDelay)
        },
        onLeaveDone() {
            window.setTimeout(() => {
                this.$emit('input', 'done')
            }, parseInt(loading['leave-duration']))
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: color(white);

    &::after {
        position: absolute;
        background-color: color(black);
        border-radius: rem(24);
        content: '';
        inset: rem(10);
        transform: scale(1);
    }

    &--before-leave::after {
        animation: enter unquote("#{map-get($loading, 'enter-duration')}ms") ease(in-back) forwards;
    }

    &--leave::after {
        animation: leave unquote("#{map-get($loading, 'leave-duration')}ms") ease(in-back) forwards;
    }
}

@keyframes enter {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(0.9);
    }
}

@keyframes leave {
    from {
        transform: scale(0.9);
    }
    to {
        transform: scale(1.1);
    }
}

.content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
