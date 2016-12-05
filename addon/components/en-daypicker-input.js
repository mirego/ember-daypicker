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
  documentEvents: ['click'],

  onDocumentClick (e) {
    if (isOutsideClick(this.element, e.target)) {
      this.set('isFocused', false)
    }
  },

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
