<template>
    <section v-if="project" class="container" :class="$style.root">
        <v-link :reference="project">
            <v-project-card :project="project.data" title-class="text-h4" />
        </v-link>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { FilledContentRelationshipField } from '@prismicio/types/src/value/contentRelationship'
import { ProjectPushBlockSlice } from '~~/prismicio-types'
import { ProjectDocument } from '~/types/prismic/prismic-types.generated'
import { isInternalRelationLinkWithUidFulled } from '~/utils/prismic/relation-field'

export default Vue.extend({
    name: 'ProjectPushBlock',
    props: {
        slice: {
            type: Object as PropType<ProjectPushBlockSlice>,
            required: true,
        },
    },
    computed: {
        project(): ProjectDocument | undefined {
            const relationProject = this.slice.primary.project
            const projectUid =
                isInternalRelationLinkWithUidFulled(relationProject) &&
                (relationProject as FilledContentRelationshipField<'project', string, unknown>).uid
            return this.$store.state.projects?.filter(
                (project: ProjectDocument) => projectUid && project.uid === projectUid
            )?.[0]
        },
    },
})
</script>
<style lang="scss" module>
.root {
    @include margin-block;
}
</style>
