<template>
    <section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation" :class="$style.root">
        <div ref="line" :class="$style.line" :style="{ translate: posLeft + 'px 0' }">
            <v-image v-for="(media, i) in medias" ref="media" :key="i" :prismic-image="media" :class="$style.media" />
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType, VueConstructor } from 'vue'
import { FilledLinkToMediaField } from '@prismicio/types/src/value/linkToMedia'
import { PartnersBlockSlice } from '~~/prismicio-types'
import { isRelationMediaFulled } from '~/utils/prismic/relation-field'

interface Component extends Vue {
    observers: IntersectionObserver[]
}

export default (Vue as VueConstructor<Component>).extend({
    name: 'PartnersBlock',
    props: {
        slice: {
            type: Object as PropType<PartnersBlockSlice>,
            required: true,
        },
    },
    data() {
        return {
            posLeft: 0,
        }
    },
    computed: {
        medias(): FilledLinkToMediaField[] {
            const medias = this.slice.items
                .filter((item) => isRelationMediaFulled(item.media))
                .map((item) => item.media as FilledLinkToMediaField)
            medias.length = 4
            return medias
        },
    },
    created() {
        this.observers = []
    },
    mounted() {
        this.initObservers()
        this.startTranslate()
    },
    methods: {
        startTranslate() {
            window.setInterval(() => {
                this.posLeft += 2
            }, 24)
        },
        initObservers() {
            const medias = (this.$refs.media as Vue[]).map((vueInstance) => vueInstance.$el as HTMLElement)

            medias.forEach((media: HTMLElement) => {
                const observer = new IntersectionObserver(([entry]) => {
                    const mediaRect = entry.target.getBoundingClientRect()
                    if (mediaRect.left + mediaRect.width > window.innerWidth)
                        this.cloneElement(entry.target as HTMLElement)
                })
                observer.observe(media)
                this.observers.push(observer)
            })
        },
        cloneElement(element: HTMLElement) {
            const newElement = element.cloneNode(true)
            const line = this.$refs.line as HTMLElement
            element.remove()
            line.prepend(newElement)
        },
    },
})
</script>
<style lang="scss" module>
.root {
    @include margin-block;

    overflow-x: hidden;
}

.line {
    display: flex;
    gap: rem(20);
}

.media {
    --v-image-border-radius: #{rem(26)};

    width: rem(200);
    flex-shrink: 0;
    aspect-ratio: 100 / 75;
    background-color: lightgray;
}
</style>
