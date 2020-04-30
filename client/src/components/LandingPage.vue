<template lang="html">
  <main style="background-color: #fff; max-width: 100%">
    <!-- <div class="container">
      <b-alert variant="success" :show="alertSucces">{{msg}}</b-alert>
      <b-alert variant="warning" :show="$route.params.msgError">{{$route.params.msgError}}</b-alert>

    </div> -->
    <div class="">
      <div id="headerL">
        <a href="#cartells" class="quadrat familia">
        </a>
        <a href="#experiencia" class="quadrat experiencies">
        </a>
        <a href="#descripcio" class="quadrat rectangle barcelona">
        </a>
      </div>
    </div>


    <div id="descripcio" class="apartat">
      <div class="container">
        <h2>FORMAR PART DE LA BANDA</h2>
        <p>
          Si eres membre de la comunitat universitària i toques algun instrument, com ara el saxo, la percussió, fagot, clarinet, flauta, trombó, tuba, o els que semblants que tradicionalment formen part d'una banda de música, no ho dubtes i forma part de la nostra associació, per fer promoció i imatge de la música en la Universitat. Intentarem fer concerts tant fora com dins de la nostra província, i fer de la música el nostre punt d'unió.
        </p>
        <p>
          La quota com a soci té un cost anual de tan sols 5 €, que utilitzem per a compra de material, fer intercanvis amb altres bandes, entre altres.
        </p>
        <p>
          Si estàs interessat no dubtes en contactar amb nosaltres, mitjançant el correu: bandauji@uji.es
        </p>
      </div>
    </div>

    <div id="cartells" class="apartat">
      <div class="container">
        <h2>VARIETAT D'ACTUACIONS</h2>
        <p>
          Durant tot el curs realizem tot tipus d'actuacions, desde passacarrers fins a concerts simfònics
        </p>
        <div class="row">
          <div class="col-lg-4 col-sm-6 col-12 mb-3 mt-3">
            <img src="../assets/compassos.jpeg" class="img-fluid" alt="cartell Els compassos de la nostra música">
          </div>
          <div class="col-lg-4 d-sm-none d-lg-block col-sm-6 col-12 mb-3 mt-3">
            <img src="../assets/santa-cecilia.jpeg" class="img-fluid" alt="cartell Santa Cecília Castello 2019">
          </div>
          <div class="col-lg-4 col-sm-6 col-12 mb-3 mt-3">
            <img src="../assets/nadal.jpeg" class="img-fluid" alt="cartell Santa Cecília Castello 2019">
          </div>
        </div>
      </div>
    </div>

    <div id="experiencia" class="apartat">
      <div class="container">
        <h2>UNA EXPERIÈNCIA ÚNICA</h2>
        <p>A la banda de la UJI sempre intentem dur a terme concerts innovadors i realitzar projectes més enllà del habitual en una banda</p>

        <vue-plyr>
          <video poster="../assets/banda.jpg" src="../assets/doblatge_banda_uji.mp4">
            <source src="../assets/doblatge_banda_uji.mp4" type="video/mp4" size="1440">
          </video>
        </vue-plyr>
      </div>
    </div>

    <div id="familia" class="apartat display-2">
      <span>
        <animated-number
          :value="80"
          :duration="1500"
          :round="1"
        />
       + músics han passat per la banda UJI
      </span>
    </div>

    <div id="menador" class="apartat">
      <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <img src="../assets/menador.jpg" class="img-fluid" alt="cartell menador">
          </div>

          <div class="col-sm-8 info">
            <h3>Tens interès per la música i és una de les teves activitats pendents?</h3>
            <p>

              Des de la Banda de la UJI t'ajudem. Amb el Curs, per aprendre música, tots els dilluns de 19 a 20.30 de la vesprada, per tan sol 15€ al mes, amb reconeixement d'un crèdit per semestre i més prop de la ciutat de Castelló, realitzat en el Menador (antic edifici d'Hisenda). No ho dubtis, la música pot ser la teva activitat complementària, Apunta't!! Més informació al nostre correu
             </p>
          </div>

        </div>

      </div>
    </div>

    <div id="footer">
      <div id="contacte" class="container">
        <a href="https://www.instagram.com/bandauji/" target="_blank">
          <InstagramIcon size="1.3x" />
        </a>
        <a href="https://www.facebook.com/AssociacioCulturalBandaUJI/" target="_blank">
          <FacebookIcon size="1.3x" />
        </a>
        <a href="https://www.youtube.com/channel/UCe8CsHaWOy4_eUID3A3ACew" target="_blank">
          <YoutubeIcon size="1.3x" />
        </a>
        <a href="mailto:bandauji@uji.es" target="_blank">
          <MailIcon size="1.3x" />
        </a>
      </div>


      <div class="copyright">Copyright (c) 2020 Copyright Holder All Rights Reserved.</div>
    </div>



    <!-- https://www.youtube.com/watch?v=RwsnrDpfFn4 -->
    <!-- <div class="display-1">
      LANDIGN PAGE
    </div>
    <small>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </small> -->
  </main>
</template>

<script>
  import AnimatedNumber from "animated-number-vue";
  import { InstagramIcon, FacebookIcon, MailIcon, YoutubeIcon } from 'vue-feather-icons'

  export default {
    name: 'landingPage',
    props: ['msg', 'msgError'],
    components: {
      AnimatedNumber,
      InstagramIcon,
      FacebookIcon,
      MailIcon,
      YoutubeIcon
    },
    data() {
      return {
        alertSucces: false,
        alertWarning: false,
      }
    },
    mounted() {
      if(this.msg !== undefined)
        this.alertSucces = true

      if(this.msgError !== undefined)
        this.alertWarning = true
    }
  }
</script>

<style lang="sass" scoped>
  @import '../../node_modules/bootstrap/scss/bootstrap'

  #headerL
    height: calc(100vh - 80px)
    width: 100%
    background-color: #00323F
    display: grid
    grid-template-columns: calc(50% - 1px) calc(50% - 1px)
    grid-template-rows: calc(50% - 1px) calc(50% - 1px)
    @include media-breakpoint-only(xs)
      grid-template-columns: 100%
      grid-template-rows: auto auto auto

  .quadrat
    background-size: cover
    background-position: center
    border: 1px solid black
    width: 100%
    height: 100%
    -webkit-box-shadow: inset 0px 0px 250px 100px rgba(0,0,0,0.75)
    -moz-box-shadow: inset 0px 0px 250px 100px rgba(0,0,0,0.75)
    box-shadow: inset 0px 0px 250px 100px rgba(0,0,0,0.75)
    cursor: pointer
    transition: box-shadow .6s cubic-bezier(.39,.58,.57,1)
    &:hover
      -webkit-box-shadow: inset 0px 0px 100px 40px rgba(0,0,0,0.75)
      -moz-box-shadow: inset 0px 0px 100px 40px rgba(0,0,0,0.75)
      box-shadow: inset 0px 0px 100px 40px rgba(0,0,0,0.75)
    &::after
      width: 100%
      height: 100%
      background-color: #2224
      display: inline-flex
      align-items: center
      justify-content: center
      text-align: center
      color: #fff
      font-size: 2em
      font-weight: bold
      padding: 50px
      padding-bottom: 80px
    &:hover::after
      background-color: #2223

  .rectangle
    grid-column-start: 1
    grid-column-end: 3
    @include media-breakpoint-only(xs)
      grid-column-start: 1
      grid-column-end: 2

  .familia
    background-image: url('../assets/cercavila.jpg')
    &::after
      content: "VARIETAT D'ACTUACIONS"

  .experiencies
    background-image: url('../assets/games.jpg')
    &::after
      content: "UNA EXPERIÈNCIA ÚNICA"

  .barcelona
    background-image: url('../assets/barcelona.jpg')
    background-position: 50% 66%
    &::after
      content: "FORMA PART D'UNA GRAN FAMÍLIA"

  .apartat
    background-color: #EAEAEA
    padding: 30px
    font-size: 1.3em
    box-sizing: border-box

  #descripcio
    padding: 25px 0
    background-color: #EAEAEA
    color: #00323F

  #cartells
    background: #8884 url('../assets/paranimf.jpg')
    background-blend-mode: lighten
    background-position: center
    background-size: cover
    background-repeat: no-repeat
    padding: 30px 0
    color: #EAEAEA
    overflow: hidden
    p
      font-weight: bolder
      -webkit-text-stroke-width: 1px
      -webkit-text-stroke-color: black
      text-shadow: 1px 1px 1px black
    h2
      margin-bottom: 10px


  #menador
    background-color: #EAEAEA
    padding: 30px 0
    h3
      font-size: 1.6em
      margin-bottom: 6px
    .info
      padding: 0 20px

  #experiencia
    background-color: #EAEAEA
    padding: 30px

  #familia
    padding: 50px 30px
    background-color: #00323F
    grid-template-columns: 50% 50%
    color: #EAEAEA
    align-items: center
    justify-content: center
    font-size: 4.5rem
    text-align: center
    -webkit-box-shadow: inset 2px -3px 68px 12px rgba(0,0,0,0.68)
    -moz-box-shadow: inset 2px -3px 68px 12px rgba(0,0,0,0.68)
    box-shadow: inset 2px -3px 68px 12px rgba(0,0,0,0.68)


  #footer
    min-height: 200px
    background-color: #017C72
    color: #EAEAEA
    display: flex
    flex-direction: column
    justify-content: space-between
    padding-bottom: 20px
    #contacte
      box-sizing: border-box

      padding: 10px 20px
      padding-top: 30px

      display: flex
      justify-content: center
      align-items: center
      a
        color: #444
        margin: 0 15px
        a:hover
          color: #fff
    .copyright
      line-height: 1.5em
      text-align: center




</style>
