import { createRouter, createWebHistory, NavigationHookAfter, RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import SecondaryLayout from "@/components/layouts/SecondaryLayout.vue";
import { getScrollPosition } from "@/util/scroll";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/chain/:chain/identity/:address",
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

/**
 * After page/view change scroll to page top or position when last viewed page
 */
const scrollPositions: { [key: string]: number } = {};
router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    scrollPositions[from.fullPath] = getScrollPosition();
    setTimeout(() => {
        window.scrollTo(0, scrollPositions[to.fullPath] ?? 0);
    });
});

export default router;
