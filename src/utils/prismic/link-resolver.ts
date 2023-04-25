import { Document } from '@prismicio/client/types/documents'
import DocumentUid from '../../constants/document-uid'
// import CustomType from '../../constants/custom-type'

export default function linkResolver({ uid }: Document) {
    if (uid === DocumentUid.HOME) return '/'
    // if (type === CustomType.PROJECT) return `/${NodeUid.PROJECT_LISTING}/${uid}`

    return `/${uid}`
}
