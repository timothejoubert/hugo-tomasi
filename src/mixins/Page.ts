import Vue from 'vue'
import type { MetaInfo } from 'vue-meta'
import { Context, NuxtError } from '@nuxt/types'
import { SliceZone } from '@prismicio/types/src/value/sliceZone'
import { FilledLinkToMediaField, LinkToMediaField } from '@prismicio/types/src/value/linkToMedia'
import { FacebookMetaOptions, TwitterMetaOptions } from '~/types/meta'
import { createFacebookMeta } from '~/utils/meta/facebook'
import { createTwitterMeta } from '~/utils/meta/twitter'
import { DocumentWithUidData } from '~/types/prismic/app-prismic'
import DocumentUid from '~/constants/document-uid'
import CustomType from '~/constants/custom-type'
import { isHomePageDocument, isProjectListingDocument } from '~/utils/prismic/document-entity'
import { isDefaultPageDocument, isProjectDocument } from '~/utils/prismic/custom-type-entity'
import { getDocumentData } from '~/utils/prismic/types-utilities'
import { isFilledLinkToMediaField } from '~/utils/prismic/field-media'
import { getFormattedLocale } from '~/components/molecules/VLangSwitch.vue'
import { SettingsDocument, PageDocumentData, ProjectDocument, ProjectDocumentData } from '~~/prismicio-types'
import { getProjectYear } from '~/utils/prismic/date'

export default Vue.extend({
    // middleware: 'slugParser',
    nuxtI18n: false,
    transition: {
        mode: 'out-in',
        css: false,
        beforeLeave(element: HTMLElement) {
            const currentPageUid = element.getAttribute('data-page')
            const fromHome = currentPageUid === DocumentUid.HOME

            const nextPage = window.$nuxt.$route
            const toProject =
                nextPage.path.includes(`/${DocumentUid.PROJECT_LISTING}/`) && !!nextPage?.params?.pathMatch

            if (fromHome && toProject) {
                const clickedCard = document.querySelector(`[href="${nextPage.path}"]`)
                console.log(clickedCard, `a[href="${nextPage.path}"]`)
            }
        },
        leave(_element: HTMLElement, done: Function) {
            // console.log(element)
            done()
            // window.setTimeout(done, 2000)
        },
    },
    async asyncData(context: Context) {
        const { $prismic, params, store, route, error } = context
        let page

        const isPreview = route.fullPath.includes(`${context.$config.previewPath}/`)

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
            { hid: 'description', name: 'description', content: this.pageDescription },
            { hid: 'version', name: 'version', content: this.$config.version || '' },
            ...createFacebookMeta(this.getFacebookMetaOptions()),
            ...createTwitterMeta(this.getTwitterMetaOptions()),
        ]

        return {
            htmlAttrs: { lang: this.$i18n?.locale || this.$config.defaultLocale },
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
        pageDescription(): string | undefined {
            return this.pageData?.meta_description || this.$store.state.settings?.data?.description
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
        jsonLd(): Record<string, unknown> | undefined {
            const siteName = (this.$store.state.settings as SettingsDocument)?.data?.site_name || this.$config.appName
            const baseUrl = this.$config.appUrl + (this.$i18n.locale === 'en' ? 'en/' : '')
            const websitePersonEntity = {
                name: siteName,
                alternateName: siteName.replace(/\s/g, ''),
                url: baseUrl,
                jobTitle: 'Motion designer',
            }

            if (this.isHome) {
                return {
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    ...websitePersonEntity,
                    author: {
                        '@type': 'Person',
                        givenName: 'Timothé',
                        familyName: 'Joubert',
                        birthDate: '1998-08-24',
                        url: 'https://timothejoubert.com',
                    },
                }
            } else if (this.isProjectPage) {
                const project = this.pageData as ProjectDocumentData
                const optionals: Record<string, unknown> = {}

                if (project.title) optionals.name = project.title
                if (project.thumbnail?.url) optionals.image = project.thumbnail.url
                if (project.description || project.long_description)
                    optionals.description =
                        this.$prismic.asText(project.description) || this.$prismic.asText(project.long_description)
                if (project.date) optionals.copyrightYear = getProjectYear(project.date)

                return {
                    '@context': 'https://schema.org',
                    '@type': 'VisualArtwork',
                    artform: 'Video',
                    artMedium: 'Digital',
                    creator: {
                        '@type': 'Person',
                        ...websitePersonEntity,
                    },
                    ...optionals,
                }
            } else if (this.isProjectListing) {
                const page = this.pageData as PageDocumentData
                const projects = this.$store.state.projects
                const projectItemList = projects?.map((project: ProjectDocument, index: number) => {
                    return {
                        '@type': 'ItemPage',
                        numberOfItems: projects.length,
                        itemListOrder: index + 1,
                        name: project.data.title,
                        image: project.data.thumbnail?.url,
                        url: `${baseUrl}${DocumentUid.PROJECT_LISTING}/${project.uid}`,
                    }
                })
                return {
                    '@context': 'http://schema.org/',
                    '@type': 'CollectionPage',
                    name: page.title || 'Page de listing des projets',
                    description:
                        this.$prismic.asText(page.description) ||
                        this.$prismic.asText(page.meta_description) ||
                        "Cette page contient l'ensemble de mes projets réalisés dans le domaine de l'audiovisuelle",
                    mainEntity: {
                        '@type': 'ItemList',
                        itemListElement: projectItemList,
                    },
                }
            } else {
                return undefined
            }
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
