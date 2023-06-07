<template>
    <component :is="component === 'image' ? 'VImage' : component === 'video' ? 'VVideo' : ''" v-bind="props" />
</template>
<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { VVideoProp } from '~/components/molecules/VVideo.vue'
import { isImage } from '~/utils/prismic/media'
import { PrismicMedia } from '~/types/prismic/app-prismic'

export default Vue.extend({
    name: 'VMedia',
    props: {
        document: Object as PropType<PrismicMedia>,
        video: Object as PropType<Omit<VVideoProp, 'prismicMedia'>>,
    },
    computed: {
        component(): 'image' | 'video' | undefined {
            if (!this.document) return
            return isImage(this.document) ? 'image' : 'video'
        },
        props(): Record<string, any> | undefined {
            if (this.component === 'image') {
                return { prismicImage: this.document }
            } else if (this.component === 'video') {
                return { prismicMedia: this.document, ...this.video }
            } else {
                return undefined
            }
        },
    },
})
</script>
