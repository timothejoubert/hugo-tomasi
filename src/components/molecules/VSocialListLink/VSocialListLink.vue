<template>
    <v-social-list v-slot="{socials}" :class="$style.root">
        <a :class="$style.link" v-for="(social, i) in socials" :key="'social-' + i" :href="social.url" target="_blank" :title="social.name">
            <span v-if="social.label">{{social.label}}</span>
            <component v-else :is="social.tagIcon" />
        </a>
    </v-social-list>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'VSocialListLink',
})
</script>

<style lang="scss" module>
.root {
    display: flex;
    gap: rem(10);
}
.link {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
