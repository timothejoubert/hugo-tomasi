<template>
    <section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation" :class="$style.root">
        <v-projects-carousel :title="title" display-cta />
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { ProjectListingBlockSlice } from '~~/prismicio-types'

export default Vue.extend({
    name: 'ProjectListingBlock',
    props: {
        slice: {
            type: Object as PropType<ProjectListingBlockSlice>,
            required: true,
        },
    },
    computed: {
        title(): string | undefined {
            return typeof this.slice.primary?.title === 'string' ? this.slice.primary.title : undefined
        },
    },
})
</script>
<style lang="scss" module>
.root {
    @include margin-block;
}
</style>
