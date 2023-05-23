import VLink from '~/components/molecules/VLink/VLink.vue'

export default {
    component: VLink,
}

const Template = (_args, {argTypes}) => ({
    props: Object.keys(argTypes),
    template: `<VLink v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
