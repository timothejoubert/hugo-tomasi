import type {MetaInfo} from 'vue-meta'
import Vue from 'vue'
import {Context, NuxtError} from '@nuxt/types'
import {FacebookMetaOptions, PageMetaPropertyName, TwitterMetaOptions} from '~/types/meta'
import {createFacebookMeta} from '~/utils/meta/facebook'
import {createTwitterMeta} from '~/utils/meta/twitter'
import {MainPageData} from '~/types/prismic/app-prismic'
import DocumentUid from '~/constants/document-uid'
import CustomType from '~/constants/custom-type'
import {SliceZone} from "@prismicio/types/src/value/sliceZone";
import {isHomePageDocument, isProjectListingDocument} from "~/utils/prismic/document-entity";
import {isProjectDocument} from "~/utils/prismic/custom-type-entity";
import {getDocumentData} from "~/utils/prismic/types-utilities";
import {isFilledLinkToMediaField} from "~/utils/prismic/field-media";
import {LinkToMediaField} from "@prismicio/types/src/value/linkToMedia";
import {FilledLinkToMediaField} from "@prismicio/types";

export default Vue.extend({
    // middleware: 'slugParser',
    nuxtI18n: false,
    async asyncData({ $prismic, params, store, route, error }: Context) {
        let page

        console.log(route)

        // Root & Local
        const hasEnInUrl = route.fullPath.includes('/en')
        const localeOptions = hasEnInUrl ? { lang: 'en-gb' } : undefined
        const isRootPath = hasEnInUrl || route.fullPath === '/' || route.fullPath === '/fr' || route.fullPath.includes('accueil')

        // Projects
        const isProjectListingUrl = route.path.substring(1) === DocumentUid.PROJECT_LISTING
        const isProjectUrl = route.path.includes(`/${DocumentUid.PROJECT_LISTING}/`) && !!params?.uid

        const uid = isRootPath ? DocumentUid.HOME  : params?.uid || (isProjectListingUrl ? DocumentUid.PROJECT_LISTING : DocumentUid.HOME)

        if (isProjectUrl) {
            page = store.getters.getProjectByUid(uid)
        } else {
            try {
                const customType= isRootPath ? CustomType.HOME_PAGE : CustomType.PAGE

                console.log('fetch by uid doc', customType, uid, localeOptions)
                page =  await $prismic.api.getByUID(customType, uid, localeOptions)

            } catch (fetchError: any | Error) {
                error({
                    statusCode: fetchError?.response?.status,
                    message: fetchError?.message,
                } as NuxtError)
            }
        }

        // console.log(page?.data)

        if (page) {
            await store.dispatch('updatePageData', page)
            return { page }
        } else {
            return { page: { title : 'can\'t fetch title in Page mixin'} }
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
        pageData(): MainPageData {
            return getDocumentData<MainPageData>(this.page)
        },
        myCustomPageData(): MainPageData {
            return getDocumentData<MainPageData>(this.page)
        },
        appTitle(): string {
            return this.$store.state.settings?.data?.site_name || this.$config.appTitle
        },
        metaTitle(): string {
            if (this.isHome) return this.appTitle
            const pageTitle = this.pageData?.meta_title || this.pageData?.title
            return pageTitle ? `${pageTitle} | ${this.appTitle}` : this.appTitle
        },
        metaImage(): string {
            const media: LinkToMediaField = this.pageData?.meta_image || this.pageData?.image || this.pageData?.thumbnail

            if (isFilledLinkToMediaField(media)) {
                return (media as FilledLinkToMediaField).url
            } else {
                return '/images/share.jpg'
            }
        },
        pageUrl(): string {
            return this.appTitle + this.$route.fullPath.substring(1)
        },
        pageDescription(): string {
            return (
                this.pageData?.meta_description ||
                this.$prismic.asText(this.pageData?.description) ||
                this.$prismic.asText(this.$store.state.settings?.data?.description)
            )
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
        slices(): SliceZone | [] {
            return !!this.page && this.page.data?.slices
        },
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
    // created() {
    //     // set the locale for first render on the client side (without asyncData)
    //     if (this.page) {
    //         // const locale = this.alternateLinks.find((link) => link.url === this.pageData.item.url)?.locale
    //         const locale= 'fr'
    //
    //         if (locale) this.$i18n.locale = locale
    //
    //         console.log('created', this.page)
    //         console.log('locales', this.$i18n)
    //     }
    // },
})
