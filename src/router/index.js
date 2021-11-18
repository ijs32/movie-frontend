import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import createMovie from "../views/createMovie.vue";
import editMovie from "../views/editMovie.vue";
import showMovie from "../views/showMovie.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/createmovie",
    name: "createMovie",
    component: createMovie,
  },
  {
    path: "/movies/:id/edit",
    name: "editMovie",
    component: editMovie,
  },
  {
    path: "/movies/:id",
    name: "showMovie",
    component: showMovie,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
