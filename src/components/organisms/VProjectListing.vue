<template>
    <div :class="$style.root" class="container">
        <div :class="$style.head">
            <h1 v-if="pageData.title" class="text-h4">{{ pageData.title }}</h1>
            <v-button
                :class="[
                    $style.toggle,
                    selectedTags.length && $style['toggle--active'],
                    isOpen && $style['toggle--open'],
                ]"
                theme="light"
                :animation="false"
                @click="isOpen = !isOpen"
            >
                {{ $t('filter.label') }}
                <template #icon>
                    <div :class="$style['toggle-icon']"></div>
                </template>
            </v-button>
        </div>
        <v-filter-bar v-model="selectedTags" :class="$style.filters" :is-open="isOpen" />
        <div :class="$style.body">
            <transition-group tag="ul" :name="$style['projects-transition']" :class="$style.projects">
                <li v-for="project in projects" :key="project.uid" :class="$style.project">
                    <v-link :reference="project">
                        <v-project-card :project="project.data" layout="centered" />
                    </v-link>
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import { ProjectDocument } from '~~/prismicio-types'
import PageDataProvider from '~/mixins/PageDataProvider'

export const QUERY_TAG = 'tag-filter'

export default mixins(PageDataProvider).extend({
    name: 'VProjectListing',
    data() {
        return {
            selectedTags: [] as string[],
            isOpen: false,
        }
    },
    created() {
        this.isOpen = !!this.queries?.length
        if (this.queries?.length) this.updateTags()
    },
    watch: {
        isOpen(value) {
            if (!value) this.selectedTags = []
        },
        selectedTags(value: string[]) {
            const parsedQuery = !value?.length ? undefined : value.length === 1 ? value[0] : value.join('&').toString()
            this.$router.push({ query: { 'tag-filter': parsedQuery } })
        },
    },
    computed: {
        queries(): string[] {
            const query = this.$route.query[QUERY_TAG] as string
            return query?.split('&')
        },
        projects(): ProjectDocument[] {
            const projects = this.$store.state.projects

            if (!this.selectedTags.length) return projects
            else
                return projects.filter((project: ProjectDocument) =>
                    project.data.tags.some(
                        (tag) => typeof tag?.label === 'string' && this.selectedTags.includes(tag.label)
                    )
                )
        },
    },
    methods: {
        updateTags() {
            this.selectedTags.push(...this.queries)
        },
    },
})
</script>

<style lang="scss" module>
.root {
    min-height: calc(100vh - $v-top-bar-height - $footer-height - $footer-margin-block * 2 - rem(140));
    margin-top: rem(140);
}

.head {
    position: relative;
    z-index: 11;
    display: flex;
    justify-content: space-between;
    margin-bottom: rem(12);
}

.filters {
    position: sticky;
    z-index: 10;
    top: $v-top-bar-height;
    background-color: #fff;

    &::before {
        position: absolute;
        height: $v-top-bar-height;
        background-color: #fff;
        content: '';
        inset: 0 0 auto 0;
        translate: 0 $v-top-bar-height * -1;
    }
}

.toggle {
    ---v-button-icon-margin: #{rem(8)} 0 #{rem(8)} #{rem(8)};

    position: relative;
    display: block;
    overflow: initial !important;
    margin-left: auto;

    &::before {
        position: absolute;
        top: rem(10);
        left: rem(-6);
        width: rem(6);
        height: rem(6);
        background-color: color(black);
        border-radius: 100vmax;
        content: '';
        scale: 0;
        transition: scale 0.3s;
    }

    &--active::before {
        scale: 1;
    }
}

.toggle-icon {
    position: relative;
    display: flex;
    width: rem(12);
    height: rem(12);
    align-items: center;
    justify-content: center;
    transform-origin: center;
    transition: rotate 0.4s ease(out-quad);

    &::before,
    &::after {
        position: absolute;
        background-color: color(black);
        content: '';
    }

    &::before {
        width: 1px;
        height: 100%;
    }

    &::after {
        width: 100%;
        height: 1px;
        margin-top: -1px;
    }

    .toggle--open & {
        rotate: 135deg;
    }
}

.body {
    margin-block: rem(20) rem(60);
}

.projects {
    display: grid;
    grid-gap: rem(40);
    grid-template-columns: 1fr;

    @include media('>=md') {
        grid-template-columns: 1fr 1fr;
    }
}

.project {
    --v-card-description-display: none;

    width: 100%;
}

.image {
    width: 100%;
}

.projects-transition:global(#{'-move'}),
.projects-transition:global(#{'-enter-active'}) {
    transition: transform, opacity;
    transition-duration: 0.35s;
    transition-timing-function: ease(out-quad);
}

.projects-transition:global(#{'-leave-to'}),
.projects-transition:global(#{'-enter'}) {
    //position: absolute;
    opacity: 0;
    transform: translateY(rem(50));
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.projects-transition:global(#{'-leave-active'}) {
    position: absolute;
    width: rem(453);
    transition-property: transform;
}
</style>
