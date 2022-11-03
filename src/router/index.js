import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/user';

const requireAuthInicio = async (to, from, next) => {
  const userStore = useUserStore();
  const user = await userStore.currentUser();
  await userStore.personalRacda();
  if (user && user.emailVerified) {
      next();
  }

  else {
      next("/autenticacion");
  }
};

const authLogin = async (to, from, next) => {
  const userStore = useUserStore();
  const user = await userStore.currentUser();
  if (!user) {
    next();
  }

  else if (user && !user.emailVerified) {
    next();
  }

  else if (user && user.emailVerified) {
    next("/");
  }
};

const waitUser = async (to, from, next) => {
  const userStore = useUserStore();
  await userStore.currentUser();
    next();
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      beforeEnter: requireAuthInicio,
      component: () => import('../views/Inicio.vue')
    },
    {
      path: '/registro',
      name: 'registro',
      beforeEnter: authLogin,
      component: () => import('../views/Registro.vue')
    },
    {
      path: '/autenticacion',
      name: 'autenticacion',
      beforeEnter: authLogin,
      component: () => import('../views/Autenticacion.vue')
    },
    {
      path: '/usuario',
      name: 'usuario',
      beforeEnter: requireAuthInicio,
      component: () => import('../views/Usuario.vue')
    },
    {
      path: '/recuperacion',
      name: 'recuperacion',
      beforeEnter: waitUser,
      component: () => import('../views/Recuperacion.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      beforeEnter: requireAuthInicio,
      component: () => import('../views/Inicio.vue')
    }
  ]
});

export default router;
