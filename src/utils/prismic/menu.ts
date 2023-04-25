import {MainMenu, MenuItem} from "~/types/prismic/app-prismic";

export const getMenuLinkList = (mainMenu: MainMenu | undefined): MenuItem[] => {
    if (!mainMenu) return []
    return mainMenu.data.links as MenuItem[]
}
