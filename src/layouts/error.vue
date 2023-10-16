<template>
    <section :class="$style.root">
        <div>
            <h1 class="text-h3" :class="$style.title">{{ $t('error.title', { number: error.statusCode }) }}</h1>
            <p :class="$style.message">{{ error.message }}</p>
        </div>
        <v-button :label="$t('button.back_home')" theme="dark" filled outlined to="/">
            <template #icon>
                <icon-right />
            </template>
        </v-button>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { NuxtError } from '@nuxt/types'
import IconRight from '~/assets/images/icons/arrow-right.svg?sprite'

export default Vue.extend({
    components: { IconRight },
    layout: 'error',
    props: {
        error: Object as PropType<NuxtError>,
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    max-width: rem(800);
    min-height: calc(100vh - $v-top-bar-height - $footer-height - $footer-margin-block * 2);
    margin-inline: auto;
    padding-block: rem(200);
}
.title {
    margin-bottom: rem(20);
}

.message {
    margin-bottom: rem(80);
}
</style>
