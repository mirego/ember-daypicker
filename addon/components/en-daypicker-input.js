import Ember from 'ember';

const {
  get: get,
  set: set,
  computed,
  getProperties,
  isEmpty
} = Em

export default Ember.Component.extend({
  classNames: ['en-day-picker-wrapper'],
  isFocused: false,
  format: "MMM D",

  dateFormatted: computed('date', function () {
    let date = get(this, 'date')

    if (isEmpty(date)) {
      return moment()
    } else {
      return date
    }
  }),

  didInsertElement () {
    this._setup()
  },

  willDestroyElement () {
    this._destroy()
  },

  _setup () {
    this._didFocus = this._didFocus.bind(this)
    this._didClickOutside = this._didClickOutside.bind(this)

    let input = this.$('.en-daypicker-input')
    let doc = $(document)

    input.on('focus', this._didFocus)
    doc.on('click', this._didClickOutside)
  },

  _destroy () {
    let input = this.$('.en-daypicker-input')
    let doc = $(document)

    input.off('focus', this._didFocus)
    doc.off('click', this._didClickOutside)
  },

  _didFocus (e) {
    this.set('isFocused', true)
    this.sendAction('on-focus')
  },

  _didClickOutside (e) {
    let input = $('.en-daypicker-input')
    let picker = $('.en-day-picker-wrapper')

    let target = $(e.target)

    let inputIsTarget = input.is(target)
    let pickerIsTarget = picker.is(target)

    let inputHasTarget = input.has(target).length > 0
    let pickerHasTarget = picker.has(target).length > 0

    if (inputIsTarget || inputHasTarget || pickerIsTarget || pickerHasTarget) return

    this.set('isFocused', false)
  },

  actions: {
    focus () {
      this.set('isFocused', true)
      this.attrs['on-focus']
    },

    didSelect (date) {
      this.set('isFocused', false)
      this.attrs['on-select'](date)
    }
  }
});
