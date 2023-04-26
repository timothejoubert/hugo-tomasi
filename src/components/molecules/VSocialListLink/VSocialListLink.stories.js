import VSocialListLink from '~/components/molecules/VSocialListLink/VSocialListLink.vue'
import MutationType from "~/constants/mutation-type";
import settingsData from '~/assets/storybook/settings-mock.json'

export default {
    component: VSocialListLink,
}

const Template = (_args, {argTypes}) => ({
    props: Object.keys(argTypes),
    created() {
        this.$store.commit(MutationType.SET_SETTINGS, settingsData)
    },
    template: `<v-social-list-link v-bind="$props" />`,
})

export const Default = Template.bind({})
Default.args = {}
