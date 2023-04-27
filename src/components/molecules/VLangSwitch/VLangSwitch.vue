<template>
    <div :class="$style.root" v-if="langList.length">
            <component
                v-for="(lang, i) in langList"
                :key="lang.locale + i"
                :is="lang.isCurrent ? 'span' : 'nuxt-link'"
                :to="lang.url"
                :class="[$style.link, lang.isCurrent && $style['link--current']]"
            >
            {{lang.label}}
            </component>
    </div>
    <div v-else>No other lang detect</div>
</template>

<script lang="ts">
import Vue from 'vue'
import {AlternateLanguage} from "@prismicio/types/src/value/document";

interface Lang {
    locale: string
    label: string
    url: string
    isCurrent: boolean
}

enum PrismicLocale {
    FR = 'fr-fr',
    EN = 'en-gb',
}

const DISPLAYED_ON_NO_OTHERS = true

export default Vue.extend({
    name: 'VLangSwitch',
    computed: {
        langList(): Lang[] {
            // console.log(this.$i18n, this.$i18n.locale)
            console.log('page', this.$store.state.currentPageData)

            const current = {
                id: this.$i18n.locale,
                type: this.$i18n.locale,
                lang: this.$i18n.locale === 'fr' ? PrismicLocale.FR : this.$i18n.locale === 'en' ? PrismicLocale.EN : 'unset',
            }

            const availableLangList = this.$store.state.currentPageData?.alternate_languages
            const langList: AlternateLanguage[] = availableLangList?.length ? [current, ...availableLangList] : [current]

            if (!DISPLAYED_ON_NO_OTHERS && langList.length === 1) return []

            console.log('current:', current)

            return langList.map((alternate: AlternateLanguage) => {
                const locale = alternate.lang // ex: 'fr-fr' || 'gb-en'

                console.log(locale)

                const title = locale === PrismicLocale.FR ? 'fr' : locale === PrismicLocale.EN ? 'en' : 'unset'
                const label = locale === PrismicLocale.FR ? 'Fr' : locale === PrismicLocale.EN ? 'En' : 'unset'
                const url = locale === PrismicLocale.FR ? '/fr' : locale === PrismicLocale.EN ? '/en' : '/'

                return {
                    locale,
                    title,
                    label,
                    url,
                    isCurrent: title === this.$i18n.locale
                }
            })
        },
    },
    methods: {},
})
</script>

<style lang="scss" module>
.root {
    display: flex;
    flex-direction: column;
}

.link {
    padding: rem(6) rem(14);
    background-color: rgba(black, 0.1);
    border-radius: rem(10);

    &--current {
        background-color: rgba(black, 0.3);
    }
}
</style>
