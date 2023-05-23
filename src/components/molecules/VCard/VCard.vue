<template>
    <div :class="$style.root">
        <v-image v-if="image" :prismic-image="image" :class="$style.image" />
        <div v-if="title">{{title}}</div>
        <div v-if="tags.length">
            <span v-for="tag in tags" :key="'tag-'+ tag.label">{{tag.label}}</span>
        </div>
        <div v-if="date">{{date}}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type {PropType} from 'vue'
import {ImageField} from "@prismicio/types";

export type VCardLayout = 'centered' | null

export default Vue.extend({
    name: 'VCard',
    props: {
        title: String,
        image: Object as PropType<ImageField>,
        tags: {
            type: Array as PropType<any[]>,
            default: () => []
        },
        date: String,
        layout: String as PropType<VCardLayout>,
    },
    computed: {
        rootClass(): (undefined | false | string)[] {
            return [this.$style.root]
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
