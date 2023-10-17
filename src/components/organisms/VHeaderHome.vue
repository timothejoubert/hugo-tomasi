<template>
    <header :class="$style.root" class="container-fullscreen">
        <VVideo embed="https://www.youtube.com/embed/tgbNymZ7vqY" />
        <transition name="slide-in">
            <div v-if="pageData.title && isSplashScreenDone" class="text-h1">{{ pageData.title }}</div>
        </transition>
        <transition name="slide-in-d-3">
            <v-text
                v-if="pageData.tagline && isSplashScreenDone"
                :content="pageData.tagline"
                :class="$style.tagline"
                class="text-h5"
            />
        </transition>
        <div v-if="videoUrl" :class="$style['background']">
            <video
                ref="video"
                preload="auto"
                autoplay
                playsinline
                loop
                muted
                data-object-fit="cover"
                data-wf-ignore="true"
                :class="$style.media"
            >
                <source :src="videoUrl" type="video/mp4" />
            </video>
        </div>

        <div :class="$style.body">
            <div :class="$style['body__head']" class="v-header-home-head-bottom">
                <span v-if="pageData.over_title" :class="$style['over-title']" class="text-over-title-s">
                    {{ pageData.over_title }}
                </span>
                <div :class="$style['video-cta']" @click="setVideoFullscreen">
                    <v-split-word
                        class="text-body-xs"
                        :class="$style['video-cta__label']"
                        :play-animation="isCtaHovered"
                        :word="$t('showreal.cta_label').toString()"
                        @mouseenter.native="isCtaHovered = true"
                        @mouseleave.native="isCtaHovered = false"
                    />
                    <v-button
                        v-if="videoUrl"
                        filled
                        theme="light"
                        @mouseenter.native="isCtaHovered = true"
                        @mouseleave.native="isCtaHovered = false"
                    >
                        <template #icon>
                            <icon-fullscreen />
                        </template>
                    </v-button>
                </div>
            </div>
            <div :class="$style.bottom">
                <v-text
                    v-if="pageData.description"
                    :content="pageData.description"
                    :class="$style.description"
                    class="text-body-s"
                />
                <v-text
                    v-if="pageData.excerpt"
                    :content="pageData.excerpt"
                    :class="$style.excerpt"
                    class="text-body-s"
                />
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { HomeDocumentData } from '~/types/prismic/app-prismic'
import IconFullscreen from '~/assets/images/icons/fullscreen.svg?sprite'

export default Vue.extend({
    name: 'VHeaderHome',
    components: { IconFullscreen },
    props: {
        pageData: Object as PropType<HomeDocumentData>,
    },
    data() {
        return {
            isCtaHovered: false,
            isVideoFullscreen: false,
        }
    },
    computed: {
        videoUrl(): string | undefined {
            return (this.pageData?.header_media as { url?: string })?.url
        },
        isSplashScreenDone(): boolean {
            return this.$store.state.splashScreenDone
        },
    },
    methods: {
        async setVideoFullscreen() {
            const video = this.$refs?.video as HTMLVideoElement | undefined
            if (!video || (video && !document.fullscreenEnabled)) return

            await video.requestFullscreen()
            this.isVideoFullscreen = true
            video.currentTime = 0
            video.muted = false
            video.volume = 0.5

            // listener load callback immediately when fullscreen is launch
            window.setTimeout(() => {
                video.addEventListener('fullscreenchange', this.onFullscreenChange)
            }, 200)
        },
        onFullscreenChange() {
            if (this.isVideoFullscreen) this.onLeaveFullscreen()
        },
        onLeaveFullscreen() {
            const video = this.$refs?.video as HTMLVideoElement | undefined
            if (!video) return

            video.muted = true
            this.isVideoFullscreen = false

            video.removeEventListener('fullscreenchange', this.onFullscreenChange)
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    padding-top: $v-top-bar-height;
    margin-top: $v-top-bar-height * -1;
    background-color: color(black);
    color: color(white);
    isolation: isolate;
}

.tagline {
    max-width: max(31%, rem(330));
    margin-top: rem(18);
}

.background {
    position: absolute;
    z-index: -1;
    top: 0;
    inset: 0;

    &::after {
        position: absolute;
        background-color: rgba(color(black), 0.8);
        content: '';
        inset: 0;
    }
}
.media {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.body {
    margin-top: auto;
    margin-bottom: rem(36);

    @include media('<md') {
        padding-top: rem(200);
    }
}

.body__head {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding-bottom: rem(16);
    margin-bottom: rem(16);

    &::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 1px;
        background-color: rgba(color(white), 0.3);
        content: '';
    }
}

.video-cta {
    display: none;

    @include media('>=lg') {
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        cursor: pointer;
        gap: rem(10);
        translate: 0 -50%;
    }
}

.video-cta__label {
    --split-word-duration: 300ms;

    position: absolute;
    opacity: 0;
    transition: opacity 0.3s;
    translate: calc((100% + 10px) * -1) 0;

    .video-cta:hover & {
        opacity: 1;
    }
}

.bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: rem(20) rem(30);
}

.excerpt,
.description {
    width: min(100%, rem(420));

    & *:not(strong) {
        opacity: 0.7;
    }
}
</style>
