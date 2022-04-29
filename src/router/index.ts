import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";

const NavigationItems = [
    {
        id: 1,
        title: "Start",
        link: "/",
        internal: true
    },
    {
        id: 2,
        title: "Imprint",
        link: "/imprint",
        internal: true
    },
    {
        id: 3,
        title: "Disclaimer",
        link: "/disclaimer",
        internal: true
    },
    {
        id: 4,
        title: "Privacy",
        link: "/privacy",
        internal: true
    },
    {
        id: 5,
        title: "Cookie",
        link: "/cookie",
        internal: true
    },
    {
        id: 6,
        title: "Settings",
        link: "/settings",
        internal: true
    }
];

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "",
        component: DefaultLayout,
        children: [{
            name: "SearchView.vue",
            path: "",
            component: () => import(/* webpackChunkName: "home-view" */ "../views/SearchView.vue"),
            meta: {navigation: NavigationItems}
        }]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
