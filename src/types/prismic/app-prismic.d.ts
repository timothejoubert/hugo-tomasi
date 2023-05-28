// eslint-disable-next-line import/named
import { PrismicDocumentWithoutUID } from '@prismicio/types'
import { PrismicDocument, PrismicDocumentWithUID } from '@prismicio/types/src/value/document'
import {
    MainMenuDocument,
    SettingsDocument,
    AllDocumentTypes,
    HomePageDocument,
    PageDocument,
    ProjectDocument,
} from '~/types/prismic/prismic-types.generated'

// GLOBAL
export type CustomTypeName = extractDocumentType<AllDocumentTypes>
export type DocumentWithUi = extractDocument<AllDocumentTypes, PrismicDocumentWithUID>
export type DocumentWithUidNames = extractDocumentType<DocumentWithUi>
export type DocumentWithoutUidNames = extractDocumentType<extractDocument<AllDocumentTypes, PrismicDocumentWithoutUID>>

export type DocumentWithUidData = DocumentWithUi['data']

// DATA
export type HomeDocumentData = HomePageDocument['data']
export type PageDocumentData = PageDocument['data']
export type ProjectDocumentData = ProjectDocument['data']
export type SettingsData = SettingsDocument['data']
export type MainMenuData = MainMenuDocument['data']

//  UTILS
type extractDocumentType<T extends PrismicDocument> = Pick<T, 'type'>['type']
type extractDocument<T extends PrismicDocument, FilterType> = T extends FilterType ? T : never
