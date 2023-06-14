<template>
    <v-link :class="$style.root" class="text-body-m" :reference="link">
        <div :class="$style.wrapper__title">
            <div v-if="title" :class="$style.title">{{ title }}</div>
        </div>
        <div v-if="content" :class="$style.content">{{ content }}</div>
        <div v-if="place" :class="$style.place">{{ place }}</div>
        <div v-if="year" :class="$style.year">{{ year }}</div>
        <v-button v-if="linkFulled" :class="$style.cta" :label="linkLabel || $t('button.default_label')">
            <template #icon>
                <icon-arrow-up-right />
            </template>
        </v-button>
    </v-link>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { LinkField } from '@prismicio/types/src/value/link'
import IconArrowUpRight from '~/assets/images/icons/arrow-up-right.svg?sprite'
import { isInternalRelationLinkFulled } from '~/utils/prismic/relation-field'

export default Vue.extend({
    name: 'VPromote',
    components: { IconArrowUpRight },

    props: {
        title: String,
        content: String,
        place: String,
        year: String,
        link: Object as PropType<LinkField>,
        linkLabel: String,
    },
    computed: {
        linkFulled(): boolean {
            return !!(this.link as { url?: string })?.url || isInternalRelationLinkFulled(this.link)
        },
    },
})
</script>
<style lang="scss" module>
.root {
    position: relative;
    display: flex;
    min-height: rem(73);
    align-items: center;
    border-top: var(--v-promote-border);
    gap: rem(16);
    padding-block: rem(16);
}

.wrapper__title {
    min-width: rem(130);
    transition: transform 0.3s ease(out-quad);

    @media (hover: hover) {
        .root:hover & {
            transform: translateX(rem(10));
        }
    }
}

.title {
    font-weight: 700;
}

.content {
    overflow: hidden;
    flex-grow: 1;
    font-weight: 300;
    opacity: 0.8;
    text-overflow: ellipsis;
}

.year,
.place {
    text-wrap: nowrap;

    &:not(:last-child)::after {
        position: relative;
        margin-left: rem(16);
        content: '|';
    }
}

.cta {
    ---v-button-icon-margin: #{rem(0) rem(0) rem(0) rem(4)};
}
</style>
