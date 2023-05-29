<template>
    <div v-if="word" :class="$style.root">
        <div
            v-for="(letter, i) in word"
            :key="i"
            :class="$style.letter"
            :style="{ '--letter-index': i }"
            :aria-content="letter"
        >
            {{ letter }}
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        word: String,
    },
})
</script>
<style lang="scss" module>
.root {
    position: relative;
    display: flex;
    overflow: hidden;
}

.letter {
    position: relative;
    display: block;
    opacity: 1;

    &::after {
        position: absolute;
        top: 0;
        left: 0;
        content: attr(aria-content);
        opacity: 0;
        transition: opacity 300ms calc(var(--letter-index) * 20ms) ease(out-quad);
        translate: 0 100%;
    }

    @media (hover: hover) {
        .root:hover & {
            animation: slide-up 350ms calc(var(--letter-index) * 20ms) ease(out-quad);
        }

        .root:hover &::after {
            opacity: 1;
        }
    }
}

@keyframes slide-up {
    to {
        translate: 0 -100%;
    }
}
</style>
