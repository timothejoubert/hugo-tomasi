import VLangSwitch from '~/components/molecules/VLangSwitch/VLangSwitch.vue'

export default {
    component: VLangSwitch,
}

const Template = (_args, {argTypes}) => ({
    props: Object.keys(argTypes),
    template: `<VLangSwitch v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
