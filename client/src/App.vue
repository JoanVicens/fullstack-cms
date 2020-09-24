<template>
	<div id="app" ref="root">
		<Header v-on:hamburger-clicked="toggleSidebar" />
		<div id="content" ref="content">
			<SideNavbar ref="sidebar" v-on:close-clicked="toggleSidebar" />
			<router-view></router-view>
		</div>
		<NotificacioFlotant style="display: none" />
		<div class="overlay" v-on:click="toggleSidebar" ref="overlay"></div>
	</div>
</template>

<script>
	import NotificacioFlotant from './components/notificacions/NotificacioFlotant.vue'
	import SideNavbar from './components/nav/SideNavbar.vue'
	import Header from './components/header/Header.vue'

	import store from './store.js'

	import Vue from 'vue';

	export default {
		name: 'App',
		components: {
			NotificacioFlotant,
			SideNavbar,
			Header
		},
		data() {
			return {
				showSidebar: false,
				sidebar,
				overlay,
				content,
			}
		},
		methods: {
			checkLoggedUser() {
					if(this.$session.exists('token')) {
						const token = this.$session.get('token')
						this.$session.set('token', token)
						Vue.http.headers.common['Authorization'] = 'Bearer ' + token
						store.commit('loggedMusic')
						this.$router.push('/compte/principal');
				}
			},
			toggleSidebar() {
				this.showSidebar = !this.showSidebar

				if(this.showSidebar) {
					this.sidebar.classList.add('active')
					this.overlay.classList.add('active')
					this.content.classList.add('locked')
				} else {
					this.sidebar.classList.remove('active')
					this.overlay.classList.remove('active')
					this.content.classList.remove('locked')
				}
			}
		},
		mounted() {
			this.checkLoggedUser()

			this.sidebar = this.$refs.sidebar.$el;
			this.overlay = this.$refs.overlay;
			this.content = this.$refs.content;
		}
	}
</script>

<style lang="sass">
	@import '../node_modules/bootstrap/scss/bootstrap'
	
	@import ./sass/colors
	@import ./sass/fonts
	@import ./sass/header
	@import ./sass/helper
	@import ./sass/sidebar
	@import ./sass/animacions
	@import ./sass/botons
	@import ./sass/notificacions
	@import ./sass/master

	#app
		-webkit-font-smoothing: antialiased
		-moz-osx-font-smoothing: grayscale
		color: #2c3e50
		display: grid
		grid-template-rows: 80px auto
		min-height: 100vh

	#content
		background-color: #FEF8EC
		background: url('./assets/overlay.svg')
		background-size: cover

	.overlay
		background-color: #444d
		//background-image: url('./assets/overlay.svg')
		background-size: cover
		opacity: .8 !important

	@media (max-width: 1175px)
		.subheader-nav
				display: none
		.hamburger
			display: inline-block
		.buttons
				display: none
				

	@media (min-width: 1175px)
		.subheader-nav
				display: flex
		.hamburger
			display: none
		.buttons
			display: inline-block

</style>
