import type { MetaInfo } from 'vue-meta'
import Vue from 'vue'
import {Context, NuxtError} from '@nuxt/types'
import { FacebookMetaOptions, PageMetaPropertyName, TwitterMetaOptions } from '~/types/meta'
import { createFacebookMeta } from '~/utils/meta/facebook'
import { createTwitterMeta } from '~/utils/meta/twitter'
import { MainPageData } from '~/types/prismic/app-prismic'
import DocumentUid from '~/constants/document-uid'
import CustomType from '~/constants/custom-type'
import {SliceZone} from "@prismicio/types/src/value/sliceZone";
import {isHomePageDocument, isProjectListingDocument} from "~/utils/prismic/document-entity";
import {isProjectDocument} from "~/utils/prismic/custom-type-entity";
import {getDocumentData} from "~/utils/prismic/types-utilities";

export default Vue.extend({
    // middleware: 'slugParser',
    async asyncData({ $prismic, params, store, route, error }: Context) {
        let page

        const isRootPath = route.fullPath === '/' || route.fullPath.includes('accueil')

        const isProjectListingUrl = route.path.substring(1) === DocumentUid.PROJECT_LISTING
        const isProjectUrl = route.path.includes(`/${DocumentUid.PROJECT_LISTING}/`) && !!params?.uid

        const parameter = params?.uid || (isProjectListingUrl ? DocumentUid.PROJECT_LISTING : DocumentUid.HOME)

        if (isProjectUrl) {
            page = store.getters.getProjectByUid(parameter)
        } else {
            try {
                page = isRootPath ? await $prismic.api.getSingle('homepage') : await $prismic.api.getByUID(CustomType.PAGE, parameter)
            } catch (fetchError: any | Error) {
                error({
                    statusCode: fetchError?.response?.status,
                    message: fetchError?.message,
                } as NuxtError)
            }
        }

        console.log(page)

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
        appTitle(): string {
            return this.$store.state.settings?.data?.site_name || this.$config.appTitle
        },
        metaTitle(): string {
            if (this.isHome) return this.appTitle
            const pageTitle = this.$prismic.asText(this.pageData?.title)
            return pageTitle ? `${pageTitle} | ${this.appTitle}` : this.appTitle
        },
        metaImage(): string {
            const media = this.pageData?.thumbnail ? this.pageData.thumbnail : undefined
            return media?.url || '/images/share.jpg'
        },
        pageUrl(): string {
            return this.appTitle + this.$route.fullPath.substring(1)
        },
        pageDescription(): string {
            return (
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
})
