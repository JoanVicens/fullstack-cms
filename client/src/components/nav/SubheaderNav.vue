<template>
    <aside class="subheader-nav">
        <div class="container">
            <CompteNav />
            <GestioNav v-if="store.getters.esJunta || store.getters.esAdmin" />
        </div>
    </aside>
</template>

<script>
    import CompteNav from './CompteNav';
    import GestioNav from './GestioNav';

    import store from '../../store.js'
    
    export default {
        name: 'SubheaderNav',
        components: { CompteNav, GestioNav },
        data() {
            return {
                store
            }
        }
    }
</script>

<style lang="scss">
    @import '../../sass/colors';

    .subheader-nav {
        margin: 0 auto;
        width: 100%;
        background-color: $medium-green;
        line-height: 1.5 !important;
        min-height: 50px;
        font-family: 'Quicksand';
        font-size: 1.2em;
        font-weight: 600;
        li:first-child { 
            margin-left: 0;
        }
        a {
            color: white !important;
            text-transform: uppercase;
            white-space: nowrap;
            padding: 16px 6px;
            &:hover {
                color: #444 !important;
            }
        }
    }

    #dropdown {
        a {
            color: #444 !important;
        }
        li {
            margin: 0 !important;
            padding: 15px 0 !important;
            &:hover {
                background-color: lightblue !important;
            }
        }
    }
</style>