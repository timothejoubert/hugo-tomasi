<template>
    <div :class="$style.root">
        <div v-if="pageData.title">{{ pageData.title }}</div>
        <v-style-preview />
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PageDataProvider from '~/mixins/PageDataProvider'

export default mixins(PageDataProvider).extend({
    name: 'VDefaultPage',
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
