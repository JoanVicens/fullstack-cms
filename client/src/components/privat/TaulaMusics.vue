<template>
    <section>
        <b-form-group
            label-size="sm"
            label-for="filterInput"
            class="mr-4 ml-4"
            >
                <b-input-group size="sm">
                    <b-form-input
                    v-model="filter"
                    type="search"
                    id="filterInput"
                    placeholder="filtrar"
                    ></b-form-input>
                    <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">Esborra</b-button>
                    </b-input-group-append>
                </b-input-group>
        </b-form-group>

        <div class="taula-wrapper">
            <b-table
                hover
                borderless 
                responsive 
                :items="llistat" 
                :fields="fields"
                :filter="filter"
                @row-clicked="filaSeleccionada"
                thClass="cell"
                tdClass="cell"
                ref="taula">
                <template v-slot:cell(tipo_compte)="data">
                    <div>
                        <div class="badge badge-primary" v-if="data.value === 0">normal</div>
                        <div class="badge badge-info" v-if="data.value === 1">junta</div>
                        <div class="badge badge-danger" v-if="data.value === 2">president</div>
                        <div class="badge badge-dark" v-if="data.value === 3">admin</div>
                    </div>
                </template>

                <template v-slot:cell(compte_actiu)="data">
                    <div>
                        <span class="badge badge-success" v-if="data.value">actiu</span>
                        <span class="badge badge-warning" v-else>no actiu</span>
                    </div>
                </template>
                
                <template v-slot:cell(llista_correu)="data">
                    <div>
                        <span class="badge badge-success" v-if="data.value">si</span>
                        <span class="badge badge-warning" v-else>no</span>
                    </div>
                </template>

                <template v-slot:row-details="row">
                    <b-card>
                    <ul>
                        <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                    </ul>
                    </b-card>
                </template>

            </b-table>
        </div>
        <AccionsMusic 
            :music="music"
            v-on:change-type="changeType"
            v-on:resend-verification-email="resendVerificationEmail"
            v-on:change-state="changeState"
        />
    </section>
</template>

<script>
    import Axios from 'axios'
    import AccionsMusic from './formularis/AccionsMusic'

    export default {
        name: 'TaulaMusics',
        props: ['llistat'],
        components: { AccionsMusic },
        data() {
            return {
                fields: [
                    {
                        key: 'nom',
                        sortable: true,
                        tdClass: 'td-music-table',
                        thClass: 'th-music-table'
                    },
                    {
                        key: 'cognoms',
                        sortable: true,
                        tdClass: 'td-music-table',
                        thClass: 'th-music-table'
                    },
                    {
                        key: 'corda',
                        sortable: true,
                        tdClass: 'td-music-table',
                        thClass: 'th-music-table'
                    },
                    {
                        label: 'Tipus de compte',
                        key: 'tipo_compte',
                        sortable: true,
                        tdClass: 'td-music-table',
                        thClass: 'th-music-table'
                    },
                    {
                        label: 'Compte actiu',
                        key: 'compte_actiu',
                        sortable: true,
                        tdClass: 'td-music-table',
                        thClass: 'th-music-table'
                    },
                    {
                        label: 'Subscrit al newsletter',
                        key: 'llista_correu',
                        sortable: true,
                        tdClass: 'td-music-table',
                        thClass: 'th-music-table'
                    }
                ],
                filter: null,
                music: null
            }
        },
        watch: {
            llistat: function () {
                this.$refs.taula.refresh();
            }
        },
        methods: {
            filaSeleccionada: function (music, index) {
                this.music = music
                this.$bvModal.show('accionsMusic')
            },
            changeType: function(musicId, code) {
                Axios.put(`/info/music/${musicId}`, {action: 'CHANGE_TYPE', code})
                .then(response => {
                    this.$emit('require-reload')
                })
                .catch(console.error)

                this.$bvModal.hide('accionsMusic')
            },
            changeState: function(musicId, activate) {
                const action = activate ? 'ACTIVATE_ACOUNT' : 'DISABLE_ACOUNT';

                Axios.put(`/info/music/${musicId}`, { action })
                .then(response => {
                    this.$emit('require-reload')
                })
                .catch(console.error)

                this.$bvModal.hide('accionsMusic')
            },
            resendVerificationEmail: function(musicId) {
                Axios.get(`/info/music/resendemail/${musicId}`)
                .then(response => {
                    //
                })
                .catch(console.error)
                
                this.$bvModal.hide('accionsMusic')
            }
        }
    }
</script>

<style lang="scss">
    @import '../../sass/colors';

    .td-music-table {
        padding: 1px !important;
        &:hover {
            cursor: pointer;
        }
    }
    .th-music-table {
        font-family: 'Roboto';
        border-bottom: 1px solid $coffe !important;
        padding: 0 !important;
        padding-left: .2rem !important;
    }


    .taula-wrapper {
        background-color: white;
        margin: 0 -14px;
        line-height: 2;
    }

</style>