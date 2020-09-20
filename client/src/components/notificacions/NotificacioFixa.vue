<template>
    <div class="container" v-bind:class="{ hide: shouldHide }">
        <div class="notificacio" ref="notificacio">
            {{ message }}
            <span class="is-button btn btn-light btn-sm action" v-if="action != null" v-on:click="actionPresed"> seguir</span>
            <XCircleIcon size="1x" class="is-button close" v-on:click="dismissNotification"></XCircleIcon>
        </div>
    </div>
</template>


<script>
    import store from '../../store'
    import router from '../../router'
    import { XCircleIcon } from 'vue-feather-icons'
    
    export default {
        name: 'NotificacioFixa',
        components: { XCircleIcon },
        data() {
            return {
                store,
                message: null,
                shouldHide: true,
                action: null
            }
        },
        methods: {
            dismissNotification() {
                this.store.commit('dismissMessage')
                this.$refs.notificacio.classList.remove(this.currentClassName)
                this.message = null
            },
            refreshMsg() {
                let message = this.store.getters.message
                this.message = message
                if(this.store.getters.action) {
                    this.action = this.store.getters.action
                }
            },
            actionPresed() {
                $router.push(action)
                this.dismissNotification()
            }
        },
        watch: {
            message: function() {
                this.shouldHide = this.message == null
            }
        },
        mounted() {
            this.refreshMsg()

            this.store.subscribe( (mutation, state) => {
                if (mutation.type === 'saveMessage') {
                    this.refreshMsg()
                    this.currentClassName = this.store.getters.class;
                    if(this.$refs.notificacio) {
                        this.$refs.notificacio.classList.add(this.currentClassName)
                        window.scrollTo(0,0);
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
    .close {
        margin-left: auto;
    }
    .action {
        margin-left: 15px;
    }
</style>