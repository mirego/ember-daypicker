import Ember from 'ember';
import Constants from 'ember-daypicker/utils/constants';
import moment from 'moment'

const { Mixin, run } = Em

export default Mixin.create({
  focusSelected () {
    const selected = this.$('.is-selected')

    if (selected) {
      run.next(() => selected.focus())
    }
  },

  keyDown (ev) {
    run.later(() => this.handleKeyDown(ev), 1)
  },

  handleKeyDown (ev) {
    const focused = $('.en-daypicker-day:focus')
    const selected = $('.en-daypicker-day.is-selected')

    let el = focused

    if (!focused || !focused.length) {
      el = selected
    }

    const key   = ev.which || ev.keyCode
    const label = el.attr('aria-label')
    const day   = moment(label, Constants.defaultFormat)

    switch (key) {
      case 37:
        this.focusPreviousDay(day)
        break;

      case 38:
        this.focusPreviousWeek(day)
        break;

      case 39:
        this.focusNextDay(day)
        break;

      case 40:
        this.focusNextWeek(day)
        break;

      case 13:
        this.selectFocused(focused)
        break;

      default:
        return
    }
  },

  focusPreviousDay (day) {
    const prev = day.subtract(1, 'day')
    this.focusOn(prev)
  },

  focusNextDay (day) {
    const next = day.add(1, 'day')
    this.focusOn(next)
  },

  focusPreviousWeek (day) {
    const prev = day.subtract(7, 'days')
    this.focusOn(prev)
  },

  focusNextWeek (day) {
    const next = day.add(7, 'days')
    this.focusOn(next)
  },

  focusOn (day) {
    const formatted = day.format(Constants.defaultFormat)
    const dayDiv = this.$(`.en-daypicker-day[aria-label="${formatted}"]`)

    if (dayDiv && !dayDiv.hasClass('is-disabled')) {
      dayDiv.focus()

      if (this.attrs['on-focus']) {
        this.attrs['on-focus'](formatted)
      }
    }
  },

  selectFocused (focused) {
    focused.click()
  }
});
