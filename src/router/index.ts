import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "",
        component: DefaultLayout,
        children: [{
            name: "HomeView",
            path: "",
            component: () => import(/* webpackChunkName: "home-view" */ "../views/HomeView.vue")
        }]
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/AboutView.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
