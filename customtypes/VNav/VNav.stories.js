import VNav from '~/components/molecules/VNav/VNav.vue'

export default {
    component: VNav,
}

const Template = (_args, {argTypes}) => ({
    props: Object.keys(argTypes),
    template: `<VNav v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
