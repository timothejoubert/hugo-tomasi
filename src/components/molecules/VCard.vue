<template>
    <div :class="[$style.root, typeof layout === 'string' && $style[`root--layout-${layout}`]]">
        <div :class="$style.media">
            <v-pill v-if="date" :class="$style.date" :label="date" filled theme="light" size="xs" />
            <v-image v-if="image" :prismic-image="image" :class="$style.image" />
            <v-button filled :class="$style.cta">
                <template #icon>
                    <icon-arrow-up-right />
                </template>
            </v-button>
        </div>
        <div :class="$style.body">
            <div v-if="title" class="text-over-title-m">{{ title }}</div>
            <div v-if="tags.length" :class="$style.tags">
                <span v-for="tag in tags" :key="'tag-' + tag.label" class="text-body-s" :class="$style.tag">{{
                    tag.label
                }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import type { ImageField } from '@prismicio/types'
import IconArrowUpRight from '~/assets/images/icons/arrow-up-right.svg?sprite'

export type VCardLayout = 'centered' | null

export default Vue.extend({
    name: 'VCard',
    components: { IconArrowUpRight },
    props: {
        title: String,
        image: Object as PropType<ImageField>,
        tags: {
            type: Array as PropType<any[]>,
            default: () => [],
        },
        date: String,
        layout: String as PropType<VCardLayout>,
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}

.media {
    position: relative;
    overflow: hidden;
    border-radius: rem(22);

    &::after {
        position: absolute;
        background-image: linear-gradient(transparent, rgba(color(white), 0.1));
        content: '';
        inset: 0;
        pointer-events: none;
    }
}

.date {
    position: absolute;
    top: rem(12);
    left: rem(12);
}

.image {
    width: 100%;
    height: 100%;
    aspect-ratio: 600 / 390;
    object-fit: cover;
}

.cta {
    position: absolute;
    z-index: 1;
    right: rem(22);
    bottom: rem(22);
}

.body {
    margin-top: rem(11);

    .root--layout-centered & {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

.tags {
    margin-top: rem(4);
    opacity: 0.8;
}

.tag {
    position: relative;

    &:not(:last-child)::after {
        position: relative;
        content: '|';
        margin-inline: rem(6);
    }
}
</style>
