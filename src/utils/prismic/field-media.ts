import { LinkToMediaField } from '@prismicio/types/src/value/linkToMedia'
import { LinkType } from '@prismicio/types/src/value/link'
import type { EmptyLinkField, FilledLinkToMediaField, ImageField } from '@prismicio/types'
import { ImageFieldImage } from '@prismicio/types/src/value/image'

export const getMediaType = (media: LinkToMediaField): typeof LinkType | string | null => {
    return isLinkMediaFulled(media) ? media.link_type : null
}

export const isLinkMediaFulled = (
    media: unknown & (EmptyLinkField<'Media'> | FilledLinkToMediaField)
): media is FilledLinkToMediaField => {
    return 'name' in media && 'url' in media
}

export const isMediaFulled = (media: unknown & Partial<ImageField>): media is ImageFieldImage<'filled'> => {
    return 'url' in media
}

export const isFilledLinkToMediaField = (link?: unknown & Partial<LinkToMediaField>): link is FilledLinkToMediaField  => {
    return !!link && 'link_type' in link && 'name' in link && 'kind' in link && 'url' in link && 'size' in link
}
