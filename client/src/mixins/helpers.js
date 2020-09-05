
export const helpers = {

  methods: {
    ordernarPerData(d1, d2) {
      let date1 = Date.parse(d1);
      let date2 = Date.parse(d2);

      if(date1 < date2) return -1
      else if (date1 > date2) return 1
      else return 0
    },
    calcularPercentatge(semestre) {
      let numeroAssajos = semestre.assajos.length
      let assajosAssistits = this.contarAssistencia(this.segonSemestre.assajos)

      let percentatge = (assajosAssistits * 100) / numeroAssajos

      return isFinite(percentatge) ? percentatge + '%' : '~'
    },
  }
}
