<template>
    <b-modal
        id="accionsMusic"
        :title="nom_cognoms(music)"
        hide-footer
        size="lg">
            <div class="accions-compte">
                <h5>Accions del compte</h5>
                <ul>
                    <li v-if="true" @click="$emit('resend-verification-email', music._id)" class="is-button">
                        Reenviar correu verificació
                    </li>
                    <li v-if="music.compte_actiu" @click="$emit('change-state', music._id, false)" class="is-button">
                        Desactivar compte
                    </li>
                    <li v-else @click="$emit('change-state', music._id, true)" class="is-button">
                        Activar compte
                    </li>
                </ul>
            </div>
            <div class="tipus-compte">
                <h5>Canvia el tipo de compte</h5>

                <ul>
                    <li @click="$emit('change-type', music._id, 0)" v-if="music.tipo_compte != 0" class="is-button">normal</li> 
                    <li @click="$emit('change-type', music._id, 1)" v-if="music.tipo_compte != 1" class="is-button">junta</li> 
                    <li @click="$emit('change-type', music._id, 2)" v-if="music.tipo_compte != 2" class="is-button">president</li> 
                    <li @click="$emit('change-type', music._id, 3)" v-if="music.tipo_compte != 3" class="is-button">admin</li> 
                </ul>
            </div>            
    </b-modal>
</template>

<script>
    export default {
        name: 'AccionsMusic',
        props: ['music'],
        methods: {
            nom_cognoms(music) {
                return music ? `${music.nom} ${music.cognoms}` : ''
            }
            
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../sass/botons';
    @import '../../../sass/colors';

    .info-compte {
        font-family: 'Roboto';
        font-size: 1.7rem;
    }
    ul {
        width: 100%;
        padding: 0;
        display: flex !important;
        flex-direction: column;
        li {
            width: 100%;
            margin: 0;
            &:hover {
                background-color: $gris-clar;
            }
        }
    }
    .accions-compte,
    .tipus-compte {
        width: 100%;
        margin-top: 20px;
    }
</style>