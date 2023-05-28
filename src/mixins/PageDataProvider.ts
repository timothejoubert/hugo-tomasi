import Vue from 'vue'
import type { PropType } from 'vue'

import { DocumentWithUidData } from '~/types/prismic/app-prismic'

export default Vue.extend({
    props: {
        pageData: Object as PropType<DocumentWithUidData>,
    },
})
