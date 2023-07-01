<template>
    <div v-if="items.length" ref="line" :class="$style.root">
        <v-image
            v-for="index in minimumLength"
            ref="item"
            :key="index + '-' + items[(index - 1) % items.length].url"
            :prismic-image="items[(index - 1) % items.length]"
            :class="$style.item"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { VueConstructor, PropType } from 'vue'
import { FilledLinkToMediaField } from '@prismicio/types/src/value/linkToMedia'

interface Component extends Vue {
    resizeObserver: ResizeObserver | null
    itemsObservers: IntersectionObserver[]
    itemGap: number
}

const SPEED = 1

export default (Vue as VueConstructor<Component>).extend({
    name: 'VMarquee',
    props: {
        play: Boolean,
        items: {
            type: Array as PropType<FilledLinkToMediaField[]>,
            default: () => [],
        },
        direction: Number as PropType<-1 | 1>,
    },
    data() {
        return {
            minimumLength: 1,
            translateX: 0,
            requestId: null as null | number,
        }
    },
    watch: {
        play(value: boolean) {
            if (value) this.startAnimation()
            else this.pauseAnimation()
        },
        async minimumLength() {
            this.disposeObservers()

            await this.$nextTick()
            await this.$nextTick()

            this.updateItemsPosition()
            this.initObservers()
        },
    },
    created() {
        this.itemsObservers = []
    },
    mounted() {
        if (!(this.$refs.item as Vue[])?.length) return

        this.initResizeObserver()
        this.initWrapperStyle()
        this.updateGapValue()

        this.updateMinimumLength()
        if (this.play) this.startAnimation()
    },
    beforeDestroy() {
        this.disposeResizeObserver()
    },
    methods: {
        updateGapValue() {
            this.itemGap = parseInt(getComputedStyle(this.$el).gap)
        },
        updateMinimumLength() {
            const wrapperWidth = window.innerWidth // (this.$el as HTMLElement).offsetWidth
            const itemsWidth = (this.$refs.item as Vue[]).map((item) => item.$el.getBoundingClientRect().width)
            let result = 0
            let index = 0

            do {
                result += itemsWidth[index % (this.items.length - 1)]
                index++
            } while (result < wrapperWidth)

            this.minimumLength = Math.max(index + 1, this.items.length)
        },
        initResizeObserver() {
            this.resizeObserver = new ResizeObserver(this.onResizeChange)
            this.resizeObserver.observe(this.$el)
        },
        onResizeChange() {
            this.updateGapValue()
            this.updateMinimumLength()
        },
        disposeResizeObserver() {
            this.resizeObserver?.disconnect()
            this.resizeObserver = null
        },
        initWrapperStyle() {
            const maxHeightElement = Math.max(
                ...(this.$refs.item as Vue[]).map((instance) => instance.$el.getBoundingClientRect().height)
            )
            ;(this.$el as HTMLElement).style.height = maxHeightElement + 'px'
        },
        initObservers() {
            const items = (this.$refs.item as Vue[]).map((item) => item.$el) as HTMLElement[]

            items.forEach((item, i) => {
                const observer = new IntersectionObserver(([entry]) => {
                    const itemRect = entry.target.getBoundingClientRect()
                    const isEnterByRight =
                        itemRect.left - itemRect.width < window.innerWidth &&
                        itemRect.left + itemRect.width > window.innerWidth
                    const isLeaveByLeft = itemRect.left < itemRect.width * -1

                    if ((isEnterByRight && this.direction === 1) || (isLeaveByLeft && this.direction === -1)) {
                        this.updateItemPosition(i)
                    }
                })
                observer.observe(item)
                this.itemsObservers.push(observer)
            })
        },
        disposeObservers() {
            this.itemsObservers.forEach((observer) => observer.disconnect())
            this.itemsObservers = []
        },
        updateItemsPosition() {
            const items = (this.$refs.item as Vue[]).map((item) => item.$el) as HTMLElement[]

            items.forEach((item, i) => {
                if (i === 0) {
                    item.style.left = '0'
                } else {
                    const previousItemBound = items[i - 1].getBoundingClientRect()
                    item.style.left = previousItemBound.left + previousItemBound.width + this.itemGap + 'px'
                }
            })
        },
        updateItemPosition(index: number) {
            const items = (this.$refs.item as Vue[]).map((item) => item.$el) as HTMLElement[]
            const maxRightPosition = Math.max(
                ...items.map(
                    (item: HTMLElement) => item.getBoundingClientRect().left + item.getBoundingClientRect().width
                )
            )
            const minLeftPosition = Math.min(...items.map((item: HTMLElement) => item.getBoundingClientRect().left))

            if (this.direction === -1) {
                items[index].style.left = maxRightPosition + this.itemGap + Math.abs(this.translateX) + 'px'
            } else {
                items[index].style.left =
                    (this.itemGap +
                        -minLeftPosition +
                        Math.abs(this.translateX) +
                        items[index].getBoundingClientRect().width) *
                        -1 +
                    'px'
            }
        },
        updatePosition() {
            this.requestId = null
            this.translateX += SPEED * this.direction
            ;(this.$el as HTMLElement).style.transform = `translate3d(${this.translateX}px, 0, 0)`
            this.startAnimation()
        },
        startAnimation() {
            if (!this.requestId) this.requestId = window.requestAnimationFrame(this.updatePosition)
        },
        pauseAnimation() {
            if (!this.requestId) return

            window.cancelAnimationFrame(this.requestId)
            this.requestId = null
        },
    },
})
</script>
<style lang="scss" module>
.root {
    position: relative;
    display: flex;
    gap: rem(20);
}

.item {
    --v-image-border-radius: #{rem(26)};

    position: absolute;
    width: max(#{rem(250)}, 20vw);
    flex-shrink: 0;
    aspect-ratio: 100 / 75;
    background-color: lightgray;
}
</style>
