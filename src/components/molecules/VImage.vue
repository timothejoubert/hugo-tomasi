<script lang="ts">
import Vue from 'vue'
import type { PropType, VNode } from 'vue'
import type { ImageField } from '@prismicio/types'
import { isMediaFulled } from '~/utils/prismic/field-media'

const FALLBACK_ALT = 'Illustration de justine saez'

export default Vue.extend({
    name: 'VImage',
    props: {
        prismicImage: {
            type: Object as PropType<ImageField>,
        },
        nativeImg: Boolean,
        ratio: { type: [Boolean, Number], default: true },
        url: String,
        placeholder: { type: Boolean, default: true },
    },
    data() {
        return {
            loaded: false,
        }
    },
    render(createElement): VNode {
        const { prismicImage, nativeImg, url } = this.$props

        if (!isMediaFulled(prismicImage) && !url) return createElement('')
        console.log(prismicImage)

        const imgTag = nativeImg ? 'img' : 'nuxt-img'

        let width = 0
        if (prismicImage?.dimensions?.width) width = parseFloat(prismicImage.dimensions.width)

        let height = 0
        if (prismicImage?.dimensions?.height) height = parseFloat(prismicImage.dimensions.height)

        const attrs: Record<string, any> = {
            placeholder: '15',
            format: 'webp',
            provider: 'prismic',
            quality: '80',
            sizes: this.$attrs?.sizes || 'xs:60vw md:60vw lg:60vw vl:60vw xl:60vw xxl:60vw hd:60vw',
            src: nativeImg && url ? url : prismicImage?.url || '/images/fallback-img.jpg',
            copyright: prismicImage?.copyright,
            alt: prismicImage?.alt || FALLBACK_ALT,
            width: (!this.ratio && width) || '',
            height: (!this.ratio && height) || '',
        }

        const img = createElement(imgTag, {
            attrs,
            class: [this.$style.root, this.loaded && this.$style['root--loaded']],
            on: { load: () => (this.loaded = true) },
        })

        if (this.ratio) {
            const figureStyle: Record<string, string> = {}

            if (typeof this.ratio === 'number') {
                figureStyle.paddingBottom = this.ratio * 100 + '%'
            } else if (width && height) {
                figureStyle.paddingBottom = (height / width) * 100 + '%'
            }

            return createElement(
                'figure',
                {
                    style: figureStyle,
                    class: [
                        this.$style.root,
                        this.ratio && this.$style['root--ratio'],
                        this.loaded && this.$style['root--loaded'],
                    ],
                },
                [img]
            )
        }

        return img
    },
})
</script>

<style lang="scss" module>
.root {
    z-index: var(--v-image-z-index, 1); // create stacking context for preventing crop glitch on Safari
    display: var(--v-image-display, inline-block);
    background-color: var(--v-image-background-color);
    border-radius: var(--v-image-border-radius, 0);
    transition: var(--v-image-transition, none);

    &--ratio {
        position: relative;
        display: var(--v-image-display, block);
    }
}

.root img {
    display: block;
    width: var(--v-image-width, auto);
    max-width: var(--v-image-max-width, 100%);
    height: var(--v-image-height, auto);
    min-height: var(--v-image-min-height, initial);
    aspect-ratio: var(--v-image-aspect-ratio, initial);
    object-fit: var(--v-image-object-fit, initial);
    object-position: var(--v-image-object-position, initial);
}

.root--ratio img {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--v-image-width, 100%);
    height: var(--v-image-height, 100%);
    object-fit: var(--v-image-object-fit, cover);
}

.root--lazy img {
    opacity: 0;
    transition: var(--v-image-img-transition, all 0s), opacity 0.3s;
}

.root--loaded img {
    opacity: 1;
}

.copyright {
    --v-information-pill-background-volor: #{rgba(color(white), 0.5)};

    position: absolute;
    right: var(--v-image-copyright-right, rem(22));
    bottom: var(--v-image-copyright-bottom, rem(16));
}
</style>
