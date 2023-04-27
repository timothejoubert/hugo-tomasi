import VTopBar from '~/components/organisms/VTopBar/VTopBar.vue'

export default {
    component: VTopBar,
}

const Template = (_args, {argTypes}) => ({
    props: Object.keys(argTypes),
    template: `<VTopBar v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
