<template>
    <span id="botonsCompte">

        <MenuIcon size="2x" class="float-right hamburger" v-on:click="$emit('hamburger-clicked')" />

        <span class="buttons">
            <!-- NOT LOGGED -->
            <div v-if="!isLogged" style="margin-left: auto">
                <router-link :to="{ path: '/comptes/entrar', name:'login', params: {} }" class="btn btn-outline-light float-right mr-3">Entrar</router-link>
                <router-link :to="{ path: '/comptes/crear', name:'crearCompte', params: {} }" class="btn btn-outline-light float-right">Crear comopte</router-link>
            </div>

            <!-- LOGGED -->
            <div v-else>
                <router-link :to="{ path: '/compte/logout', name: 'logout', params: {} }" class="btn float-right">
                    <log-out-icon size="1.2x" class=""></log-out-icon>
                </router-link>
            </div>
        </span>

    </span>
</template>

<script>
    import store from '../../store.js';

    import { MenuIcon, LogOutIcon } from 'vue-feather-icons'


    export default {
        name: 'BotonsHeader',
        components: {
            MenuIcon, LogOutIcon
        },
        data() {
            return {
                store,
                isLogged: false
            }
        },
        mounted() {
            this.store.subscribe( (mutation, state) => {
                if (mutation.type === 'loggedMusic' || mutation.type === 'logoutMusic') {
                    this.isLogged = this.store.getters.isLogged
                }
            })
        }
    }
</script>
