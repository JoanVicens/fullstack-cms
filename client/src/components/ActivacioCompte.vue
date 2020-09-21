<template>
    <div class="container notificacio" v-bind:class="tipo_notificacio">
        {{ message }}
    </div>
</template>

<script>
import Axios from 'axios';
    export default {
        name: 'ActivacioCompte',
        data() {
            return {
                message: '',
                tipo_notificacio: ''
            }
        },
        created() {
            const token = this.$route.params.token;
            if(token) {
                Axios.get(`/auth/activate/${token}`)
                .then(response => {
                    this.message = response.data.message
                    this.tipo_notificacio = 'succes'
                })
                .catch(err => {
                    console.log(err)
                    this.message = err
                    this.tipo_notificacio = 'error'
                })
            }
        }   
    }
</script>