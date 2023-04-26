import VImage from '~/components/molecules/VImage/VImage.vue'
import {createPrismicImage} from "~/utils/storybook/create-prismic-image";

export default {
    component: VImage,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    data() {
        return {
            prismicImage: createPrismicImage(),
        }
    },
    template: `<v-image v-bind="$props" :prismic-image="prismicImage"/>`,
})



export const Default = Template.bind()
Default.args = {}
