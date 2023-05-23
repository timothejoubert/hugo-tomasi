import VDefaultPage from '~/components/organisms/VDefaultPage/VDefaultPage.vue'

export default {
    component: VDefaultPage,
}

const Template = (_args, {argTypes}) => ({
    props: Object.keys(argTypes),
    template: `<VDefaultPage v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
