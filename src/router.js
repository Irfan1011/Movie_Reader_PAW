import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

function importComponent(path) {
  return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
  mode: "history",
  routes: [{
      path: "/",
      component: importComponent("DashboardLayout"),
      children: [
        //Home
        {
          path: "/home",
          name: "Home",
          meta: {
            title: 'Home'
          },
          component: importComponent("home"),
        },
        // Profile
        {
          path: "/profile",
          name: "Profile",
          meta: {
            title: 'Profile'
          },
          component: importComponent("DataMaster/Profile"),
        },
        // Create Article
        {
          path: "/article/create",
          name: "article-create",
          meta: {
            title: 'Create Article'
          },
          component: importComponent("Articles/create"),
        },
        // Show Article
        {
          path: "/article/show",
          name: "article-show",
          meta: {
            title: 'Show Article'
          },
          component: importComponent("Articles/show"),
        },
      ],
    },

    // Login
    {
      path: "/login",
      name: "Login",
      meta: {
        title: 'Login'
      },
      component: importComponent("Login"),
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
});

// set judul
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;