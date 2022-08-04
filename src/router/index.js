// 1.Dependency
import {
    createRouter,
    // createWebHistory,
    createWebHashHistory,
} from "vue-router";

// 2.Components
const Index = () => import("../views/Index.vue");
const Storybook = () => import("../views/Storybook.vue");

// 3.Routes
const routes = [
    { path: "/", component: Index },
    { path: "/storybook", component: Storybook },
];

// 4.Build An Instance
const router = createRouter({
    history: createWebHashHistory(), //hash
    // history: createWebHistory(), //history api
    // base : '/rewrite root',
    routes,
});

export default router;
