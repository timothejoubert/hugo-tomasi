<template>
    <header :class="$style.root" class="container-fullscreen">
        <div v-if="pageData.title" class="text-h1">{{ pageData.title }}</div>
        <v-text v-if="pageData.tagline" :content="pageData.tagline" :class="$style.tagline" class="text-h5" />

        <div v-if="pageData.header_media && pageData.header_media.url" :class="$style['background']">
            <video
                preload="auto"
                autoplay
                playsinline
                loop
                muted
                data-object-fit="cover"
                data-wf-ignore="true"
                :class="$style.media"
            >
                <source :src="pageData.header_media.url" type="video/mp4" />
            </video>
        </div>

        <div :class="$style.body">
            <div
                v-if="pageData.over_title"
                :class="$style['over-title']"
                class="text-over-title-s v-header-home-over-title"
            >
                {{ pageData.over_title }}
            </div>
            <div :class="$style.bottom">
                <v-text
                    v-if="pageData.description"
                    :content="pageData.description"
                    :class="$style.description"
                    class="text-body-s"
                />
                <v-text
                    v-if="pageData.excerpt"
                    :content="pageData.excerpt"
                    :class="$style.excerpt"
                    class="text-body-s"
                />
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { HomeDocumentData } from '~/types/prismic/app-prismic'

export default Vue.extend({
    name: 'VHeaderHome',
    props: {
        pageData: Object as PropType<HomeDocumentData>,
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    display: flex;
    height: 100vh;
    flex-direction: column;
    padding-top: $v-top-bar-height;
    margin-top: $v-top-bar-height * -1;
    background-color: color(black);
    color: color(white);
    isolation: isolate;
}

.tagline {
    max-width: max(31%, rem(330));
    margin-top: rem(18);
}

.background {
    position: absolute;
    z-index: -1;
    top: 0;
    inset: 0;

    &::after {
        position: absolute;
        background-color: rgba(color(black), 0.8);
        content: '';
        inset: 0;
    }
}
.media {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.body {
    margin-top: auto;
    margin-bottom: rem(36);
}

.over-title {
    position: relative;
    padding-bottom: rem(16);
    margin-bottom: rem(16);

    &::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 1px;
        background-color: rgba(color(white), 0.3);
        content: '';
    }
}

.bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: rem(20) rem(30);
}

.excerpt,
.description {
    width: min(100%, rem(420));

    & *:not(strong) {
        opacity: 0.7;
    }
}
</style>
