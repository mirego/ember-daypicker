import Em from 'ember'

export default Em.Controller.extend({
  date: undefined,
  maxDate: moment().add(1, 'month'),
  minDate: moment().subtract(1, 'month'),

  disableFn (date) {
    return date.day() === 6 || date.day() === 0
  },

  actions: {
    onSelect (date) {
      console.log('Got on-select')
      this.set('date', date)
    },

    onFocus () {
      console.log('Got on-focus')
    }
  }
})
