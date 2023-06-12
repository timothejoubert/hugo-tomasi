<template>
    <section v-if="content.length" :class="$style.root" class="container">
        <v-text :content="content" class="text-h3" :class="$style.content" />
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import type { RichTextField } from '@prismicio/types'
import { ExcerptBlockSlice } from '~~/prismicio-types'

export default Vue.extend({
    name: 'ExcerptBlock',
    props: {
        slice: {
            type: Object as PropType<ExcerptBlockSlice>,
            required: true,
        },
    },
    computed: {
        content(): RichTextField {
            return this.slice.primary.content
        },
    },
})
</script>

<style lang="scss" module>
.root {
    @include margin-block;
}

.content {
    text-transform: uppercase;
    width: fluid(
        (
            xs: 320px,
            xl: 1200px,
        )
    );
}
</style>
