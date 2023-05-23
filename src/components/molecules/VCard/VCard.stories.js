import VCard from '~/components/molecules/VCard/VCard.vue'

export default {
    component: VCard,
}

const Template = (_args, {argTypes}) => ({
    props: Object.keys(argTypes),
    template: `<VCard v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
