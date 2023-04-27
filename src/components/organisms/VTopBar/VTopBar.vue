<template>
    <div :class="rootClass">
        <nuxt-link to="/">logo</nuxt-link>
        <v-nav :class="$style.nav"/>
        <v-lang-switch />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'VTopBar',
    props: {},
    computed: {
        rootClass(): (undefined | false | string)[] {
            return [this.$style.root]
        },
    },
    methods: {},
})
</script>

<style lang="scss" module>
.root {
    display: flex;
    align-items: center;
    padding: rem(24);
}
.nav {
    margin-right: rem(20);
    margin-left: auto;
}
</style>
