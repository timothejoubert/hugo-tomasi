import Vue from 'vue'
import  {PropType} from 'vue'
import {DocumentWithUi, DocumentWithUidData} from '~/types/prismic/app-prismic'

export default Vue.extend({
    props: {
        pageData: Object as PropType<DocumentWithUidData>
    },
})
