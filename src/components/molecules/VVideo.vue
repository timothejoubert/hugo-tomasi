<template>
    <div v-if="url" :class="rootClasses">
        <video v-bind="props" ref="media" :class="$style.video" @click.prevent="onClick" @canplay="onVideoReady">
            <source :src="url" type="video/mp4" />
        </video>
        <v-button v-show="videoState !== 'played'" filled :class="$style.cta" @click.prevent="onClick">
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

export interface VVideoProps {
    prismicMedia: PrismicMedia
    autoplay?: boolean
    cover?: boolean
    controls?: boolean
    needInteraction?: boolean
}

export type VideoState = 'pending' | 'ready' | 'played' | 'paused' | 'ended'

export default Vue.extend({
    name: 'VVideo',
    components: { IconPlay },
    props: {
        prismicMedia: Object as PropType<PrismicMedia>,
        autoplay: Boolean,
        cover: Boolean,
        controls: { type: Boolean, default: true },
        needInteraction: Boolean,
    },
    data() {
        return {
            videoState: 'pending' as VideoState,
        }
    },
    computed: {
        rootClasses(): (undefined | false | string)[] {
            return [this.$style.root, this.cover && this.$style['root--cover']]
        },
        url(): string | undefined | null {
            return (this.prismicMedia as { url?: string | null })?.url
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
</style>
