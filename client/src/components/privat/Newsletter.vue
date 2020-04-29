<template lang="html">
  <main style="padding-bottom: 20px">
    <div class="container mb-5">
      <b-form @submit="enviar">
        <h4>Assumpte</h4>
        <b-form-input v-model="assumpte" placeholder="Assumpte" required></b-form-input>

        <h4 class="mt-4">
          Missatge
          <eye-off-icon size="1x" class="float-right mr-3" @click="mostrarMarkdonw = false" v-show="mostrarMarkdonw"></eye-off-icon>
          <eye-icon size="1x" class="float-right mr-3" @click="mostrarMarkdonw = true" v-show="!mostrarMarkdonw"></eye-icon>
        </h4>
        <div v-show="mostrarMarkdonw">
          <textarea class="form-control" v-model="markdown" required></textarea>
          <small class="text-muted float-right mt-2 mb-2">
            Accepta estils markdown
            <a href="https://www.markdownguide.org/basic-syntax/" target="_blank">
              <external-link-icon size="1.2x" class="custom-class"></external-link-icon>
            </a>
          </small>
        </div>

        <h4 class="mt-5">
          Previsualització
          <eye-off-icon size="1x" class="float-right mr-3" @click="mostrarParsed = false" v-show="mostrarParsed"></eye-off-icon>
          <eye-icon size="1x" class="float-right mr-3" @click="mostrarParsed = true" v-show="!mostrarParsed"></eye-icon>
        </h4>
        <vue-markdown :source="markdown" ref="html" class="previsualitzacio" v-show="mostrarParsed"></vue-markdown>


        <h4 class="mt-4">Adjuntar arxiu</h4>
        <b-form-file
          v-model="adjunts"
          placeholder="Tria un arxiu o arrastra'l aquí"
          drop-placeholder="Arrastra'l aquí"
          multiple
          ref="adjunts"

        ></b-form-file>

        <div class="mt-2 mb-2" style="height: 48px">
          <b-button @click="clearFiles" variant="dark" class="float-right">Borrar arxius</b-button>
        </div>

        <hr>

        <h4 class="mt-4">Enviar a</h4>
        <b-form-select v-model="filtroCorda" :options="cordes" disabled></b-form-select>

        <b-form-checkbox
          v-model="marcar"
          class="mt-3"
        >
          Marcar-lo a la pàgina principal
        </b-form-checkbox>

        <b-button type="submit" variant="primary" class="float-right btn-block mt-4">Enviar</b-button>
      </b-form>

      <div class="mb-4">

      </div>
    </div>
  </main>
</template>

<script>
  import VueMarkdown  from 'vue-markdown'
  import axios from 'axios'


  import { EyeOffIcon, EyeIcon, ExternalLinkIcon } from 'vue-feather-icons'

  export default {
    name: 'Newsletter',
    components: {
      VueMarkdown,
      EyeOffIcon,
      EyeIcon,
      ExternalLinkIcon
    },
    data() {
      return {
        adjunts: [],
        assumpte: '',
        filtroCorda: 'Tots',
        mostrarMarkdonw: true,
        mostrarParsed: false,
        markdown: '',
        marcar: false,
        cordes: [
          'Tots',
          'Clarinets',
          'Flautes',
          'Oboes',
          'Saxos',
          'Tubes',
          'Trombons',
          'Trompetes',
          'Percusionistes',
          'Trompes',
          'Fagotos',
          'Bombardins'
        ]
      }
    },
    methods: {
      clearFiles() {
        this.$refs['adjunts'].reset()
      },
      enviar(evt) {
        evt.preventDefault()

        let formData = new FormData();

        this.adjunts.forEach((adjunt, i) => {
          formData.append('adjunt-' + i, adjunt, adjunt.name)
        });

        console.log(typeof this.$refs.html.$el.innerHTML);

        formData.append('assumpte', this.assumpte)
        formData.append('html', this.$refs.html.$el.innerHTML)
        formData.append('filtroCorda', this.filtroCorda)
        formData.append('marcar', this.marcar)


        axios.post('/docs/newsletter', formData,
          {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
          console.log(response);
          this.clearFiles()
        })
        .catch(err => {
          console.error(err);
        })
      }
    },
    mounted() {
    }
  }
</script>

<style lang="sass" scoped>
  .previsualitzacio
    background-color: #eee
    padding: 15px
    border: 1px solid #ced4da
  textarea
    min-height: 350px

  .component-fade-enter-active,
  .component-fade-leave-active
    transition: opacity .3s ease

  .component-fade-enter,
  .component-fade-leave-to
    opacity: 0

  .custom-file-input:lang(en) ~ .custom-file-label::after
    content: 'Buscar'

</style>
