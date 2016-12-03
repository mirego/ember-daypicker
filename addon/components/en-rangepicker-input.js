import Ember from 'ember';

const {
  Component,
  get,
  set,
  computed,
  getProperties,
  isEmpty
} = Em

export default Component.extend({
  classNames: ['en-day-picker-wrapper'],
  classNameBindings: ['isDisabled:is-disabled'],

  isDisabled: false,

  isFocused: false,
  format: "MMM D",

  startFormatted: computed('start', function () {
    let start = get(this, 'start')

    if (isEmpty(start)) {
      return moment()

    } else if (!moment.isMoment(start) || !start.isValid()) {
      console.warn(`[ember-day] You need to pass in a valid moment object. You passed in ${start}, which is invalid, so we're defaulting to today's start`)
      return moment()

    } else {
      return start
    }
  }),

  endFormatted: computed('end', function () {
    let end = get(this, 'end')

    if (isEmpty(end)) {
      return moment()

    } else if (!moment.isMoment(end) || !end.isValid()) {
      console.warn(`[ember-day] You need to pass in a valid moment object. You passed in ${end}, which is invalid, so we're defaulting to today's end`)
      return moment()

    } else {
      return end
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

    didSelect (type, date) {
      switch (type) {
        case 'start':
          this.set('askingForEnd', true)
          this.attrs['on-select-start'](date)
          break;

        case 'end':
          this.attrs['on-select-end'](date)
          break;

        default:
          return
      }
    }
  }
});
