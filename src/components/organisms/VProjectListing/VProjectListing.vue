<template>
    <div :class="$style.root">
        <div :class="$style.head">
            <div v-if="pageData.title">{{pageData.title}}</div>
            <div :class="$style.filters">mes filtres</div>
        </div>
        <div :class="$style.body">
            <ul :class="$style.projects">
                <li v-for="project in projects" :key="project.uid"  :class="$style.project">
                    <v-link :reference="project">
                        <v-project-card :project="project.data" />
                    </v-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import {ProjectDocument} from "~/types/prismic/prismic-types.generated";
import mixins from "vue-typed-mixins";
import PageDataProvider from "~/mixins/PageDataProvider";

export default mixins(PageDataProvider).extend({
    name: 'VProjectListing',
    computed: {
        projects(): ProjectDocument[] {
            return this.$store.state.projects
        },
    },
})
</script>

<style lang="scss" module>
.root {
    margin-top: rem(140);
}

.head {
    display: flex;
}

.filters {
    display: flex;
}

.body {
    margin-top: rem(20);
}

.projects {
    display: grid;
    grid-gap: rem(40);
    grid-template-columns: 1fr 1fr;
}

.project {
    width: 100%;
}

.image {
    width: 100%;
}
</style>
