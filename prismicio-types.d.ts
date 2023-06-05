// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from '@prismicio/types'
import type * as prismicClient from '@prismicio/client'

type Simplify<T> = {
    [KeyType in keyof T]: T[KeyType]
}
/** Content for Home page documents */
interface HomePageDocumentData {
    /**
     * Title field in *Home page*
     *
     * - **Field Type**: Text
     * - **Placeholder**: Titre de la page
     * - **API ID Path**: home_page.title
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    title: prismic.KeyTextField
    /**
     * Header media field in *Home page*
     *
     * - **Field Type**: Link to Media
     * - **Placeholder**: *None*
     * - **API ID Path**: home_page.header_media
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    header_media: prismic.LinkToMediaField
    /**
     * Over title field in *Home page*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: home_page.over_title
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    over_title: prismic.KeyTextField
    /**
     * Description field in *Home page*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: Description de la page
     * - **API ID Path**: home_page.description
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismic.RichTextField
    /**
     * Excerpt field in *Home page*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: home_page.excerpt
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    excerpt: prismic.RichTextField
    /**
     * Slice Zone field in *Home page*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: home_page.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismic.SliceZone<HomePageDocumentDataSlicesSlice>
    /**
     * Meta title field in *Home page*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: home_page.meta_title
     * - **Tab**: Meta data
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_title: prismic.KeyTextField
    /**
     * Meta description field in *Home page*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: home_page.meta_description
     * - **Tab**: Meta data
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_description: prismic.KeyTextField
    /**
     * Meta image field in *Home page*
     *
     * - **Field Type**: Link to Media
     * - **Placeholder**: *None*
     * - **API ID Path**: home_page.meta_image
     * - **Tab**: Meta data
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    meta_image: prismic.LinkToMediaField
}
/**
 * Slice for *Home page → Slice Zone*
 *
 */
type HomePageDocumentDataSlicesSlice =
    | IntroductionBlockSlice
    | ProjectPushBlockSlice
    | ProjectListingBlockSlice
    | PartnersBlockSlice
/**
 * Home page document from Prismic
 *
 * - **API ID**: `home_page`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomePageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<
    Simplify<HomePageDocumentData>,
    'home_page',
    Lang
>
/** Content for Main menu documents */
interface MainMenuDocumentData {
    /**
     * Links field in *Main menu*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: main_menu.links[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    links: prismic.GroupField<Simplify<MainMenuDocumentDataLinksItem>>
}
/**
 * Item in Main menu → Links
 *
 */
export interface MainMenuDocumentDataLinksItem {
    /**
     * Label field in *Main menu → Links*
     *
     * - **Field Type**: Text
     * - **Placeholder**: Label affiché dans le menu
     * - **API ID Path**: main_menu.links[].label
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    label: prismic.KeyTextField
    /**
     * Link field in *Main menu → Links*
     *
     * - **Field Type**: Content Relationship
     * - **Placeholder**: Lien vers une page
     * - **API ID Path**: main_menu.links[].link
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    link: prismic.ContentRelationshipField<'page' | 'project' | 'home_page'>
}
/**
 * Main menu document from Prismic
 *
 * - **API ID**: `main_menu`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type MainMenuDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
    Simplify<MainMenuDocumentData>,
    'main_menu',
    Lang
>
/** Content for Page documents */
interface PageDocumentData {
    /**
     * Title field in *Page*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: page.title
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    title: prismic.KeyTextField
    /**
     * Description field in *Page*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: page.description
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismic.RichTextField
    /**
     * Type field in *Page*
     *
     * - **Field Type**: Select
     * - **Placeholder**: *None*
     * - **API ID Path**: page.type
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/select
     *
     */
    type: prismic.SelectField<'Default' | 'About'>
    /**
     * Slice Zone field in *Page*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: page.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismic.SliceZone<PageDocumentDataSlicesSlice>
    /**
     * Meta title field in *Page*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: page.meta_title
     * - **Tab**: Meta data
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_title: prismic.KeyTextField
    /**
     * Meta description field in *Page*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: page.meta_description
     * - **Tab**: Meta data
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_description: prismic.KeyTextField
    /**
     * Meta image field in *Page*
     *
     * - **Field Type**: Link to Media
     * - **Placeholder**: *None*
     * - **API ID Path**: page.meta_image
     * - **Tab**: Meta data
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    meta_image: prismic.LinkToMediaField
}
/**
 * Slice for *Page → Slice Zone*
 *
 */
type PageDocumentDataSlicesSlice = IntroductionBlockSlice | ProjectPushBlockSlice | ProjectListingBlockSlice
/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<
    Simplify<PageDocumentData>,
    'page',
    Lang
>
/** Content for Project documents */
interface ProjectDocumentData {
    /**
     * Title field in *Project*
     *
     * - **Field Type**: Text
     * - **Placeholder**: Titre du projet
     * - **API ID Path**: project.title
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    title: prismic.KeyTextField
    /**
     * Description field in *Project*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: Description du projet
     * - **API ID Path**: project.description
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismic.RichTextField
    /**
     * Date field in *Project*
     *
     * - **Field Type**: Date
     * - **Placeholder**: Date du projet
     * - **API ID Path**: project.date
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/date
     *
     */
    date: prismic.DateField
    /**
     * Thumbnail field in *Project*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: project.thumbnail
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    thumbnail: prismic.ImageField<never>
    /**
     * Tags field in *Project*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: project.tags[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    tags: prismic.GroupField<Simplify<ProjectDocumentDataTagsItem>>
    /**
     * Long description field in *Project*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project.long_description
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    long_description: prismic.RichTextField
    /**
     * Meta title field in *Project*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project.meta_title
     * - **Tab**: Meta data
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_title: prismic.KeyTextField
    /**
     * Meta description field in *Project*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project.meta_description
     * - **Tab**: Meta data
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_description: prismic.KeyTextField
    /**
     * Meta image field in *Project*
     *
     * - **Field Type**: Link to Media
     * - **Placeholder**: *None*
     * - **API ID Path**: project.meta_image
     * - **Tab**: Meta data
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    meta_image: prismic.LinkToMediaField
}
/**
 * Item in Project → Tags
 *
 */
export interface ProjectDocumentDataTagsItem {
    /**
     * Label field in *Project → Tags*
     *
     * - **Field Type**: Text
     * - **Placeholder**: Label du tag
     * - **API ID Path**: project.tags[].label
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    label: prismic.KeyTextField
}
/**
 * Project document from Prismic
 *
 * - **API ID**: `project`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ProjectDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<
    Simplify<ProjectDocumentData>,
    'project',
    Lang
>
/** Content for Settings documents */
interface SettingsDocumentData {
    /**
     * Site Name field in *Settings*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: settings.site_name
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    site_name: prismic.KeyTextField
    /**
     * Tagline field in *Settings*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: Tagline présente la page About
     * - **API ID Path**: settings.tagline
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    tagline: prismic.RichTextField
    /**
     * Socials field in *Settings*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: settings.socials[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    socials: prismic.GroupField<Simplify<SettingsDocumentDataSocialsItem>>
}
/**
 * Item in Settings → Socials
 *
 */
export interface SettingsDocumentDataSocialsItem {
    /**
     * Social field in *Settings → Socials*
     *
     * - **Field Type**: Select
     * - **Placeholder**: *None*
     * - **API ID Path**: settings.socials[].social
     * - **Documentation**: https://prismic.io/docs/core-concepts/select
     *
     */
    social: prismic.SelectField<'Instagram' | 'Facebook' | 'Youtube' | 'Vimeo' | 'TikTok' | 'Behance' | 'LinkedIn'>
    /**
     * Link field in *Settings → Socials*
     *
     * - **Field Type**: Link
     * - **Placeholder**: *None*
     * - **API ID Path**: settings.socials[].link
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    link: prismic.LinkField
    /**
     * Label field in *Settings → Socials*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: settings.socials[].label
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    label: prismic.KeyTextField
}
/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
    Simplify<SettingsDocumentData>,
    'settings',
    Lang
>
export type AllDocumentTypes = HomePageDocument | MainMenuDocument | PageDocument | ProjectDocument | SettingsDocument
/**
 * Primary content in IntroductionBlock → Primary
 *
 */
interface IntroductionBlockSliceDefaultPrimary {
    /**
     * Content field in *IntroductionBlock → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: introduction_block.primary.content
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    content: prismic.RichTextField
}
/**
 * Item in IntroductionBlock → Items
 *
 */
export interface IntroductionBlockSliceDefaultItem {
    /**
     * Media field in *IntroductionBlock → Items*
     *
     * - **Field Type**: Link to Media
     * - **Placeholder**: *None*
     * - **API ID Path**: introduction_block.items[].media
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    media: prismic.LinkToMediaField
}
/**
 * Default variation for IntroductionBlock Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Default`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type IntroductionBlockSliceDefault = prismic.SharedSliceVariation<
    'default',
    Simplify<IntroductionBlockSliceDefaultPrimary>,
    Simplify<IntroductionBlockSliceDefaultItem>
>
/**
 * Slice variation for *IntroductionBlock*
 *
 */
type IntroductionBlockSliceVariation = IntroductionBlockSliceDefault
/**
 * IntroductionBlock Shared Slice
 *
 * - **API ID**: `introduction_block`
 * - **Description**: `IntroductionBlock`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type IntroductionBlockSlice = prismic.SharedSlice<'introduction_block', IntroductionBlockSliceVariation>
/**
 * Primary content in PartnersBlock → Primary
 *
 */
interface PartnersBlockSliceDefaultPrimary {
    /**
     * Lines field in *PartnersBlock → Primary*
     *
     * - **Field Type**: Number
     * - **Placeholder**: *None*
     * - **API ID Path**: partners_block.primary.lines
     * - **Documentation**: https://prismic.io/docs/core-concepts/number
     *
     */
    lines: prismic.NumberField
}
/**
 * Item in PartnersBlock → Items
 *
 */
export interface PartnersBlockSliceDefaultItem {
    /**
     * Media field in *PartnersBlock → Items*
     *
     * - **Field Type**: Link to Media
     * - **Placeholder**: *None*
     * - **API ID Path**: partners_block.items[].media
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    media: prismic.LinkToMediaField
}
/**
 * Default variation for PartnersBlock Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Default`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type PartnersBlockSliceDefault = prismic.SharedSliceVariation<
    'default',
    Simplify<PartnersBlockSliceDefaultPrimary>,
    Simplify<PartnersBlockSliceDefaultItem>
>
/**
 * Slice variation for *PartnersBlock*
 *
 */
type PartnersBlockSliceVariation = PartnersBlockSliceDefault
/**
 * PartnersBlock Shared Slice
 *
 * - **API ID**: `partners_block`
 * - **Description**: `PartnersBlock`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type PartnersBlockSlice = prismic.SharedSlice<'partners_block', PartnersBlockSliceVariation>
/**
 * Primary content in ProjectListingBlock → Primary
 *
 */
interface ProjectListingBlockSliceDefaultPrimary {
    /**
     * Title field in *ProjectListingBlock → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: project_listing_block.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    title: prismic.KeyTextField
}
/**
 * Default variation for ProjectListingBlock Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Default`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ProjectListingBlockSliceDefault = prismic.SharedSliceVariation<
    'default',
    Simplify<ProjectListingBlockSliceDefaultPrimary>,
    never
>
/**
 * Slice variation for *ProjectListingBlock*
 *
 */
type ProjectListingBlockSliceVariation = ProjectListingBlockSliceDefault
/**
 * ProjectListingBlock Shared Slice
 *
 * - **API ID**: `project_listing_block`
 * - **Description**: `ProjectListingBlock`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ProjectListingBlockSlice = prismic.SharedSlice<'project_listing_block', ProjectListingBlockSliceVariation>
/**
 * Primary content in ProjectPushBlock → Primary
 *
 */
interface ProjectPushBlockSliceDefaultPrimary {
    /**
     * Project field in *ProjectPushBlock → Primary*
     *
     * - **Field Type**: Content Relationship
     * - **Placeholder**: *None*
     * - **API ID Path**: project_push_block.primary.project
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    project: prismic.ContentRelationshipField<'project'>
}
/**
 * Default variation for ProjectPushBlock Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Default`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ProjectPushBlockSliceDefault = prismic.SharedSliceVariation<
    'default',
    Simplify<ProjectPushBlockSliceDefaultPrimary>,
    never
>
/**
 * Slice variation for *ProjectPushBlock*
 *
 */
type ProjectPushBlockSliceVariation = ProjectPushBlockSliceDefault
/**
 * ProjectPushBlock Shared Slice
 *
 * - **API ID**: `project_push_block`
 * - **Description**: `ProjectPushBlock`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ProjectPushBlockSlice = prismic.SharedSlice<'project_push_block', ProjectPushBlockSliceVariation>
declare module '@prismicio/client' {
    interface CreateClient {
        (repositoryNameOrEndpoint: string, options?: prismicClient.ClientConfig): prismicClient.Client<AllDocumentTypes>
    }
    namespace Content {
        export type {
            HomePageDocumentData,
            HomePageDocumentDataSlicesSlice,
            HomePageDocument,
            MainMenuDocumentData,
            MainMenuDocumentDataLinksItem,
            MainMenuDocument,
            PageDocumentData,
            PageDocumentDataSlicesSlice,
            PageDocument,
            ProjectDocumentData,
            ProjectDocumentDataTagsItem,
            ProjectDocument,
            SettingsDocumentData,
            SettingsDocumentDataSocialsItem,
            SettingsDocument,
            AllDocumentTypes,
            IntroductionBlockSliceDefaultPrimary,
            IntroductionBlockSliceDefaultItem,
            IntroductionBlockSliceDefault,
            IntroductionBlockSliceVariation,
            IntroductionBlockSlice,
            PartnersBlockSliceDefaultPrimary,
            PartnersBlockSliceDefaultItem,
            PartnersBlockSliceDefault,
            PartnersBlockSliceVariation,
            PartnersBlockSlice,
            ProjectListingBlockSliceDefaultPrimary,
            ProjectListingBlockSliceDefault,
            ProjectListingBlockSliceVariation,
            ProjectListingBlockSlice,
            ProjectPushBlockSliceDefaultPrimary,
            ProjectPushBlockSliceDefault,
            ProjectPushBlockSliceVariation,
            ProjectPushBlockSlice,
        }
    }
}
