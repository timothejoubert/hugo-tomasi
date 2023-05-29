<template>
    <v-card v-bind="cardProps" />
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { ProjectDocumentData } from '~/types/prismic/app-prismic'
import { VCardLayout } from '~/components/molecules/VCard.vue'

function getProjectYear(date: string | null) {
    // prismic data => 'YYYY-MM-DD
    return date?.split('-')?.[0]
}

export default Vue.extend({
    name: 'VProjectCard',
    props: {
        project: Object as PropType<ProjectDocumentData>,
        layout: String as PropType<VCardLayout>,
    },
    computed: {
        cardProps(): Record<string, any> {
            const { thumbnail, title, tags, date } = this.project
            return {
                image: thumbnail,
                title,
                tags,
                date: getProjectYear(date),
                layout: this.layout,
            }
        },
    },
})
</script>
