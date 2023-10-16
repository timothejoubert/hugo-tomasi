<template>
    <v-card v-bind="cardProps" />
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { ProjectDocumentData } from '~/types/prismic/app-prismic'
import type { VCardLayout } from '~/components/molecules/VCard.vue'
import { getProjectYear } from '~/utils/prismic/date'

export default Vue.extend({
    name: 'VProjectCard',
    props: {
        project: Object as PropType<ProjectDocumentData>,
        layout: String as PropType<VCardLayout>,
        titleClass: String,
        imageProps: Object as PropType<{ [key: string]: unknown }>,
    },
    computed: {
        cardProps(): Record<string, any> {
            const { thumbnail, title, tags, date, description } = this.project
            const sizes =
                this.layout === 'centered' && !this.imageProps?.sizes
                    ? 'xs:95vw sm:95vw md:45vw lg:45vw vl:45vw xl:45vw xxl:45vw hd:45vw'
                    : undefined
            return {
                image: thumbnail,
                title,
                titleClass: this.titleClass,
                description,
                tags,
                date: getProjectYear(date),
                layout: this.layout,
                imageProps: { sizes, ...this.imageProps },
            }
        },
    },
})
</script>
