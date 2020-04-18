
export const helpers = {

  methods: {
    ordernarPerData(d1, d2) {
      let date1 = Date.parse(d1);
      let date2 = Date.parse(d2);

      if(date1 < date2) return -1
      else if (date1 > date2) return 1
      else return 0
    }
  }
}
