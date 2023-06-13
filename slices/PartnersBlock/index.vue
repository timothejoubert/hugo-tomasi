<template>
    <section :class="$style.root">
        <v-marquee :items="medias" :play="play" :direction="1" :class="$style.marquee" />
        <v-marquee :items="medias" :play="play" :direction="-1" :class="$style.marquee" />
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
        medias(): FilledLinkToMediaField[] {
            const medias = this.slice.items
                .filter((item) => isRelationMediaFulled(item.media))
                .map((item) => item.media as FilledLinkToMediaField)
            medias.length = 3
            return medias
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
        initIntersectionObserver() {
            const options = { rootMargin: `-300px 0px -300px 0px` }

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
