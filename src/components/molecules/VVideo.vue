<template>
    <div v-if="url" :class="rootClasses">
        <v-image v-if="placeholderMedia" :class="$style.placeholder" background :prismic-image="placeholderMedia" />
        <iframe
            v-if="embedUrl"
            :class="$style.iframe"
            width="auto"
            height="auto"
            frameborder="0"
            :src="url"
            allow="autoplay"
        ></iframe>
        <video v-else v-bind="props" ref="media" :class="$style.video" @click.prevent="onClick" @canplay="onVideoReady">
            <source :src="url" type="video/mp4" />
        </video>
        <v-button
            v-if="!background && !embedUrl"
            v-show="videoState !== 'played'"
            filled
            :class="$style.cta"
            @click.prevent="onClick"
        >
            <template #icon>
                <icon-play />
            </template>
        </v-button>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import IconPlay from '~/assets/images/icons/play.svg?sprite'
import { PrismicMedia } from '~/types/prismic/app-prismic'
import { isEmbedVimeo } from '~/utils/media'

// Embed url example:
// vimeo: https://player.vimeo.com/video/786243875?h=6ec269fa2b
// youtube: https://www.youtube.com/embed/-CEdFkz_BgQ?si=UoOAP_fRYOz4T0ne

export interface VVideoProps {
    prismicMedia: PrismicMedia
    autoplay?: boolean
    cover?: boolean
    controls?: boolean
    embedUrl?: string
    needInteraction?: boolean
    loop?: boolean
    background?: boolean
    muted?: boolean
    placeholder?: boolean
}

export type VideoState = 'pending' | 'ready' | 'played' | 'paused' | 'ended'

export default Vue.extend({
    name: 'VVideo',
    components: { IconPlay },
    props: {
        prismicMedia: Object as PropType<PrismicMedia>,
        autoplay: Boolean,
        embedUrl: String,
        cover: Boolean,
        muted: Boolean,
        loop: Boolean,
        controls: { type: Boolean, default: true },
        needInteraction: Boolean,
        background: Boolean,
        placeholder: Boolean,
    },
    data() {
        return {
            videoState: 'pending' as VideoState,
            mounted: false,
        }
    },
    computed: {
        rootClasses(): (undefined | false | string)[] {
            return [
                this.$style.root,
                this.mounted && this.$style['root--mounted'],
                this.embedUrl && this.$style['root--embed'],
                this.background && this.$style['root--background'],
                this.cover && this.$style['root--cover'],
            ]
        },
        placeholderMedia(): false | any {
            if (!this.placeholder || !this.prismicMedia) return false
            return this.prismicMedia
        },
        embedOptions(): string {
            const mutedValue = this.autoplay || this.muted || this.background ? 1 : 0
            const embedOptions = isEmbedVimeo(this.embedUrl) ? { muted: mutedValue } : { mute: mutedValue }

            const options = {
                rel: 0, // This shows only related videos from the same channel
                modestbranding: 1,
                showinfo: 0,
                autohide: 1,
                wmode: 'transparent',
                controls: this.controls && !this.background ? 1 : 0,
                autoplay: this.autoplay || this.background ? 1 : 0,
                loop: this.loop || this.background ? 1 : 0,
                playsinline: this.background ? 1 : 0,
                // autopause: 0,
                ...embedOptions,
            }
            return Object.entries(options)
                .map(([key, value]) => {
                    return `${key}=${value}`
                })
                .join('&')
        },
        url(): string | undefined | null {
            if (this.embedUrl) {
                return this.embedUrl + '?' + this.embedOptions
            } else {
                return (this.prismicMedia as { url?: string | null })?.url
            }
        },
        props(): Record<string, any> {
            const props: Record<string, any> = {}

            if (this.autoplay) {
                props.autoplay = true
                props.muted = true
                props.loop = true
                props.preload = 'auto'
            }

            if (this.cover) {
                props['data-object-fit'] = 'cover'
            }

            if (this.controls) {
                props.controls = true
            }
            return props
        },
    },
    mounted() {
        this.mounted = true
    },
    methods: {
        onClick() {
            if (this.videoState === 'played') this.pause()
            else this.play()
            this.$emit('video-state', this.videoState)
        },
        play() {
            ;(this.$refs.media as HTMLVideoElement).play()
            this.videoState = 'played'
        },
        pause() {
            ;(this.$refs.media as HTMLVideoElement).pause()
            this.videoState = 'paused'
        },
        onVideoReady() {
            this.videoState = 'ready'
        },
    },
})
</script>
<style lang="scss" module>
.root {
    position: relative;
    overflow: var(--v-image-overflow);
    border-radius: var(--v-image-border-radius);
    cursor: pointer;

    &--cover {
        width: 100%;
        height: auto;
    }

    &--background {
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
    }
}

.placeholder {
    pointer-events: none;
    transition: opacity 0.4s 1s ease(out-quad);

    .root--mounted & {
        opacity: 0;
    }
}

.video {
    .root--cover & {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.cta {
    position: absolute;
    right: rem(16);
    bottom: rem(16);
}

.iframe {
    width: 100%;
    height: 100%;

    .root--background & {
        position: absolute;
        height: 140% !important;
        object-fit: cover;
        pointer-events: none;
    }
}
</style>
