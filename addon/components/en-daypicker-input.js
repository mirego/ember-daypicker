import Ember from 'ember';
import DocumentEvent from 'ember-day/mixins/document-event';
import isOutsideClick from 'ember-day/utils/is-outside-click';

const {
  Component,
  get,
  set,
  computed,
  getProperties,
  isEmpty,
  run
} = Em

export default Component.extend(DocumentEvent, {
  classNames: ['en-day-picker-wrapper'],
  classNameBindings: ['isDisabled:is-disabled'],
  documentEvents: ['click'],

  onDocumentClick (e) {
    if (isOutsideClick(this.element, e.target)) {
      this.set('isFocused', false)
    }
  },

  isDisabled: false,

  isFocused: false,
  format: "MMM D",

  dateFormatted: computed('date', function () {
    let date = get(this, 'date')

    if (isEmpty(date)) {
      return moment()

    } else if (!moment.isMoment(date) || !date.isValid()) {
      console.warn(`[ember-day] You need to pass in a valid moment object.
You passed in ${date}, which is invalid, so we're defaulting to today's date`)
      return moment()

    } else {
      return date
    }
  }),

  didInsertElement () {
    this._super(...arguments)
    run.scheduleOnce('afterRender', () => this._setup())
  },

  willDestroyElement () {
    this._super(...arguments)
    this._destroy()
  },

  _setup () {
    this._didFocus = this._didFocus.bind(this)
    this.$('.en-daypicker-input').on('focus', this._didFocus)
  },

  _destroy () {
    this.$('.en-daypicker-input').off('focus', this._didFocus)
  },

  _didFocus (e) {
    this.set('isFocused', true)
    this.sendAction('on-focus')
  },

  actions: {
    focus () {
      run(() => {
        this.set('isFocused', true)
        this.attrs['on-focus']
      })
    },

    didSelect (date) {
      run(() => {
        this.set('isFocused', false)
        this.attrs['on-select'](date)
      })
    }
  }
});
