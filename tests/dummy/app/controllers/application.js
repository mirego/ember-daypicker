import Em from 'ember'

export default Em.Controller.extend({
  date: moment("April 18, 2016"),

  actions: {
    onSelect (date) {
      this.set('date', date)
    }
  }
})
