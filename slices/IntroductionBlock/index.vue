<template>
    <section v-if="content" :class="[$style.root, isVisible && $style['root--visible']]" class="container">
        <div :class="$style.wrapper" class="text-h4">
            <component
                :is="item.type === 'text' ? 'span' : 'div'"
                v-for="(item, i) in content"
                :key="i"
                :class="[$style.item, item.type === 'text' ? $style['item--text'] : $style['item--media']]"
            >
                <template v-if="item.type === 'text'" preserveWhitespace="false">{{ item.content }}</template>
                <v-image
                    v-else-if="item.type === 'media'"
                    :prismic-image="item.type === 'text' ? undefined : item.media"
                    :class="$style.image"
                />
            </component>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { VueConstructor, PropType } from 'vue'
import type { ImageField } from '@prismicio/types'
import { RTTextNodeBase } from '@prismicio/types/src/value/richText'
import { FilledLinkToMediaField } from '@prismicio/types/src/value/linkToMedia'
import { IntroductionBlockSlice } from '~~/prismicio-types'
import { isRelationMediaFulled } from '~/utils/prismic/relation-field'

interface Item {
    type: 'text' | 'media'
    media?: ImageField | FilledLinkToMediaField
    content?: String
}

const MEDIA_INCLUDE_SYMBOL = '[]'

interface Component extends Vue {
    observer: null | IntersectionObserver
}

export default (Vue as VueConstructor<Component>).extend({
    name: 'IntroductionBlock',
    // props: getSliceComponentProps(['slice', 'index', 'slices', 'context']),
    props: {
        slice: {
            type: Object as PropType<IntroductionBlockSlice>,
            required: true,
        },
    },
    data() {
        return {
            isVisible: false,
        }
    },
    computed: {
        text(): string | undefined {
            return (this.slice.primary.content?.[0] as RTTextNodeBase)?.text
        },
        medias(): FilledLinkToMediaField[] {
            return this.slice.items
                .filter((item) => item?.media && isRelationMediaFulled(item.media))
                .map((item) => item.media as FilledLinkToMediaField)
        },
        content(): Item[] {
            if (!this.text) return []
            const result: Item[] = []

            const textList = this.text.split(MEDIA_INCLUDE_SYMBOL)

            textList.forEach((text: string, i: number) => {
                result.push({ type: 'text', content: text.trim() })
                if (this.medias?.[i]) result.push({ type: 'media', media: this.medias[i] })
            })

            return result
        },
    },
    mounted() {
        this.initIntersectionObserver()
    },
    beforeDestroy() {
        this.disposeIntersectionObserver()
    },
    methods: {
        initIntersectionObserver() {
            this.observer = new IntersectionObserver(
                ([entry]) => {
                    this.isVisible = entry.isIntersecting
                },
                {
                    rootMargin: '-40% 0% -40% 0%',
                }
            )
            this.observer.observe(this.$el)
        },
        disposeIntersectionObserver() {
            this.observer?.disconnect()
            this.observer = null
        },
    },
})
</script>
<style lang="scss" module>
.root {
    @include margin-block;
}

.wrapper {
    width: clamp(#{rem(200)}, 70%, #{rem(1000)});
    line-height: 1.1;
    margin-inline: auto;
    text-align: center;
}

.item {
    &--media {
        display: none;
    }

    @include media('>=md') {
        &--media {
            --v-image-border-radius: #{rem(6)};

            position: relative;
            top: rem(5);
            display: inline-flex;
            width: 0;
            height: 42px;
            align-items: center;
            justify-content: center;
            margin-inline: rem(4);
            transition: 0.6s ease(out-quad);
            transition-property: margin, width;
        }

        .root--visible &--media {
            width: rem(96);
            margin-inline: rem(11);
        }
    }
}

// set fluide image width to fit with font size fluid size
.image {
    position: absolute;
    width: 100%;
    height: calc(100% + #{rem(10)});
}
</style>
