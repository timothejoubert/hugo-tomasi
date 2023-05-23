import VProjectPage from '~/components/organisms/VProjectPage/VProjectPage.vue'

export default {
    component: VProjectPage,
}

const Template = (_args, {argTypes}) => ({
    props: Object.keys(argTypes),
    template: `<VProjectPage v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
