<template>
    <div :class="rootClass">
        <div :class="$style.center" class="text-h1">{{siteName}}</div>
        <div>{{ counterOutput }}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { SplashScreenState } from '~/components/organisms/VSplashScreenWrapper/VSplashScreenWrapper.vue'

export type AnimationState = 'pending' | 'entering' | 'afterEnter' | 'afterLeave'

const INIT_VALUE = 0
const LAST_VALUE = 100
const DURATION = 5000

export default Vue.extend({
    name: 'VSplashScreen',
    props: {
        value: String as PropType<SplashScreenState>,
    },
    data() {
        return {
            counterOutput: 0,
            startTime: null as null | number,
            animationState: 'pending' as AnimationState,
        }
    },
    mounted() {
        this.startCounter();
    },
    computed: {
        rootClass(): (string | undefined | false)[] {
            return [
                this.$style.root,
                this.animationState === 'entering' && this.$style['root--enter-animation'],
                (this.animationState === 'afterEnter' || this.animationState === 'afterLeave') &&
                    this.$style['root--leave-animation'],
            ]
        },
        siteName(): string {
            return this.$store.state.settings?.data?.site_name || this.$config.appName
        },
    },
    watch: {
        value(splashState: SplashScreenState) {
            if (splashState === 'beforeEnter') this.onEnter()
        },
    },
    methods: {
        startCounter() {
            this.startTime = null;
            let currentTime = Date.now();

            this.step(currentTime)

            window.requestAnimationFrame((currentTime) => this.step(currentTime));
        },
        step(currentTime: number) {
            if (!this.startTime) {
                this.startTime = currentTime;
            }

            const progress = Math.min((currentTime  - this.startTime) / DURATION, 1);

            this.counterOutput = Math.floor(progress * (LAST_VALUE - INIT_VALUE) + INIT_VALUE);

            if (progress < 1) window.requestAnimationFrame(this.step);
            else window.cancelAnimationFrame(window.requestAnimationFrame(this.step));
        },
        onTransitionEnd(state: AnimationState) {
            if (state === 'afterEnter') this.onLeaveFinish()
            else if (state === 'entering') this.onEnterFinish()
        },
        onEnter() {
            this.animationState = 'entering'
        },
        onEnterFinish() {
            this.animationState = 'afterEnter'
        },
        onLeaveFinish() {
            this.$emit('input', 'beforeLeaved')
            this.animationState = 'afterLeave'
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
    background-color: var(--color-main);

    &::after {
        position: absolute;
        background-color: var(--color-bg);
        border-radius: app(border-radius);
        content: '';
        inset: rem(10);
        transform: scale(1);
    }

    &--enter-animation::after {
        animation: enter 1.4s ease(in-back) forwards;
    }

    &--leave-animation::after {
        animation: leave 1.2s ease(in-back) backwards;
    }
}

@keyframes enter {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(0.985);
    }
}

@keyframes leave {
    from {
        transform: scale(0.985);
    }
    to {
        transform: scale(1.15);
    }
}

.center {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.title {
    margin-bottom: 40px;
    color: var(--color-main);
    text-align: center;
}
</style>
