<template>
    <div v-if="pageData">
        <lazy-v-home-page v-if="isHome" :page-data="pageData" />
        <lazy-v-project-listing v-else-if="isProjectListing" :page-data="pageData" />
        <lazy-v-project-page v-else-if="isProjectPage" :page-data="pageData" />
        <lazy-v-default-page v-else-if="isDefaultPage" :page-data="pageData" />

        <slice-zone v-if="slices && components" id="main" wrapper="main" :slices="slices" :components="components" />
    </div>
    <div v-else>
        <p>pageData not find</p>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import { SliceZone } from '@prismicio/vue/src/components/SliceZone'
import { components } from '~~/slices'
import Page from '~/mixins/Page'
import cacheControl from '~/middleware/cache-control'

export default mixins(Page).extend({
    name: 'DefaultPage',
    middleware: cacheControl(),
    components: { SliceZone },
    data() {
        return { components }
    },
})
</script>
