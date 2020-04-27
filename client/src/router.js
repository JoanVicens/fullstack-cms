import Vue from 'vue';
import Router from 'vue-router';

import store  from "./store.js";

Vue.use(Router);

// Components
import LandingPage from './components/LandingPage.vue'
import Principal from './components/Principal.vue'
import Signin from './components/Signin.vue'
import Login from './components/Login.vue'
import Logout from './components/Logout.vue'

// Musics
import Actuacions from './components/Actuacions.vue'
import Assistencia from './components/Assistencia.vue'
import Configuracio from './components/Configuracio.vue'

// Junta
import Gestio from './components/Gestio.vue'

import ControlAssitencia from './components/privat/ControlAssitencia.vue'
import GestioAssajos from './components/privat/GestioAssajos.vue'
import GestioActuacions from './components/privat/GestioActuacions.vue'
import GestioCursos from './components/privat/GestioCursos.vue'
import GestioCredits from './components/privat/GestioCredits.vue'

import Error from './components/Error.vue'

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
    name: 'principal',
    component: Principal,
    meta: {
      titol: '',
      requiresAuth: true
    },
  },

  {
    path: '/actuacions',
    name: 'Actuacions',
    component: Actuacions,
    meta: {
      titol: 'Properes actuacions',
      requiresAuth: true
    }
  },

  {
    path: '/configuracio',
    name: 'Configuracio',
    component: Configuracio,
    meta: {
      titol: 'Configuració del compte',
      requiresAuth: true
    }
  },

  {
    path: '/gestio',
    name: 'gestio',
    component: Gestio,
    beforeEnter(to, from, next) {
      if(to.meta.requiresAuth) {
        console.log(store);
        if(store.state.logged && (store.state.junta || store.state.admin)) {
          next();
        } else {
          next('/principal');
        }
      } else {
        next();
      }
    },
    children: [
      {
        path: 'assitencia/:cursId:semestreId:assaigId',
        name: 'control_assitència',
        component: ControlAssitencia,
        meta: {
          titol: 'Control de la Assistència',
          requiresAuth: true
        }
      },
      {
        path: 'assitencia',
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
        path: 'assajos',
        name: 'gestió assajos',
        component: GestioAssajos,
        meta: {
          titol: 'Gestió dels assajos',
          requiresAuth: true
        }
      },

      {
        path: 'actuacions',
        name: 'gestió actuacions',
        component: GestioActuacions,
        meta: {
          titol: 'Gestió dels concerts',
          requiresAuth: true
        }
      },

      {
        path: 'cursos',
        name: '',
        component: GestioCursos,
        meta: {
          titol: 'Gestió dels cursos',
          requiresAuth: true
        }
      },

      {
        path: 'credits',
        name: '',
        component: GestioCredits,
        meta: {
          titol: 'Gestió dels credits',
          requiresAuth: true
        }
      },
    ]
  },

  {
    path: '/comptes/crear',
    name: 'crearCompte',
    component: Signin,
    meta: {
      titol: 'Associació Cultural Banda UJI',
      requiresAuth: false
    },
  },

  {
    path: '/comptes/entrar',
    name: 'login',
    component: Login,
    meta: {
      titol: 'Associació Cultural Banda UJI',
      requiresAuth: false
    },
  },

  {
    path: '/logout',
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
  },

  {
    path: '/r',
    name: 'error',
    component: Error,
    meta: {
      titol: '',
      requiresAuth: false
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
