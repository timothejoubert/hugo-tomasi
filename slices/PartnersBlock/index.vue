<template>
    <section :class="$style.root">
        <v-marquee
            v-for="(medias, i) in mediaListLine"
            :key="i"
            :items="medias"
            :play="play"
            :direction="i % 2 ? -1 : 1"
            :class="$style.marquee"
        />
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType, VueConstructor } from 'vue'
import { FilledLinkToMediaField } from '@prismicio/types/src/value/linkToMedia'
import { PartnersBlockSlice } from '~~/prismicio-types'
import { isRelationMediaFulled } from '~/utils/prismic/relation-field'

interface Component extends Vue {
    intersectionObserver: IntersectionObserver | null
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
            play: false,
        }
    },
    computed: {
        mediaListLine(): FilledLinkToMediaField[][] {
            const lines = this.slice.primary.lines
            const medias = this.slice.items
                .filter((item) => isRelationMediaFulled(item.media))
                .map((item) => item.media as FilledLinkToMediaField)

            if (!lines || lines === 1) {
                return [medias]
            } else {
                const mediaLengthByLine = Math.ceil(medias.length / lines)
                return this.chunks<FilledLinkToMediaField>(medias, mediaLengthByLine)
            }
        },
    },
    mounted() {
        this.initIntersectionObserver()
    },
    beforeDestroy() {
        this.intersectionObserver?.disconnect()
        this.intersectionObserver = null
    },
    methods: {
        chunks<T>(array: T[], size: number): T[][] {
            const results = []
            while (array.length) {
                results.push(array.splice(0, size))
            }
            return results
        },
        initIntersectionObserver() {
            const options = { rootMargin: `100px 0px 100px 0px` }

            this.intersectionObserver = new IntersectionObserver(([entry]: IntersectionObserverEntry[]) => {
                this.play = entry.isIntersecting
            }, options)
            this.intersectionObserver.observe(this.$el)
        },
    },
})
</script>
<style lang="scss" module>
.root {
    @include margin-block;

    overflow-x: hidden;
}

.marquee {
    margin-block: rem(50);
}
</style>
