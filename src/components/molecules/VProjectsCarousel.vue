<template>
    <div v-if="projects.length">
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
        <div ref="carousel" :class="$style.carousel" class="container-fullscreen">
            <v-link v-for="project in projects" :key="project.uid" :reference="project" :class="$style.link">
                <v-project-card :project="project.data" />
            </v-link>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ProjectDocument } from '~~/prismicio-types'
import IconRight from '~/assets/images/icons/arrow-right.svg?sprite'

const SCROLL_SPEED = 1.5

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
.carousel {
    --v-card-date-display: none;

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

    width: 65%;
    flex: 0 0 auto;
    margin-right: rem(20);
    -webkit-user-drag: none;

    @include media('>=md') {
        width: 45%;
    }
}

.navigation {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: rem(20);
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
