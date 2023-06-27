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
            <div :class="$style.email">
                <transition :name="$style['email-copied']">
                    <div v-if="emailCopied" class="text-body-xs" :class="$style['email__copied-success']">
                        {{ $t('email.copied__success') }} 🔥🔥
                    </div>
                </transition>
                <v-split-word
                    tag="button"
                    class="text-over-title-s"
                    :class="$style.email__cta"
                    @click.native="onMailClicked"
                >
                    {{ email }}
                </v-split-word>
            </div>
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
    data() {
        return {
            emailCopied: false,
        }
    },
    computed: {
        email(): string | undefined {
            return this.$store.state.settings?.data?.email
        },
    },
    methods: {
        onMailClicked() {
            this.email &&
                navigator.clipboard.writeText(this.email).then(this.onClipBoardSuccess, (error) => {
                    console.warn('Failed to copy in clipboard', error)
                })
        },
        onClipBoardSuccess() {
            this.emailCopied = true
            window.setTimeout(() => (this.emailCopied = false), 2000)
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
    position: relative;
}

.email__cta {
    margin-bottom: rem(20);
}

.email__copied-success {
    position: absolute;
    padding: rem(8) rem(16);
    background: linear-gradient(color(light), rgba(color(light), 0.85));
    //background-color: color(light);
    border-radius: rem(6);
    color: color(black);
    translate: 0 calc((100% + #{rem(20)}) * -1);
}

.socials {
    display: flex;
    gap: rem(20);
}

.link {
    display: flex;
    align-items: center;
}

.email-copied:global(#{'-enter-active'}),
.email-copied:global(#{'-leave-active'}) {
    transition: translate, opacity;
    transition-duration: 0.4s;
    transition-timing-function: ease(out-quad);
}

.email-copied:global(#{'-enter'}),
.email-copied:global(#{'-leave-to'}) {
    opacity: 0;
    translate: 0 -80%;
}
</style>
