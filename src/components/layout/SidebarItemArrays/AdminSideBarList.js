import { iHomeNormal, iHomeSelected, iSettingsNormal, iSettingsSelected } from "../../../app/utility/imageImports";

const AdminSideBarList = [
    //home
    {
        onClick: () => { },
        title: "admin home",
        linkTo: "/",
        isActiveLink: "home",
        normalIcon: iHomeNormal,
        selectedIcon: iHomeSelected,
    },


    {
        onClick: () => { },
        title: "user",
        isActiveLink: "expanded_banner",
        normalIcon: iSettingsNormal,
        selectedIcon: iSettingsSelected,
        expandedItems: [
            {
                title: "customers",
                link: "/user/customer",
                normalIcon: iSettingsNormal,
                selectedIcon: iSettingsSelected,
                isActiveItem: false,
            },
            {
                title: "companies",
                link: "/user/company",
                normalIcon: iSettingsNormal,
                selectedIcon: iSettingsSelected,
                isActiveItem: false,
            },
            {
                title: "drivers",
                link: "/user/driver",
                normalIcon: iSettingsNormal,
                selectedIcon: iSettingsSelected,
                isActiveItem: false,
            },

        ],
    },
    {
        onClick: () => { },
        title: "banner",
        linkTo: "/banner",
        isActiveLink: "banner",
        normalIcon: iSettingsNormal,
        selectedIcon: iSettingsSelected,
    },


    {
        onClick: () => { },
        title: "license",
        isActiveLink: "expanded_license",
        normalIcon: iSettingsNormal,
        selectedIcon: iSettingsSelected,
        expandedItems: [
            {
                title: "application",
                link: "/license/application",
                normalIcon: iSettingsNormal,
                selectedIcon: iSettingsSelected,
                isActiveItem: false,
            },
            {
                title: "package",
                link: "/license/package",
                normalIcon: iSettingsNormal,
                selectedIcon: iSettingsSelected,
                isActiveItem: false,
            },
        ],
    },

    {
        onClick: () => { },
        title: "contact us",
        isActiveLink: "expanded_contact",
        normalIcon: iSettingsNormal,
        selectedIcon: iSettingsSelected,
        expandedItems: [
            {
                title: "app",
                link: "/contact/app",
                normalIcon: iSettingsNormal,
                selectedIcon: iSettingsSelected,
                isActiveItem: false,
            },
            {
                title: "web",
                link: "/contact/web",
                normalIcon: iSettingsNormal,
                selectedIcon: iSettingsSelected,
                isActiveItem: false,
            },
        ],
    },

    {
        onClick: () => { },
        title: "settings",
        linkTo: "/settings",
        isActiveLink: "settings",
        normalIcon: iSettingsNormal,
        selectedIcon: iSettingsSelected,
    },

]

export default AdminSideBarList;