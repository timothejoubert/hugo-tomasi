<template>
    <div v-if="projects.length" :class="$style.root">
        <div :class="$style.navigation" class="container">
            <div>
                <div v-if="title" class="text-h5" :class="$style.title">{{ title }}</div>
                <v-button
                    v-if="displayCta"
                    :href="'/' + $documentUid('PROJECT_LISTING')"
                    outlined
                    size="s"
                    filled
                    theme="light"
                    :class="$style.cta"
                    :label="$t('see_all_project')"
                >
                    <template #icon>
                        <icon-right />
                    </template>
                </v-button>
            </div>
            <div v-show="isCarouselEnable" :class="$style.scroll" :style="{ '--progress': progress }"></div>
        </div>
        <div
            ref="carousel"
            :class="[$style.carousel, mouseMove && $style['carousel--is-dragging']]"
            class="container-fullscreen"
        >
            <v-link v-for="project in projects" :key="project.uid" :reference="project" :class="$style.link">
                <v-project-card
                    :project="project.data"
                    :image-props="{ sizes: 'xs:70vw sm:70vw md:45vw lg:45vw vl:45vw xl:45vw xxl:45vw hd:45vw' }"
                />
            </v-link>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ProjectDocument } from '~~/prismicio-types'
import IconRight from '~/assets/images/icons/arrow-right.svg?sprite'

const SCROLL_SPEED = 1

export default Vue.extend({
    name: 'VProjectCarousel',
    components: { IconRight },
    props: {
        title: String,
        displayCta: Boolean,
    },
    data() {
        return {
            isCarouselEnable: false,
            isDown: false,
            startX: 0,
            scrollLeft: 0,
            slider: {} as HTMLElement,
            progress: 0,
            positionX: 0,
            mouseMove: false,
        }
    },
    computed: {
        projects(): ProjectDocument[] {
            return this.$store.state.projects.filter(
                (project: ProjectDocument) => project.uid !== this.$store.state.currentPageData?.uid
            )
        },
    },
    watch: {
        positionX(value: number) {
            this.slider.scrollLeft = value
            this.updateProgress()
        },
        isCarouselEnable(value: boolean) {
            if (!this.$refs?.carousel) return

            if (value) this.initListener()
            else this.removeListener()
        },
    },
    mounted() {
        if (!this.$refs?.carousel) return

        this.updateCarouselEnable()
        window.addEventListener('resize', this.updateCarouselEnable)
    },
    beforeDestroy() {
        this.removeListener()
        window.removeEventListener('resize', this.updateCarouselEnable)
    },
    methods: {
        updateCarouselEnable() {
            const lastSlide = Array.from((this.$refs?.carousel as HTMLElement)?.children)?.at(-1)
            if (!lastSlide) return

            const endPosition = lastSlide.getBoundingClientRect().left + lastSlide.getBoundingClientRect().width
            this.isCarouselEnable = endPosition > (this.$el as HTMLElement).offsetWidth
        },
        initListener() {
            this.slider = this.$refs.carousel as HTMLElement
            this.slider.addEventListener('mousedown', this.onMouseDown)
            this.slider.addEventListener('mouseleave', this.onMouseLeave)
            this.slider.addEventListener('mouseup', this.onMouseUp)
            this.slider.addEventListener('mousemove', this.onMouseMove)
            this.slider.addEventListener('scroll', this.onScroll)
        },
        removeListener() {
            this.slider = this.$refs.carousel as HTMLElement
            this.slider.removeEventListener('mousedown', this.onMouseDown)
            this.slider.removeEventListener('mouseleave', this.onMouseLeave)
            this.slider.removeEventListener('mouseup', this.onMouseUp)
            this.slider.removeEventListener('mousemove', this.onMouseMove)
            this.slider.removeEventListener('scroll', this.onScroll)
        },
        onScroll() {
            this.updateProgress()
        },
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
            this.mouseMove = false
        },
        onMouseUp() {
            this.isDown = false
            this.mouseMove = false
        },
        onMouseMove(event: MouseEvent) {
            if (!this.isDown) return
            this.mouseMove = true
            const x = event.pageX - this.slider.offsetLeft
            const walk = (x - this.startX) * SCROLL_SPEED
            this.positionX = this.scrollLeft - walk
        },
    },
})
</script>
<style lang="scss" module>
.root {
    overflow: hidden;
}

.carousel {
    --v-card-date-display: none;

    display: flex;
    min-width: 100%;
    cursor: grab;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    scrollbar-width: none; /* Firefox 64 */
    touch-action: pan-x;

    &::-webkit-scrollbar {
        display: none;
    }
}

.link {
    --v-card-description-display: none;

    width: max(65%, rem(220));
    flex-shrink: 0;
    margin-right: rem(20);
    cursor: inherit;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;

    .carousel--is-dragging & {
        pointer-events: none;
    }

    @include media('>=md') {
        width: 45%;
    }
}

.navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: rem(20);

    @include media('>=md') {
        align-items: flex-end;
    }
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
    margin-top: rem(10);
}
</style>
