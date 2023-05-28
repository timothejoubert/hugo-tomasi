<template>
    <div :class="$style.root">
        <v-header-home :page-data="pageData" />
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PageDataProvider from '~/mixins/PageDataProvider'

export default mixins(PageDataProvider).extend({
    name: 'VHomePage',
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
