<template>
    <v-header-home :page-data="pageData" />
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PageDataProvider from '~/mixins/PageDataProvider'

export default mixins(PageDataProvider).extend({
    name: 'VHomePage',
})
</script>
