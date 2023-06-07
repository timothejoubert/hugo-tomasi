<template>
    <div ref="line" :class="$style.root" :style="{ translate: posLeft + 'px 0' }">
        <v-image v-for="(item, i) in itemsRendered" ref="item" :key="i" :prismic-image="item" :class="$style.item" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { VueConstructor, PropType } from 'vue'
import { FilledLinkToMediaField } from '@prismicio/types/src/value/linkToMedia'

interface Component extends Vue {
    resizeObserver: ResizeObserver
    observers: IntersectionObserver[]
}

const CLONE_OFFSET = 100
const SPEED = 0.1

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
            cloneItems: [] as FilledLinkToMediaField[],
            posLeft: 0,
            indexPushed: 0,
        }
    },
    computed: {
        itemsRendered(): FilledLinkToMediaField[] {
            return [...this.items, ...this.cloneItems]
        },
    },
    created() {
        this.observers = []
    },
    async mounted() {
        this.initResizeObserver()
        this.initClone()

        // wait for clone to be rendered before init observer
        await this.$nextTick()
        this.initObservers()
        this.startTranslate()
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

            if (lastItemBound && lastItemBound.left - CLONE_OFFSET < root.offsetWidth) this.addItem(this.indexPushed)
        },
        addItem(index: number) {
            // TODO: when add item => display them as absolute pos with left position depending on their index
            // for Prevent glitch during the add

            const items = this.$refs.item as Vue[]
            // duplicate the props item use for display VImage
            const elementProps = items[index].$props.prismicImage
            this.indexPushed++
            this.cloneItems.push(elementProps)
        },
        startTranslate() {
            window.setInterval(() => {
                this.posLeft += SPEED * this.direction
            }, 24)
        },
        initObservers() {
            const item = (this.$refs.item as Vue[]).map((vueInstance) => vueInstance.$el as HTMLElement)

            item.forEach((item: HTMLElement) => {
                const observer = new IntersectionObserver(([entry]) => {
                    const itemRect = entry.target.getBoundingClientRect()
                    const lastItemFullyEnter =
                        itemRect.left < window.innerWidth && itemRect.width + itemRect.left > window.innerWidth
                    const firstItemStartLeave =
                        this.direction === 1 && itemRect.left + itemRect.width > window.innerWidth
                    const add = this.direction === -1 ? lastItemFullyEnter : firstItemStartLeave

                    if (add) {
                        console.log('add', entry)
                        this.addItem(0)
                    }
                })
                observer.observe(item)
                this.observers.push(observer)
            })
        },
        // cloneElement(element: HTMLElement) {
        //     const elementProps = items[this.indexPushed].$props.prismicImage
        //     element.remove()
        //     this.cloneItems.push(elementProps)
        // },
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
}
</style>
