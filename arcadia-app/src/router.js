import Vue from "vue";
import VueRouter from "vue-router";
import MainWebSite from "./components/MainWebSite.vue";
import Main from "./components/ArcadiaApp/Main.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "MainWebSite",
    component: MainWebSite,
  },
  {
    path: "/arcadia",
    name: "Main",
    component: Main,
    children: [
      {
        name: 'Marcas',
        path: 'brands/',
        component: () => import('@/components/ArcadiaApp/Brands'),
      },
      {
        name: 'Categorías',
        path: 'categories/',
        component: () => import('@/components/ArcadiaApp/Categories'),
      },
      {
        name: 'Componentes',
        path: 'components/',
        component: () => import('@/components/ArcadiaApp/Components'),
      },
    ]
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
