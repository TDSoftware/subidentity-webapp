import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import SecondaryLayout from "@/components/layouts/SecondaryLayout.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/identity",
        name: "",
        component: SecondaryLayout,
        children: [{
            name: "Identity.vue",
            path: "",
            component: () => import(/* webpackChunkName: "level-creator-page" */ "../views/IdentityView.vue")
        }]
    },
    {
        path: "/search",
        name: "",
        component: SecondaryLayout,
        children: [{
            name: "ListView.vue",
            path: "",
            component: () => import(/* webpackChunkName: "level-creator-page" */ "../views/ListView.vue")
        }]
    },
    {
        path: "/",
        name: "",
        component: DefaultLayout,
        children: [{
            name: "SearchView.vue",
            path: "",
            component: () => import(/* webpackChunkName: "home-view" */ "../views/SearchView.vue")
        }]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
