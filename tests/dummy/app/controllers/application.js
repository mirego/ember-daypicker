import Em from 'ember'

export default Em.Controller.extend({
  date: undefined,

  actions: {
    onSelect (date) {
      this.set('date', date)
    }
  }
})
