<template>
    <nav :class="$style.root">
        <nuxt-link
            v-for="(item, i) in navItemList"
            :key="i"
            :to="parseLinkUrl(item.link.uid)"
            class="text-over-title-s"
            :class="[$style.item, isHomePath(item.link.uid) && $style['item--home']]"
            prefetch
            :aria-current="$route.fullPath === parseLinkUrl(item.link.uid) ? 'page' : false"
        >
            <v-split-word :word="item.label" />
        </nuxt-link>
        <script v-if="breadcrumbJsonldB" type="application/ld+json" v-html="breadcrumbJsonldB"></script>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { joinURL } from 'ufo'
import { FilledContentRelationshipField } from '@prismicio/types/src/value/contentRelationship'
import { FilledLinkToMediaField } from '@prismicio/types/src/value/linkToMedia'
import DocumentUid from '~/constants/document-uid'
import { MainMenuDocumentDataLinksItem } from '~~/prismicio-types'
import { DocumentWithUidData, DocumentWithUidNames, ProjectDocumentData } from '~/types/prismic/app-prismic'
import VSplitWord from '~/components/atoms/VSplitWord.vue'
import { isInternalRelationLinkWithUidFulled } from '~/utils/prismic/relation-field'

type MenuItem = Omit<MainMenuDocumentDataLinksItem, 'link'> & {
    link: FilledContentRelationshipField<DocumentWithUidNames, string, DocumentWithUidData>
}

interface JsonLdbBreadcrumbItem {
    '@id': string
    name: string
    image?: string
}

interface JsonLdbBreadcrumb {
    '@type': string
    position: number
    item: JsonLdbBreadcrumbItem
}

export default Vue.extend({
    name: 'VNav',
    components: { VSplitWord },
    computed: {
        navItemList(): MenuItem[] {
            const links = this.$store.state.mainMenu?.data?.links
            if (!links?.length) return []
            return links.filter((menuLink: MainMenuDocumentDataLinksItem) =>
                isInternalRelationLinkWithUidFulled(menuLink.link)
            )
        },
        breadcrumbJsonldB(): Record<string, unknown> | undefined {
            if (!this.navItemList || this.navItemList.length < 2) return

            const itemFulledList = this.navItemList.filter(
                (item) => isInternalRelationLinkWithUidFulled(item.link) && item.link.uid
            )
            const items = itemFulledList.map((item, index) => {
                const result: JsonLdbBreadcrumb = {
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                        '@id': joinURL(this.$config.siteUrl, item.link.uid as string),
                        name: item.label || 'Page label',
                    },
                }
                const image =
                    (item.link.data?.meta_image as FilledLinkToMediaField)?.url ||
                    (item.link.data as ProjectDocumentData)?.thumbnail?.url
                if (image) result.item.image = image

                return result
            })

            return {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: items,
            }
        },
    },
    methods: {
        isHomePath(documentUid: string | undefined) {
            return !documentUid || documentUid === DocumentUid.HOME
        },
        parseLinkUrl(uid: string | undefined) {
            const isEn = this.$i18n.locale === 'en'

            if (!uid || (this.isHomePath(uid) && !isEn)) return '/'
            else if (isEn && this.isHomePath(uid)) return '/en'
            else return (isEn ? '/en/' : '/') + uid
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    display: flex;
    gap: rem(16);
    text-transform: uppercase;
}

.item {
    position: relative;

    &--home:global(.nuxt-link-exact-active)::after,
    &:not(#{&}--home):global(.nuxt-link-active)::after {
        position: absolute;
        right: 0;
        bottom: rem(-2);
        left: 0;
        height: 1px;
        background-color: color(black);
        content: '';
    }
}
</style>
