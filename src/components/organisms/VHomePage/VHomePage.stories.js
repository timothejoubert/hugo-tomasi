import VHomePage from '~/components/organisms/VHomePage/VHomePage.vue'

export default {
    component: VHomePage,
}

const Template = (_args, {argTypes}) => ({
    props: Object.keys(argTypes),
    template: `<VHomePage v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
