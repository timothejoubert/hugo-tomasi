<template>
    <iframe width="auto" height="auto" frameborder="0" :src="src" :class="rootClasses" allow="autoplay"></iframe>
</template>

<script lang="ts">
import Vue from 'vue'
import { isEmbedVimeo } from '~/utils/media'
// example
// vimeo: https://player.vimeo.com/video/786243875?h=6ec269fa2b
// youtube: https://www.youtube.com/embed/-CEdFkz_BgQ?si=UoOAP_fRYOz4T0ne

export default Vue.extend({
    name: 'VEmbedVideo',
    props: {
        url: String,
        controls: { type: Boolean, default: true },
        autoplay: Boolean,
        muted: Boolean,
        loop: Boolean,
        background: Boolean,
    },
    computed: {
        rootClasses(): (string | undefined | false)[] {
            return [this.$style.root, this.background && this.$style['root--background']]
        },
        options(): Record<string, any> {
            const mutedValue = this.autoplay || this.muted || this.background ? 1 : 0
            const embedOptions = isEmbedVimeo(this.url) ? { muted: mutedValue } : { mute: mutedValue }

            return {
                rel: 0, // This shows only related videos from the same channel
                modestbranding: 1,
                showinfo: 0,
                autohide: 1,
                wmode: 'transparent',
                controls: this.controls && !this.background ? 1 : 0,
                autoplay: this.autoplay || this.background ? 1 : 0,
                loop: this.loop || this.background ? 1 : 0,
                playsinline: this.background ? 1 : 0,
                autopause: 0,
                ...embedOptions,
            }
        },
        src(): string {
            const parsedOptions = Object.entries(this.options)
                .map(([key, value]) => {
                    return `${key}=${value}`
                })
                .join('&')
            return this.url + '?' + parsedOptions
        },
    },
    mounted() {
        // ;(this.$el as HTMLIFrameElement).addEventListener('load', this.onIframeLoaded)
    },
    methods: {
        onIframeLoaded() {
            const video = (this.$el as HTMLIFrameElement).contentWindow?.document?.querySelector(
                'video'
            ) as HTMLVideoElement
            video?.addEventListener('play', this.onVideoPlayed)
        },
        onVideoPlayed() {
            console.log('video played')
        },
    },
})
</script>

<style lang="scss" module>
.root {
    &--background {
        position: absolute;
        width: 100%;
        height: 140% !important;
        object-fit: cover;
        pointer-events: none;
    }
}
</style>
