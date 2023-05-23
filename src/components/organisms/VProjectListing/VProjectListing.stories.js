import VProjectListing from '~/components/organisms/VProjectListing/VProjectListing.vue'

export default {
    component: VProjectListing,
}

const Template = (_args, {argTypes}) => ({
    props: Object.keys(argTypes),
    template: `<VProjectListing v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
