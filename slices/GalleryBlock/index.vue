<template>
    <section :class="rootClasses" class="container">
        <div v-for="(item, i) in items" :key="i" :class="$style.item">
            <v-media :video="{ cover: true, controls: false }" :document="item.media" :class="$style.media" />
            <div v-if="item.content" :class="$style.content">{{ item.content }}</div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { GalleryBlockSlice, GalleryBlockSliceDefaultItem } from '~~/prismicio-types'
import { isRelationMediaFulled } from '~/utils/prismic/relation-field'

export default Vue.extend({
    name: 'GalleryBlock',
    props: {
        slice: {
            type: Object as PropType<GalleryBlockSlice>,
            required: true,
        },
    },
    computed: {
        rootClasses(): (undefined | false | string)[] {
            return [this.$style.root, this.isSolo && this.$style['root--solo']]
        },
        items(): GalleryBlockSliceDefaultItem[] {
            return this.slice.items.filter((item) => isRelationMediaFulled(item.media))
        },
        isSolo(): boolean {
            return this.items.length === 1
        },
    },
})
</script>

<style lang="scss" module>
.root {
    @include margin-block;

    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: rem(30);
}

.item {
    width: 45%;

    .root--solo & {
        width: 70%;
    }
}

.media {
    --v-image-border-radius: #{rem(14)};
    --v-image-overflow: hidden;

    aspect-ratio: 596 / 347;
}

.content {
    margin-top: rem(12);
}
</style>
