<template>
    <div :class="$style.root" class="container">
        <div :class="$style.head">
            <div v-if="pageData.title" class="text-h4">{{ pageData.title }}</div>
            <v-button
                :class="[$style.toggle, isOpen && $style['toggle--open']]"
                :animation="false"
                @click="isOpen = !isOpen"
            >
                {{ $t('filter.label') }}
                <template #icon>
                    <div :class="$style['toggle-icon']"></div>
                </template>
            </v-button>
        </div>
        <v-filter-bar v-model="selectedTags" :class="$style.filter" :is-open="isOpen" />
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
import { ProjectDocument } from '~/types/prismic/prismic-types.generated'
import PageDataProvider from '~/mixins/PageDataProvider'
import VFilterBar from '~/components/molecules/VFilterBar.vue'

export default mixins(PageDataProvider).extend({
    name: 'VProjectListing',
    data() {
        return {
            selectedTags: [] as string[],
            isOpen: false,
        }
    },
    components: { VFilterBar },
    computed: {
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
})
</script>

<style lang="scss" module>
.root {
    min-height: calc(100vh - $v-top-bar-height - $footer-height - $footer-margin-block * 2 - rem(140));
    margin-top: rem(140);
}

.head {
    display: flex;
    justify-content: space-between;
}

.toggle {
    ---v-button-icon-margin: #{rem(8)} 0 #{rem(8)} #{rem(8)};

    display: block;
    margin-left: auto;
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
    margin-top: rem(20);
}

.projects {
    display: grid;
    grid-gap: rem(40);
    grid-template-columns: 1fr 1fr;
}

.project {
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
