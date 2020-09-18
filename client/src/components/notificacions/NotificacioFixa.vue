<template>
    <div class="notificacio" ref="notificacio" v-bind:class="{hide: message == null}">
        <div class="container">
            <XCircleIcon size="1x" class="is-button dismiss-notification" v-on:click="dismissNotification"></XCircleIcon>
            {{ message }}
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
    .notificacio {
        display: block;
        line-height: 20px; 
        &.hide {
            display: none;
        }
    }
    .dismiss-notification {
        line-height: 20px; 
    }
    .container {
        padding: 20px
    }
</style>