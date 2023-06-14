<template>
    <div v-if="project" :class="$style.root" class="container-fullscreen">
        <div :class="$style.head">
            <div v-if="project.title" class="text-h2" :class="$style.title">{{ project.title }}</div>
            <v-text
                v-if="project.description"
                :content="project.description"
                :class="$style.description"
                class="text-body-s"
            />
            <div v-if="tags.length" :class="$style.tags">
                <v-button
                    v-for="(tag, i) in tags"
                    :key="tag + '-' + i"
                    :to="getProjectListingUrlByTag(tag)"
                    :label="tag"
                    outlined
                    filled
                    size="m"
                />
            </div>
        </div>
        <div :class="$style['media-wrapper']">
            <v-image v-if="project.thumbnail" :prismic-image="project.thumbnail" :class="$style.image" />
        </div>
        <v-text
            v-if="project.long_description"
            :content="project.long_description"
            :class="$style['description-full']"
            class="text-body-s"
        />
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PageDataProvider from '~/mixins/PageDataProvider'
import { ProjectDocumentData } from '~/types/prismic/app-prismic'
import { getProjectTags } from '~/utils/project/tag'
import DocumentUid from '~/constants/document-uid'
import { QUERY_TAG } from '~/components/organisms/VProjectListing.vue'

export default mixins(PageDataProvider).extend({
    name: 'VHeaderProject',
    computed: {
        project(): ProjectDocumentData {
            return this.pageData as ProjectDocumentData
        },
        tags(): string[] {
            return getProjectTags(this.project)
        },
    },
    methods: {
        getProjectListingUrlByTag(tag: string): string {
            return (this.$i18n.locale === 'en' ? '/en' : '') + `/${DocumentUid.PROJECT_LISTING}?${QUERY_TAG}=${tag}`
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    overflow: auto;
    padding-bottom: rem(102);
    margin-top: $v-top-bar-height * -1;
    background-color: color(black);
    color: color(white);
}

.head {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: rem(12);
    margin-block: $v-top-bar-height + rem(100) rem(22);
}

.title {
    margin-right: rem(30);
}

.description {
    flex-basis: clamp(#{rem(330), 40%, rem(500)});
    margin-top: rem(5);
    opacity: 0.7;
}

.tags {
    display: flex;
    flex-basis: 100%;
    gap: rem(14);
}

.media-wrapper {
    display: flex;
    overflow: hidden;
    width: 100%;
    max-height: rem(700);
    align-items: center;
    border-radius: rem(30);
}

.image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.description-full {
    display: inline-block;
    width: clamp(rem(300), 50%, rem(600));
    padding-top: rem(22);
    border-top: 1px solid rgba(color(white), 0.6);
    margin-top: rem(45);
    opacity: 0.7;
}
</style>
