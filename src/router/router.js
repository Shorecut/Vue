import About from "@/pages/About.vue";
import Main from "@/pages/Main.vue";
import PostIdPage from "@/pages/PostIdPage.vue";
import PostPage from "@/pages/PostPage.vue";
import PostPageComApi from "@/pages/PostPageComApi.vue";
import PostStorePage from "@/pages/PostStorePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/posts",
    component: PostPage,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/posts/:id",
    component: PostIdPage,
  },
  {
    path: "/store",
    component: PostStorePage,
  },
  {
    path: "/comApi",
    component: PostPageComApi,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
