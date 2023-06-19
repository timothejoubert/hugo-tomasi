<template>
    <section :class="$style.root" class="container">
        <div v-if="slice.primary.title" :class="$style.title" class="text-body-s">{{ slice.primary.title }}</div>
        <v-skill v-for="(skill, i) in skillList" :key="i" v-bind="skill" :class="$style.skill" />
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { SkillsBlockSlice, SkillsBlockSliceDefaultItem } from '~~/prismicio-types'
import { VSkillProps } from '~/components/molecules/VSkill.vue'

export default Vue.extend({
    name: 'SkillsBlock',
    props: {
        slice: {
            type: Object as PropType<SkillsBlockSlice>,
            required: true,
        },
    },
    computed: {
        skillList(): VSkillProps[] {
            const items = this.slice.items as SkillsBlockSliceDefaultItem[]
            return items.map((item) => {
                return {
                    title: item.title,
                    content: item.content,
                    sideTitle: item.side_title,
                    additionalContent: item.side_content,
                }
            })
        },
    },
})
</script>
<style lang="scss" module>
.root {
    @include margin-block;
}

.title {
    margin-bottom: rem(50);
    opacity: 0.6;
    text-transform: uppercase;
}

.skill {
    margin-bottom: rem(42);

    @include media('>=md') {
        margin-bottom: rem(20);
    }
}
</style>
