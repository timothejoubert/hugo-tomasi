<template>
    <section :class="rootClasses">
        <template v-if="isFullScreen">
            <v-media
                :image="{ sizes: 'fullScreen' }"
                :video="{ cover: true, controls: false }"
                :document="slice.primary.media"
                :class="$style.media"
            />
            <v-text :content="slice.primary.content" :class="$style.content" />
        </template>
        <template v-else-if="items.length">
            <div v-for="(item, i) in items" :key="i" :class="$style.item">
                <v-media
                    :video="{ cover: true, controls: showControls }"
                    :document="item.media"
                    :class="$style.media"
                    @video-state="onVideoStateUpdate"
                />
                <div v-if="item.content" :class="$style.content" class="text-body-s">{{ item.content }}</div>
            </div>
        </template>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { GalleryBlockSlice, GalleryBlockSliceDefaultItem } from '~~/prismicio-types'
import { isRelationMediaFulled } from '~/utils/prismic/relation-field'
import { VideoState } from '~/components/molecules/VVideo.vue'

export default Vue.extend({
    name: 'GalleryBlock',
    props: {
        slice: {
            type: Object as PropType<GalleryBlockSlice>,
            required: true,
        },
    },
    data() {
        return {
            showControls: false,
        }
    },
    computed: {
        rootClasses(): (undefined | false | string)[] {
            return [
                this.$style.root,
                this.isFullScreen ? this.$style['root--fullscreen'] : this.$style['root--container'],
                this.isSolo && this.$style['root--solo'],
            ]
        },
        items(): GalleryBlockSliceDefaultItem[] {
            return this.isFullScreen ? [] : this.slice.items.filter((item) => isRelationMediaFulled(item.media))
        },
        isFullScreen(): boolean {
            return this.slice.variation === 'fullScreen'
        },
        isSolo(): boolean {
            return this.items.length === 1
        },
    },
    methods: {
        onVideoStateUpdate(state: VideoState) {
            this.showControls = this.isSolo && state === 'played'
        },
    },
})
</script>

<style lang="scss" module>
.root {
    @include margin-block;

    position: relative;

    &--container {
        @include container;

        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: rem(30);

        @include media('>=md') {
            flex-wrap: nowrap;
        }
    }
}

.item {
    width: 100%;

    @include media('>=md') {
        width: 50%;

        .root--solo & {
            width: 80%;
        }
    }
}

.media {
    --v-image-overflow: hidden;

    .root--container & {
        --v-image-border-radius: #{rem(14)};

        aspect-ratio: 596 / 347;
    }

    .root--fullscreen & {
        width: 100%;
        min-height: rem(350);
        aspect-ratio: 860 / 320;
    }
}

.content {
    margin-top: rem(12);
    opacity: 0.8;

    .root--fullscreen & {
        @include property-fluid(
            width,
            (
                xs: 280,
                xl: 420,
            )
        );
        margin-top: rem(28);
        margin-left: $container-padding-inline;
    }
}
</style>
