<template>
    <section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation" :class="$style.root">
        <v-marquee :items="medias" :direction="-1" />
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { FilledLinkToMediaField } from '@prismicio/types/src/value/linkToMedia'
import { PartnersBlockSlice } from '~~/prismicio-types'
import { isRelationMediaFulled } from '~/utils/prismic/relation-field'

export default Vue.extend({
    name: 'PartnersBlock',
    props: {
        slice: {
            type: Object as PropType<PartnersBlockSlice>,
            required: true,
        },
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
})
</script>
<style lang="scss" module>
.root {
    @include margin-block;

    overflow-x: hidden;
}
</style>
