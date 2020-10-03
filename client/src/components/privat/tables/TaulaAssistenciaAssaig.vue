<template>
    <div>
        <b-table
            hover
            borderless 
            responsive
            selectable
            head-variant="dark"
            :items="llistaMusics"
            :fields="fields"
            ref="taula"
            :busy="busy"
            @row-clicked="attendanceToggled"
            >

            <!-- <template v-slot:cell(selected)="row">
                <b-form-group>
                <b-form-checkbox
                    v-model="row.item.selected"
                    :id="'checkbox' + row.item._id"
                    style="margin-left: 10px"
                ></b-form-checkbox>
                </b-form-group>
            </template> -->

        </b-table>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'TaulaAssistenciaAssaig',
        props: ['llistaMusics', 'busy'],
        data() {
            return {
                fields: [
                    // {
                    //     key: "has_attended",
                    //     label: "Assistència",
                    //     tdClass: 'td-music-table',
                    //     thClass: 'th-music-table'
                    // },
                    {
                        key: 'nom',
                        sortable: false,
                        tdClass: 'td-music-table',
                        thClass: 'th-music-table'
                    },
                    {
                        key: 'cognoms',
                        sortable: false,
                        tdClass: 'td-music-table',
                        thClass: 'th-music-table'
                    },
                    {
                        key: 'corda',
                        sortable: false,
                        tdClass: 'td-music-table',
                        thClass: 'th-music-table'
                    }
                ],
            }
        },
        methods: {
            shouldBeBusy() {
                return this.assaigId == 0
                console.log('aslñdkfj');
            },
            attendanceToggled(music) {
                music.has_attended = !music.has_attended
            },
            updateSelectedRows() {


                this.llistaMusics.forEach((element, index) => {
                    if(element.has_attended) {
                        this.$refs.taula.selectRow(index)
                    } else {
                        this.$refs.taula.unselectRow(index)
                    }
                });
            }
        },
        watch: {
            llistaMusics: function () {
                this.updateSelectedRows();
            }
        }
    }
</script>

<style lang="scss">
    .custom-input {
        width: 35px !important;
    }
</style>