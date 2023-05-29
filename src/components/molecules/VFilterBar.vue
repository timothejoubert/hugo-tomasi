<template>
    <div :class="[$style.root, isOpen && $style['root--open']]">
        <div :class="$style.tags">
            <div
                v-for="tag in projectTags"
                :key="tag"
                :class="[$style.tag, isSelected(tag) && $style['tag--selected']]"
                @click.prevent="onClick(tag)"
            >
                <input
                    :id="parseFilterId(tag)"
                    type="checkbox"
                    name="tags"
                    :checked="value?.includes(tag)"
                    :class="$style.input"
                />
                <label :for="parseFilterId(tag)">{{ tag }}</label>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { getAllTagProject } from '~/utils/project/tag'

const ALL = 'All'

export default Vue.extend({
    name: 'VFilterBar',
    props: {
        isOpen: Boolean,
        value: Array as PropType<String[]>,
    },
    computed: {
        projectTags(): string[] {
            const tags: string[] = getAllTagProject(this.$store.state.projects)

            return [ALL, ...new Set(tags)]
        },
    },
    methods: {
        parseFilterId(tag: string): string {
            return 'v-filter-project-' + tag
        },
        onClick(tag: string) {
            if (tag === ALL) {
                this.$emit('input', [])
                return
            }
            const filterTagList = this.value.slice()
            const indexOfTag = filterTagList.indexOf(tag)

            if (indexOfTag === -1) {
                filterTagList.push(tag)
            } else {
                filterTagList.splice(indexOfTag, 1)
            }

            this.$emit('input', filterTagList)
        },
        isSelected(tag: string): boolean {
            if (tag === ALL && !this.value.length) return true
            else return this.value.includes(tag)
        },
    },
})
</script>
<style lang="scss" module>
.root {
    display: grid;
    justify-content: end;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease(out-quad);

    &--open {
        grid-template-rows: 1fr;
    }
}

.tags {
    display: flex;
    overflow: hidden;
    gap: rem(16);
}

.tag {
    position: relative;
    cursor: pointer;
    margin-block: rem(4) rem(14);
    opacity: 0.5;
    transition: opacity 0.3s ease(out-quad);
    white-space: nowrap;

    &::after {
        position: absolute;
        bottom: rem(-2);
        left: 0;
        width: 100%;
        height: 1px;
        background-color: color(black);
        content: '';
        opacity: 0.2;
        scale: 0 1;
        transform-origin: left;
        transition: scale 0.2s ease(out-quad);
    }

    &--selected::after {
        scale: 1 1;
    }

    &--selected {
        opacity: 0.9;
    }

    @media (hover: hover) {
        &:hover {
            opacity: 0.9;
        }
    }
}

.input {
    display: none;
}

//.tags-transition:global(#{'-leave-active'}),
//.tags-transition:global(#{'-enter-active'}) {
//    transition: transform, opacity;
//    transition-duration: 0.3s;
//    transition-timing-function: ease(out-quad);
//}
//
//.tags-transition:global(#{'-leave-to'}),
//.tags-transition:global(#{'-enter'}) {
//    opacity: 0;
//    transform: translateY(100%);
//}
</style>
