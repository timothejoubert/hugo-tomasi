<template>
    <div v-if="pageData">
        <v-text :content="pageData.title" />
        <v-image v-if="pageData.media" :prismic-image="pageData.media"/>
        <slice-zone
            v-if="slices && components"
            id="main"
            wrapper="main"
            :slices="slices"
            :components="components"
        />
        <v-social-list-link />
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
import cacheControl from "~/middleware/cache-control";

export default mixins(Page).extend({
    name: 'page',
    middleware: cacheControl(),
    components: { SliceZone },
    data() {
        return { components }
    },
})
</script>
