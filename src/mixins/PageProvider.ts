import Vue from 'vue'
import { PageData, ProjectData } from '~/types/prismic/app-prismic'
import {getDocumentData} from "~/utils/prismic/types-utilities";

export default Vue.extend({
    computed: {
        pageData(): PageData | ProjectData {
            return getDocumentData<PageData | ProjectData>(this.$store.state.currentPageData)
        },
    },
})
