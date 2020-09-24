<template>
    <div class="" v-bind:class="{ pushright: name != null }">
        <span v-if="!isLogged" class="titols">
            <h2>Associació Cultural Banda UJI</h2>
            <h5>{{$route.name}}</h5>
        </span>
        <span v-else class="salute">
            <h3 class="mb-0">Hola, {{ name }}</h3>
        </span>
    </div>
</template>

<script>
    import store from '../../store.js';

    export default {
        name: 'TextHeader',
        components: { },
        data() {
            return {
                store,
                isLogged: false,
                name: null
            }
        },
        mounted() {
            this.name = localStorage.getItem('name')
            this.isLogged = this.store.getters.isLogged

            this.store.subscribe( (mutation, state) => {
                if (mutation.type === 'loggedMusic' || mutation.type === 'logoutMusic') {
                    this.isLogged = state.session.logged;
                    this.name = localStorage.getItem('name')
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .titols {
        display: block;
        font-family: Avenir !important;
    }
    .salute {
        font-family: 'Quicksand';
    }
    .pushright {
        margin-left: auto;
        margin-right: 25px;
        font-size: 1rem;
        line-height: 60px;
    }
</style>

