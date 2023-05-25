import VStylePreview from '~/components/atoms/VStylePreview/VStylePreview.vue'

export default {
    component: VStylePreview,
}

const Template = (_args, {argTypes}) => ({
    props: Object.keys(argTypes),
    template: `<VStylePreview v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
