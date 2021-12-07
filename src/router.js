import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
  return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
  mode: "history",
  routes: [{
      path: "/main",
      component: importComponent("DashboardLayout"),
      children: [
        //Home
        {
          path: "/home",
          name: "Home",
          meta: {
            title: "Home",
          },
          component: importComponent("home"),
        },
        // Profile unused
        // {
        //   path: "/profile",
        //   name: "Profile",
        //   meta: {
        //     title: "Profile",
        //   },
        //   component: importComponent("DataMaster/Profile"),
        // },
        // Profile Layout
        {
          path: "/profileLayout",
          name: "Profile",
          meta: {
            title: "Profile",
          },
          component: importComponent("DataMaster/ProfileLayout"),
        },
        // Create Article
        {
          path: "/article/create",
          name: "article-create",
          meta: {
            title: "Create Article",
          },
          component: importComponent("Articles/create"),
        },
        // Show Article
        {
          path: "/article/show",
          name: "article-show",
          meta: {
            title: "Show Article",
          },
          component: importComponent("Articles/show"),
        },
        // Edit Article
        {
          path: "/article/edit",
          name: "article-edit",
          meta: {
            title: "Edit Article",
          },
          component: importComponent("Articles/edit"),
        }
      ],
    },

    // Login
    {
      path: "/login",
      name: "Login",
      meta: {
        title: "Login",
      },
      component: importComponent("Login/LoginForm"),
    },
    // Register
    {
      path: "/register",
      name: "Register",
      meta: {
        title: "Register",
      },
      component: importComponent("Login/RegisterForm"),
    },
    // Dashboard
    {
      path: "/dashboard",
      name: "Dashboard",
      meta: {
        title: "Dashboard",
      },
      component: importComponent("Dashboard"),
    },
    {
      path: "*",
      redirect: "/dashboard",
    },
  ],
});

// set judul
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;