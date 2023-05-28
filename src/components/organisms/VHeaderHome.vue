<template>
    <div :class="$style.root">
        <div>test</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'VHeaderHome',
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
