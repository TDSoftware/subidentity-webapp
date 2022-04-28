import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";

const routes: Array<RouteRecordRaw> = [
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
