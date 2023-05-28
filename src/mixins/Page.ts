import type { MetaInfo } from 'vue-meta'
import Vue from 'vue'
import { Context, NuxtError } from '@nuxt/types'
import { SliceZone } from '@prismicio/types/src/value/sliceZone'
import { FilledLinkToMediaField, LinkToMediaField } from '@prismicio/types/src/value/linkToMedia'
import { FacebookMetaOptions, PageMetaPropertyName, TwitterMetaOptions } from '~/types/meta'
import { createFacebookMeta } from '~/utils/meta/facebook'
import { createTwitterMeta } from '~/utils/meta/twitter'
import { DocumentWithUidData } from '~/types/prismic/app-prismic'
import DocumentUid from '~/constants/document-uid'
import CustomType from '~/constants/custom-type'
import { isHomePageDocument, isProjectListingDocument } from '~/utils/prismic/document-entity'
import { isDefaultPageDocument, isProjectDocument } from '~/utils/prismic/custom-type-entity'
import { getDocumentData } from '~/utils/prismic/types-utilities'
import { isFilledLinkToMediaField } from '~/utils/prismic/field-media'
import { getFormattedLocale } from '~/components/molecules/VLangSwitch/VLangSwitch.vue'

export default Vue.extend({
    // middleware: 'slugParser',
    nuxtI18n: false,
    async asyncData(context: Context) {
        const { $prismic, params, store, route, error } = context
        let page

        const isPreview = route.fullPath.includes('/preview/')

        // Root
        const isRootPath = route.fullPath === '/en' || route.fullPath === '/'

        // Projects
        const isProjectListingUrl = route.path.substring(1) === DocumentUid.PROJECT_LISTING
        const isProjectUrl = route.path.includes(`/${DocumentUid.PROJECT_LISTING}/`) && !!params?.pathMatch

        let uid: string
        if (isRootPath) uid = DocumentUid.HOME
        else if (isProjectUrl) uid = params.pathMatch.replace(`${DocumentUid.PROJECT_LISTING}/`, '')
        else if (isProjectListingUrl) uid = DocumentUid.PROJECT_LISTING
        else uid = params.pathMatch

        if (isPreview) {
            page = await $prismic.api.getByID(route.params.documentId)
        } else if (isProjectUrl) {
            page = store.getters.getProjectByUid(uid)
        } else {
            // customType with Uid: 'home_page' | 'page'
            try {
                const customType = isRootPath ? CustomType.HOME_PAGE : CustomType.PAGE

                page = await $prismic.api.getByUID(
                    customType,
                    uid,
                    route.fullPath.includes('/en') ? { lang: 'en-gb' } : undefined
                )
            } catch (fetchError: Error | any) {
                error({
                    statusCode: fetchError?.response?.status,
                    message: fetchError?.message,
                } as NuxtError)
            }
        }

        if (page) {
            await store.dispatch('updatePageData', page)
            return { page }
        } else {
            return { page: { title: "can't fetch title in Page mixin" } }
        }
    },
    head(): MetaInfo {
        const meta = [
            {
                hid: 'description',
                name: 'description',
                content: this.pageDescription,
            } as PageMetaPropertyName,
            ...createFacebookMeta(this.getFacebookMetaOptions()),
            ...createTwitterMeta(this.getTwitterMetaOptions()),
            { hid: 'version', name: 'version', content: this.$config.version || '' },
        ]

        return {
            htmlAttrs: {
                lang: 'fr',
            },
            title: this.metaTitle,
            meta,
        }
    },
    computed: {
        pageData(): DocumentWithUidData {
            return getDocumentData<DocumentWithUidData>(this.page)
        },
        appTitle(): string {
            return this.$store.state.settings?.data?.site_name || this.$config.appName
        },
        metaTitle(): string {
            if (this.isHome) return this.appTitle
            const pageTitle = this.pageData?.meta_title || this.pageData?.title
            return pageTitle ? `${pageTitle} | ${this.appTitle}` : this.appTitle
        },
        metaImage(): string {
            const media: LinkToMediaField = this.pageData?.meta_image

            if (isFilledLinkToMediaField(media)) {
                return (media as FilledLinkToMediaField).url
            } else {
                return '/images/share.jpg'
            }
        },
        pageUrl(): string {
            return this.appTitle + this.$route.fullPath.substring(1)
        },
        pageDescription(): string | undefined {
            return this.pageData?.meta_description || this.$store.state.settings?.data?.description
        },
        isHome(): boolean {
            return !!this.page && isHomePageDocument(this.page)
        },
        isProjectListing(): boolean {
            return !!this.page && isProjectListingDocument(this.page)
        },
        isProjectPage(): boolean {
            return !!this.page && isProjectDocument(this.page)
        },
        isDefaultPage(): boolean {
            return !!this.page && isDefaultPageDocument(this.page)
        },
        slices(): SliceZone | [] {
            return !!this.page && this.page.data?.slices
        },
    },
    created() {
        // set the locale for first render on the client side (without asyncData)
        if (this.page?.lang) this.$i18n.locale = getFormattedLocale(this.page.lang, 'minify')
    },
    methods: {
        getTwitterMetaOptions(): TwitterMetaOptions {
            return {
                title: this.metaTitle,
                description: this.pageDescription,
                url: this.pageUrl,
                image: this.metaImage,
            }
        },
        getFacebookMetaOptions(): FacebookMetaOptions {
            return {
                siteName: this.appTitle,
                title: this.metaTitle,
                description: this.pageDescription,
                url: this.pageUrl,
                image: this.metaImage,
            }
        },
    },
})
