<template>
    <div :class="$style.root">
        <nuxt-link v-for="(item, i) in navItemList" :key="i" :to="isHomePath(item.link.uid) ? '/' : item.link.uid" class="text-over-title-s">{{item.label}}</nuxt-link>
        <script v-if="breadcrumbJsonldB" type="application/ld+json" v-html="breadcrumbJsonldB"></script>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {isInternalRelationLinkWithUidFulled} from "~/utils/prismic/field-relation";
import DocumentUid from "~/constants/document-uid";
import {joinURL} from "ufo";
import {MainMenuDocumentDataLinksItem} from "~/types/prismic/prismic-types.generated";
import {DocumentWithUidData, DocumentWithUidNames} from "~/types/prismic/app-prismic";
import {FilledContentRelationshipField} from "@prismicio/types/src/value/contentRelationship";

type MenuItem = Omit<MainMenuDocumentDataLinksItem, 'link'> & { link: FilledContentRelationshipField<DocumentWithUidNames, string, DocumentWithUidData> }

export default Vue.extend({
    name: 'VNav',
    computed: {
        navItemList(): MenuItem[] {
            return this.$store.state.mainMenu.data.links.filter((menuLink: MainMenuDocumentDataLinksItem) => isInternalRelationLinkWithUidFulled(menuLink.link))
        },
        breadcrumbJsonldB(): Record<string, unknown> | undefined {
            if (!this.navItemList || this.navItemList.length < 2) return

            return {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: this.navItemList.map((item, index: number) => {
                    const element: { '@type': string; position: number; name: string; item?: string } = {
                        '@type': 'ListItem',
                        position: index + 1,
                        name: item.label || 'Page label',
                    }

                    if (isInternalRelationLinkWithUidFulled(item.link) && item.link.uid)
                        element.item = joinURL(
                            this.$config.siteUrl,
                            item.link.uid === DocumentUid.HOME ? '' : item.link.uid
                        )

                    return element
                }),
            }
        },
    },
    methods: {
        isHomePath(documentUid: string | undefined) {
            return !documentUid || documentUid === DocumentUid.HOME
        }
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
</style>
