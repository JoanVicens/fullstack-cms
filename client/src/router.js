import Vue from 'vue';
import Router from 'vue-router';

import { store } from "./store.js";

Vue.use(Router);

// Components
import LandingPage from './components/LandingPage.vue'
import Principal from './components/Principal.vue'
import Signin from './components/Signin.vue'
import Assistencia from './components/Assistencia.vue'
import Login from './components/Login.vue'
import Logout from './components/Logout.vue'

import ControlAssitencia from './components/privat/ControlAssitencia.vue'
import GestioAssajos from './components/privat/GestioAssajos.vue'
import GestioActuacions from './components/privat/GestioActuacions.vue'
import GestioCursos from './components/privat/GestioCursos.vue'

const routes = [
  {
    path: '/',
    name:'landingPage',
    component: LandingPage,
    meta: {
      titol: 'BANDA UJI',
      requiresAuth: false
    }
  },

  {
    path: '/principal',
    name:'principal',
    component: Principal,
    meta: {
      titol: '',
      requiresAuth: true
    },
  },

  {
    path: '/control_assitencia/:cursId:semestreId:assaigId',
    name: 'control_assitència',
    component: ControlAssitencia,
    meta: {
      titol: 'Control de la Assistència',
      requiresAuth: true
    }
  },
  {
    path: '/control_assitencia/',
    name: 'control assitència',
    component: ControlAssitencia,
    meta: {
      titol: 'Control de la Assistència',
      requiresAuth: true
    },
    props: {
      default: true,
      sidebar: false
    }
  },

  {
    path: '/gestio_assajos',
    name: 'gestió assajos',
    component: GestioAssajos,
    meta: {
      titol: 'Gestió dels assajos',
      requiresAuth: true
    }
  },

  {
    path: '/gestio_concerts',
    name: 'gestió concerts',
    component: GestioActuacions,
    meta: {
      titol: 'Gestió dels concerts',
      requiresAuth: true
    }
  },

  {
    path: '/gestio_cursos',
    name: '',
    component: GestioCursos,
    meta: {
      titol: 'Gestió dels cursos',
      requiresAuth: true
    }
  },

  {
    path: '/signin',
    name: 'signin',
    component: Signin,
    meta: {
      titol: 'Crear compte'
    },
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      titol: 'Accedir al compte'
    },
  },

  {
    path: '/Logout',
    name: 'logout',
    component: Logout,
    meta: {
      titol: 'Tancar sessió',
      requiresAuth: true
    },
  },

  {
    path: '/assistencia',
    name: 'assistencia',
    component: Assistencia,
    meta: {
      titol: 'Assistència',
      requiresAuth: true
    },
  }
]



const router = new Router({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    if(store.getters.isLogged) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
})

export default router
