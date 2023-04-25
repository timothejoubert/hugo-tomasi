<template>
    <div v-if="pageData">
        <h1>Titre de la page</h1>
        <slice-zone
            v-if="slices && components"
            id="main"
            wrapper="main"
            :slices="slices"
            :components="components"
        />
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
