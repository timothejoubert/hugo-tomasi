<template>
    <div :class="$style.root" v-if="langList.length">
            <div :class="[$style.link, $style['link--current']]" class="text-over-title-s">
                {{currentLang.label}}
                <icon-chevron-down />
            </div>
            <div :class="$style.list">
                <a
                    v-for="(lang, i) in langList"
                    :key="lang.locale + i"
                    :href="lang.url === '/fr' ? '/' : lang.url"
                    :class="$style.link"
                    class="text-over-title-s"
                >
                    {{lang.label}}
                </a>
            </div>

    </div>
    <div v-else class="text-body-xs">No other lang</div>
</template>

<script lang="ts">
import Vue from 'vue'
import {AlternateLanguage} from "@prismicio/types/src/value/document";
import IconChevronDown from '~/assets/images/icons/chevron-down.svg?sprite'

const isFrLocal = (local: string): boolean => {
    return local === 'fr' || local === 'fr-fr'
}
const isEnLocal = (local: string): boolean =>{
    return local === 'en' || local === 'en-gb' || local === 'en-us'
}

export const getFormattedLocale = (local: string, output: 'minify' | 'full'): string => {
    if (output === 'full') {
        switch (local){
            case 'fr':
                return 'fr-fr'
            case 'en':
                return 'en-gb'
            default:
                return 'unset'
        }
    } else {
        switch (local) {
            case 'fr-fr':
                return 'fr'
            case 'en-gb':
                return 'en'
            default:
                return 'unset'
        }
    }
}

interface Lang {
    locale: string
    title: string
    label: string
    url: string
}

export default Vue.extend({
    name: 'VLangSwitch',
    components: { IconChevronDown },
    computed: {
        currentLang(): Lang {
            console.log(this.$route)
            return this.formatLang(getFormattedLocale(this.$i18n.locale, 'full'))
        },
        langList(): Lang[] {
            const availableLangList = this.$store.state.currentPageData?.alternate_languages

            return availableLangList?.map((alternate: AlternateLanguage) => {
                return this.formatLang(alternate.lang)
            }) || []
        },
    },
    methods: {
        formatLang(locale: string): Lang {
            const minifyLocal = getFormattedLocale(locale, 'minify')

            return {
                locale: locale,
                title: minifyLocal,
                label: minifyLocal.charAt(0).toUpperCase() + minifyLocal.slice(1),
                url: '/' + minifyLocal,
            }
        }
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    display: flex;
    flex-direction: column;
}

.list {
    position: absolute;
    inset: 0;
    opacity: 0;
    transform: translateY(50%);
    transition: transform 0.3s ease(out-quad);
    transition-property: transform, opacity;

    @media (hover: hover) {
        .root:hover & {
            opacity: 1;
            transform: translateY(100%);

        }
    }
}

.link {
    padding: rem(6) rem(14);
    border-radius: rem(10);
    text-transform: uppercase;

    &--current {
        display: flex;
        align-items: center;
        gap: rem(2);
    }
}
</style>
