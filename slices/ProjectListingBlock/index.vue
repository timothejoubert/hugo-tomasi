<template>
    <section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation" :class="$style.root">
        <div :class="$style.navigation" class="container">
            <div v-if="slice.primary.title" class="text-h5" :class="$style.title">{{ slice.primary.title }}</div>
            <div :class="$style.scroll" :style="{ '--progress': progress }"></div>
        </div>
        <div ref="carousel" :class="$style.carousel" class="container-fullscreen">
            <v-link v-for="project in projects" :key="project.uid" :reference="project" :class="$style.link">
                <v-project-card :project="project.data" />
            </v-link>
        </div>
        <v-button :href="projectListingUrl" filled :class="$style.cta" :label="$t('see_all_project')">
            <template #icon>
                <icon-right />
            </template>
        </v-button>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType, VueConstructor } from 'vue'
import { ProjectListingBlockSlice } from '~~/prismicio-types'
import { ProjectDocument } from '~/types/prismic/prismic-types.generated'
import documentUid from '~/constants/document-uid'
import IconRight from '~/assets/images/icons/arrow-right.svg?sprite'

const SCROLL_SPEED = 1.5

interface Component extends Vue {
    projectListingUrl: string
}

export default (Vue as VueConstructor<Component>).extend({
    name: 'ProjectListingBlock',
    components: { IconRight },
    props: {
        slice: {
            type: Object as PropType<ProjectListingBlockSlice>,
            required: true,
        },
    },
    data() {
        return {
            isDown: false,
            startX: 0,
            scrollLeft: 0,
            slider: {} as HTMLElement,
            progress: 0,
            positionX: 0,
        }
    },
    computed: {
        projects(): ProjectDocument[] {
            return this.$store.state.projects
        },
    },
    watch: {
        positionX(value: number) {
            this.slider.scrollLeft = value
            this.updateProgress()
        },
    },
    created() {
        this.projectListingUrl = '/' + documentUid.PROJECT_LISTING
    },
    mounted() {
        this.slider = this.$refs.carousel as HTMLElement
        this.slider.addEventListener('mousedown', this.onMouseDown)
        this.slider.addEventListener('mouseleave', this.onMouseLeave)
        this.slider.addEventListener('mouseup', this.onMouseUp)
        this.slider.addEventListener('mousemove', this.onMouseMove)
        this.slider.addEventListener('scroll', () => {
            this.updateProgress()
        })
    },
    methods: {
        updateProgress() {
            this.progress = Math.abs(this.slider.scrollLeft / (window.innerWidth - this.slider.scrollWidth))
        },
        onMouseDown(event: MouseEvent) {
            this.isDown = true
            this.startX = event.pageX - this.slider.offsetLeft
            this.scrollLeft = this.slider.scrollLeft
        },
        onMouseLeave() {
            this.isDown = false
        },
        onMouseUp(event: MouseEvent) {
            event.preventDefault()
            this.isDown = false
        },
        onMouseMove(event: MouseEvent) {
            event.preventDefault()
            if (!this.isDown) return
            const x = event.pageX - this.slider.offsetLeft
            const walk = (x - this.startX) * SCROLL_SPEED
            this.positionX = this.scrollLeft - walk
        },
    },
})
</script>
<style lang="scss" module>
.root {
    @include margin-block;
}

.carousel {
    display: flex;
    min-width: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    touch-action: pan-y;

    &::-webkit-scrollbar {
        display: none;
    }
}

.link {
    --v-card-description-display: none;

    width: 45%;
    flex: 0 0 auto;
    margin-right: rem(20);
    -webkit-user-drag: none;
}

.navigation {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: rem(40);
}

.scroll {
    position: relative;
    overflow: hidden;
    width: rem(80);
    height: 2px;
    background-color: lightgray;
    border-radius: 1px;

    &::after {
        position: absolute;
        background-color: color(black);
        content: '';
        inset: 0;
        scale: var(--progress, 0) 1;
        transform-origin: left;
        transition: scale 0.1s;
    }
}

.cta {
    margin-top: rem(40);
    margin-left: $container-padding-inline;
}
</style>
