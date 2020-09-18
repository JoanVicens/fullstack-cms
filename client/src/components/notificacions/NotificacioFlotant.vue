<template>
    <div class="notificacio">
        <XCircleIcon size="1.5x" class=""></XCircleIcon>
        añlskdjfñalskdjfañslkdj
    </div>
</template>


<script>
    import { XCircleIcon } from 'vue-feather-icons'
    
    export default {
        name: 'Notificacio',
        components: { XCircleIcon }
    }
</script>

<style lang="sass" scoped>
    .notificacio
        position: absolute
        bottom: 40px
        right: 40px
        padding: 10px 26px !important
        margin-top: 25px
        border-radius: 5px
</style>
