import $ from 'jquery'

export const accionsMenuMixin = {
  methods: {
    // Amaga el sidebar i desblokeja el contingut
    tancarMenu() {
      $('#sidebar').removeClass('active');
      $('.overlay').removeClass('active');
      $('#content').removeClass('locked');
    },

    // Mostra el sidebar i blockeja el contingut
    obrirMenu() {
      $('#sidebar').addClass('active');
      $('.overlay').addClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');

      $('#content').addClass('locked');
    }
  }
}
