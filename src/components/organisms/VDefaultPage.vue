<template>
    <div :class="$style.root" class="container-fullscreen">
        <div :class="$style.left">
            <v-image v-if="pageData.media" :prismic-image="pageData.media" :class="$style.media" />
        </div>
        <div :class="$style.right">
            <v-text
                v-if="pageData.description"
                :content="pageData.description"
                class="text-h3"
                :class="$style.description"
            />
            <div v-if="email" class="text-over-title-s" :class="$style.email">{{ email }}</div>
            <v-social-list v-slot="{ socials }" :class="$style.socials">
                <v-button
                    v-for="(social, i) in socials"
                    :key="'social-' + i"
                    :href="social.url"
                    :class="$style.link"
                    :label="social.name"
                    size="s"
                    theme="dark"
                >
                    <template #icon>
                        <icon-arrow-up-right :class="$style.icon" />
                    </template>
                </v-button>
            </v-social-list>
        </div>
        <!--        <v-style-preview />-->
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import PageDataProvider from '~/mixins/PageDataProvider'
import IconArrowUpRight from '~/assets/images/icons/arrow-up-right.svg?sprite'

export default mixins(PageDataProvider).extend({
    name: 'VDefaultPage',
    components: { IconArrowUpRight },
    computed: {
        email(): string | undefined {
            return this.$store.state.settings?.data?.email
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    display: flex;
    min-height: 100vh;
    align-items: center;
    margin-top: $v-top-bar-height * -1;
    background-color: color(black);
    color: color(white);
    gap: rem(40);
    padding-block: rem(160) rem(200);
}

.left,
.right {
    width: 50%;
}

.media {
    --v-image-border-radius: #{rem(18)};

    max-width: rem(700);
    aspect-ratio: 495 / 579;
    margin-inline: auto;
}

.right {
    padding-block: rem(80);
}

.description {
    width: clamp(rem(280), 90%, rem(750));
    margin-bottom: rem(120);
    text-transform: uppercase;
    text-wrap: balance;
}

.email {
    margin-bottom: rem(20);
}

.socials {
    display: flex;
    gap: rem(20);
}

.link {
    display: flex;
    align-items: center;
}
</style>
