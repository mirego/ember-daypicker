import Em from 'ember'

export default Em.Controller.extend({
  date: undefined,
  maxDate: moment().add(1, 'month'),
  minDate: moment().subtract(1, 'month'),

  actions: {
    onSelect (date) {
      this.set('date', date)
    }
  }
})
