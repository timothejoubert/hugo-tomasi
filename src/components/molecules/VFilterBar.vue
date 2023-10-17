<template>
    <div :class="[$style.root, isOpen && $style['root--open']]">
        <div :class="$style.tags">
            <div
                v-for="(tag, i) in projectTags"
                :key="tag"
                :class="[$style.tag, isSelected(tag) && $style['tag--selected']]"
                :style="selectedIndex > i && { '--tag-line-transform-origin': 'right' }"
                @click.prevent="onClick(tag)"
            >
                <input
                    :id="parseFilterId(tag)"
                    type="checkbox"
                    name="tags"
                    :checked="value?.includes(tag)"
                    :class="$style.input"
                />
                <label :for="parseFilterId(tag)" :class="$style.label">{{ tag }}</label>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { getAllTagProject } from '~/utils/project/tag'

export const ALL_TAG = 'All'
const ALLOW_MULTIPLE_TAGS = false

export default Vue.extend({
    name: 'VFilterBar',
    props: {
        isOpen: Boolean,
        value: Array as PropType<String[]>,
    },
    computed: {
        projectTags(): string[] {
            const tags: string[] = getAllTagProject(this.$store.state.projects)

            return [ALL_TAG, ...new Set(tags)]
        },
        selectedIndex(): number {
            return this.projectTags.findIndex((tag) => this.value.includes(tag))
        },
    },
    methods: {
        parseFilterId(tag: string): string {
            return 'v-filter-project-' + tag
        },
        onClick(tag: string) {
            if (tag === ALL_TAG) {
                this.$emit('input', [])
                return
            }
            if (!ALLOW_MULTIPLE_TAGS) {
                this.$emit('input', [tag])
            } else {
                const filterTagList = this.value.slice()
                const indexOfTag = filterTagList.indexOf(tag)

                if (indexOfTag === -1) {
                    filterTagList.push(tag)
                } else {
                    filterTagList.splice(indexOfTag, 1)
                }

                this.$emit('input', filterTagList)
            }
        },
        isSelected(tag: string): boolean {
            if (tag === ALL_TAG && !this.value.length) return true
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
    flex-wrap: wrap;
    gap: 0 rem(16);
}

.tag {
    position: relative;
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
        transform-origin: var(--tag-line-transform-origin, left);
        transition: scale 0.3s ease(out-quad), transform-origin 0s 0.3s;
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

.label {
    cursor: pointer;
}
</style>
