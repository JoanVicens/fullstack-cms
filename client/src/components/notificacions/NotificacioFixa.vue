<template>
    <div class="container" v-bind:class="{hide: message == null}">
        <div class="notificacio" ref="notificacio">
            {{ message }}
            <XCircleIcon size="1x" class="is-button" v-on:click="dismissNotification"></XCircleIcon>
        </div>
    </div>
</template>


<script>
    import store from '../../store'
    import { XCircleIcon } from 'vue-feather-icons'
    
    export default {
        name: 'NotificacioFixa',
        components: { XCircleIcon },
        data() {
            return {
                store,
                message: null
            }
        },
        methods: {
            dismissNotification() {
                this.store.commit('dismissMessage')
                this.message = null
            },
            refreshMsg() {
                let message = this.store.getters.message
                this.message = message
            }
        },
        watch: {
            shouldHide: function() {
                return this.message != null
            }
        },
        mounted() {
            this.refreshMsg()

            this.store.subscribe( (mutation, state) => {
                if (mutation.type === 'saveMessage') {
                    this.refreshMsg()
                    let color = this.store.getters.color
                    if(this.$refs.notificacio) {
                        this.$refs.notificacio.style = `background-color: ${color}`
                    }
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .container.hide {
        display: none;
    }
    .notificacio {
        display: flex;
        font-size: 20px;
        border-radius: 5px;
        margin: 10px auto;
        padding: 5px 15px;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;   
    }
    .is-button {
        margin-left: auto;
    }
</style>