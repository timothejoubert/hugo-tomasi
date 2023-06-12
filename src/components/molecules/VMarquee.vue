<template>
    <div
        ref="line"
        :class="$style.root"
        :style="{ translate: posLeft + 'px 0' }"
        @mouseenter="speed = 0"
        @mouseleave="speed = 1"
    >
        <v-image
            v-for="(item, i) in itemsRendered"
            ref="item"
            :key="i + item.url"
            :prismic-image="item"
            :class="[$style.item, i > items.length - 1 && $style['item--cloned']]"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { VueConstructor, PropType } from 'vue'
import { FilledLinkToMediaField } from '@prismicio/types/src/value/linkToMedia'
import { convertRemToPixels } from '~/utils/utils'

interface Component extends Vue {
    resizeObserver: ResizeObserver
}

const CLONE_OFFSET = 100
const SPEED = 1

export default (Vue as VueConstructor<Component>).extend({
    name: 'VMarquee',
    props: {
        items: {
            type: Array as PropType<FilledLinkToMediaField[]>,
            default: () => [],
        },
        direction: Number as PropType<-1 | 1>,
    },
    data() {
        return {
            observers: [] as IntersectionObserver[],
            cloneItems: [] as FilledLinkToMediaField[],
            posLeft: 0,
            indexPushed: 0,
            speed: 1,
        }
    },
    computed: {
        itemsRendered(): FilledLinkToMediaField[] {
            console.log('update itemsRendered', [...this.items, ...this.cloneItems].length)
            return [...this.items, ...this.cloneItems]
        },
    },
    watch: {
        async cloneItems() {
            await this.$nextTick()
            const instances = this.$refs.item as Vue[]
            const lastItem = instances.at(-1)?.$el as HTMLElement | undefined

            if (lastItem) {
                this.initObserver(lastItem)
                const previousItemBound = instances.at(-2)?.$el.getBoundingClientRect() || { left: 0, width: 0 }
                lastItem.style.left =
                    previousItemBound.left + previousItemBound.width + parseInt(getComputedStyle(this.$el).gap) + 'px'
            }
        },
    },
    created() {
        this.observers = []
    },
    mounted() {
        this.initResizeObserver()
        this.initClone()

        const items = (this.$refs.item as Vue[])
            .filter((itemInstance) => itemInstance?.$el)
            .map((image) => image.$el as HTMLElement)

        items?.forEach((item: HTMLElement) => {
            this.initObserver(item)
        })

        // this.startTranslate()
    },
    methods: {
        initResizeObserver() {
            this.resizeObserver = new ResizeObserver(this.initClone)
            this.resizeObserver.observe(this.$el)
        },
        initClone() {
            const root = this.$el as HTMLElement
            const items = this.$refs.item as Vue[]
            const lastItem = items.at(-1)?.$el
            const lastItemBound = lastItem?.getBoundingClientRect()

            if (lastItemBound && lastItemBound.left - CLONE_OFFSET < root.offsetWidth) this.addItem()
        },
        addItem() {
            // TODO: when add item => display them as absolute pos with left position depending on their index

            const items = this.$refs.item as Vue[]

            const elementProps = items[this.indexPushed].$props.prismicImage
            this.indexPushed++
            this.cloneItems.push(elementProps)
        },
        removeItem() {
            this.disposeObserver(0)
            this.cloneItems.splice(0, 1)
        },
        startTranslate() {
            window.setInterval(() => {
                this.posLeft += SPEED * this.direction * this.speed
            }, 24)
        },
        initObserver(item: HTMLElement) {
            const observer = new IntersectionObserver(([entry]) => {
                const itemRect = entry.target.getBoundingClientRect()
                const rightItemFullyEnter =
                    itemRect.left < window.innerWidth && itemRect.width + itemRect.left > window.innerWidth
                const leftItemStartLeave = itemRect.left < itemRect.width * -1

                const add = this.direction === -1 ? rightItemFullyEnter : leftItemStartLeave
                const remove = this.direction === -1 ? leftItemStartLeave : leftItemStartLeave

                if (add) this.addItem()
                if (remove) this.removeItem()
            })
            observer.observe(item)
            this.observers.push(observer)
        },
        disposeObserver(index: number) {
            if (!this.observers?.length || !this.observers[index]) return

            this.observers[index].disconnect()
            this.observers.splice(index, 1)
        },
    },
})
</script>
<style lang="scss" module>
.root {
    position: relative;
    display: flex;
    gap: rem(20);
    //width: calc(100% - #{rem(200)});
}

.item {
    --v-image-border-radius: #{rem(26)};

    width: rem(200);
    flex-shrink: 0;
    aspect-ratio: 100 / 75;
    background-color: lightgray;

    &--cloned {
        position: absolute;
    }
}
</style>
