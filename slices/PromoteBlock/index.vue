<template>
    <section :class="$style.root" class="container">
        <div v-if="slice.primary.title" class="text-over-title-m" :class="$style.title">{{ slice.primary.title }}</div>
        <v-promote v-for="(promote, i) in promoteList" :key="i" v-bind="promote" :class="$style.promote" />
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { PromoteBlockSlice, PromoteBlockSliceDefaultItem } from '~~/prismicio-types'

export default Vue.extend({
    name: 'GalleryBlock',
    props: {
        slice: {
            type: Object as PropType<PromoteBlockSlice>,
            required: true,
        },
    },
    computed: {
        promoteList(): PromoteBlockSliceDefaultItem[] {
            return this.slice.items
        },
    },
})
</script>
<style lang="scss" module>
.root {
    @include margin-block;
}

.title {
    margin-bottom: rem(32);
    text-transform: uppercase;
}

.promote {
    --v-promote-border: 1px solid #{rgba(color(black), 0.2)};

    &:last-child {
        border-bottom: 1px solid rgba(color(black), 0.2);
    }
}
</style>
