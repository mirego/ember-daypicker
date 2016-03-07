import Em from 'ember'

export default Em.Controller.extend({
  date: null,

  actions: {
    onSelect (date) {
      this.set('date', date)
    }
  }
})
