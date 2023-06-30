<template>
    <div v-in-view.once :class="[$style.root, isOpen && $style['root--open']]">
        <div
            :class="$style.head"
            @click="isOpen = !isOpen"
            @mouseleave="isHoveringHead = false"
            @mouseenter="isHoveringHead = true"
        >
            <v-button theme="dark" filled size="l" :class="$style.button" outlined :play-animation="isHoveringHead">
                <template #icon>
                    <div :class="$style.icon"></div>
                </template>
            </v-button>
            <div v-if="title" :class="$style.skill__title" class="text-h3">{{ title }}</div>
        </div>
        <div :class="$style.body">
            <div :class="$style.body__inner">
                <v-text :content="content" :class="$style.skill__content" class="text-body-s" />
                <div :class="$style.side">
                    <div v-if="sideTitle" :class="$style.side__title" class="text-over-title-s">{{ sideTitle }}</div>
                    <v-text
                        v-if="additionalContent"
                        :class="$style.side__content"
                        class="text-body-s"
                        :content="additionalContent"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import * as prismicT from '@prismicio/types'

export interface VSkillProps {
    title: string | null
    content: string | prismicT.RichTextField
    sideTitle: string | null
    additionalContent: string | prismicT.RichTextField
}

export default Vue.extend({
    name: 'VSkill',
    props: {
        title: String,
        content: [String, Array] as PropType<String | prismicT.RichTextField>,
        sideTitle: String,
        additionalContent: [String, Array] as PropType<String | prismicT.RichTextField>,
    },
    data() {
        return {
            isOpen: false,
            isHoveringHead: false,
        }
    },
})
</script>
<style lang="scss" module>
.root {
    position: relative;
}

.head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    cursor: pointer;
    gap: rem(10) rem(30);

    @include media('>=md') {
        flex-wrap: nowrap;
    }
}

.button {
    ---v-button-inner-min-width: #{rem(72)};
}

.icon {
    position: relative;
    display: flex;
    width: rem(16);
    height: rem(16);
    align-items: center;
    justify-content: center;

    &::before,
    &::after {
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--theme-foreground-color);
        content: '';
        transform-origin: center;
        transition: background-color 0.3s, rotate 0.2s, opacity 0.2s;
    }

    .root:not(.root--open) &::after {
        rotate: 90deg;
    }

    .root--open &::after {
        opacity: 0;
    }

    .head:hover &::after,
    .head:hover &::before,
    .button:hover &::before,
    .button:hover &::after {
        background-color: var(--theme-button-filled-hover-foreground);
    }
}

.skill__title {
    width: 100%;
    max-width: rem(550);
    text-transform: uppercase;

    @include media('>=md') {
        width: initial;
        max-width: initial;
    }
}

.body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease(out-quad);

    .root--open & {
        grid-template-rows: 1fr;
    }
}

.body__inner {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-between;

    @include media('>=sm') {
        flex-direction: row;
    }
}

.side,
.skill__content {
    flex-basis: 40%;
    padding-block: rem(22) rem(12);

    @include media('>=sm') {
        padding-block: rem(30);
    }
}

.skill__content {
    @include media('>=md') {
        margin-left: rem(104);
    }
}

.side__title {
    margin-bottom: rem(10);
}

.side__content {
    line-height: 1.4;
    opacity: 0.7;
}
</style>
